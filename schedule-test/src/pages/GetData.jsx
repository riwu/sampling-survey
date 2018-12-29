import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import flatten from 'flat';
import json2csv from 'json2csv';
import moment from 'moment';
import './GetData.css';

const questions = [
  'deviceId',
  'What is your Subject ID?',
  'What time do you normally wake up on a weekday?',
  'What time do you normally sleep on a weekday?',
  'What time do you normally wake up on a weekend?',
  'What time do you normally sleep on a weekend?',
];

const experimentQuestionsMap = {
  'Question 1': 'hungriness',
  'Question 2': 'fearfulness',
  'Question 3': 'alertness',
  'Question 4': 'happiness',
  'Question 5': 'pleasantness',
  'Question 6': 'Did you eat anything in the last 30 mins?',
  'SESSION TIMED OUT': 'You did not complete the session at {time}. Please indicate why',
};

const dataFields = [
  'Response rate -- non-timed out sessions / completed sessions',
  'Progress -- completed sessions (including timed out sessions) / 49',
  ...questions,
  ...[...Array(49).keys()].reduce((acc, scheduleIndex) => {
    const header = `e - ${scheduleIndex + 1} - `;
    acc.push(`${header}time`);
    acc.push(...Object.values(experimentQuestionsMap).map(question => header + question));
    acc.push(...[...Array(5).keys()].reduce((rounds, i) => {
      rounds.push(...['', 'repeat'].reduce((arr, pad) => {
        arr.push(...[
          'blackDuration',
          'redDuration',
          'recordedDuration',
          'timeBetweenMountAndStart',
          '(recordedDuration-redDuration)/redDuration',
        ].map(key => `${header + (i + 1) + pad} - ${key}`));
        return arr;
      }, []));
      return rounds;
    }, []));
    return acc;
  }, []),
];

axios.defaults.baseURL = '/api/';

const [post] = ['post'].map(method => (path, payload) =>
  axios({
    method,
    url: path,
    data: payload,
  }).then(response => response.data));

const getResponseRate = (experimentsArr) => {
  if (experimentsArr.length === 0) return 0;
  // 'SESSION TIMED OUT' answer only exists for timed out sessions
  return Math.round(experimentsArr.filter(([, answer]) => !answer['SESSION TIMED OUT']).length /
      experimentsArr.length *
      100);
};

class GetData extends React.Component {
  state = {
    waiting: false,
  };

  getResult(route, fields, transform = data => data) {
    const promise = post(route, { password: this.password });
    this.setState({ waiting: true });
    const parser = new json2csv.Parser({ fields });

    promise
      .then((data) => {
        const csv = parser.parse(transform(data));

        const link = document.createElement('a');
        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const csvUrl = URL.createObjectURL(csvData);
        link.download = `${new Date()}.csv`;
        link.href = csvUrl;
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);

        this.setState({ waiting: false });
      })
      .catch((e) => {
        this.setState({ waiting: false });
        console.log('e', e); // eslint-disable-line no-console
        alert(`No Internet connection or invalid password: ${e.message}`); // eslint-disable-line no-alert
      });
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Password: </ControlLabel>
          <FormControl
            autoFocus
            onChange={(e) => {
              this.password = e.target.value;
            }}
          />
        </FormGroup>
        <Button
          onClick={() =>
            this.getResult('answers', dataFields, data =>
              Object.entries(data).map(([deviceId, values]) => {
                const { experiments, ...deviceAnswers } = values;
                const experimentsArr = Object.entries(experiments || {}).slice(-49);
                const row = {
                  'Response rate -- non-timed out sessions / completed sessions': getResponseRate(experimentsArr),
                  'Progress -- completed sessions (including timed out sessions) / 49':
                    experimentsArr.length / 49 * 100,
                  deviceId,
                  ...Object.entries(deviceAnswers).reduce((acc, [questionNumber, answer]) => {
                    acc[questions[questionNumber]] = answer;
                    return acc;
                  }, {}),
                  ...experimentsArr.reduce((acc, [time, experiment], index) => {
                    const { rounds, ...experimentQuestions } = experiment;
                    // make csv same column headers across devices regardless of schedule timing
                    acc[`e - ${index + 1}`] = {
                      // TODO: convert `time` to device timezone to support multi-timezone
                      time,
                      ...Object.entries(experimentQuestions || {}).reduce(
                        (accumulator, [question, answer]) => {
                          accumulator[experimentQuestionsMap[question]] = answer;
                          return accumulator;
                        },
                        {},
                      ),
                      ...Object.entries(rounds || {}).reduce((accumulator, [roundNum, round]) => {
                        accumulator[roundNum] = {
                          ...round,
                          '(recordedDuration-redDuration)/redDuration':
                            (round.recordedDuration - round.redDuration) / round.redDuration,
                        };
                        return accumulator;
                      }, {}),
                    };
                    return acc;
                  }, {}),
                };
                return flatten(row, { delimiter: ' - ' });
              }))
          }
        >
          Download all data
        </Button>
        <Button
          className="rounds-button"
          onClick={() =>
            this.getResult('rounds', undefined, data =>
              Object.entries(data).reduce((deviceAcc, [deviceId, schedules]) => {
                deviceAcc.push(...Object.entries(schedules).reduce((scheduleAcc, [schedule, rounds]) => {
                    scheduleAcc.push(...rounds.map(round => ({
                        ...Object.entries(round).reduce((acc, [key, value]) => {
                          acc[experimentQuestionsMap[key] || key] = value;
                          return acc;
                        }, {}),
                        deviceId,
                        schedule,
                        time: moment(schedule, 'ddd MMM DD YYYY HH:mm:ss zZZ').format('HH:mm:ss'),
                      })));
                    return scheduleAcc;
                  }, []));
                return deviceAcc;
              }, []))
          }
        >
          Download rounds only
        </Button>
        {this.state.waiting && <span> Please wait...</span>}
      </div>
    );
  }
}

export default GetData;
