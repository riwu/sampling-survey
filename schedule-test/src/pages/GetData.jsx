import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import flatten from 'flat';
import json2csv from 'json2csv';
import JSONPretty from 'react-json-pretty';
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

const fields = [
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
const parser = new json2csv.Parser({ fields });

axios.defaults.baseURL = `${process.env.REACT_APP_SAMPLING_HUNGER_URL}/`;

const [post] = ['post'].map(method => (path, payload) =>
  axios({
    method,
    url: path,
    data: payload,
  }).then(response => response.data));

class GetData extends React.Component {
  state = {
    data: null,
    waiting: false,
  };
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
          onClick={() => {
            this.setState({ waiting: true });
            post('answers', { password: this.password })
              .then((data) => {
                const flatData = Object.entries(data).map(([deviceId, values]) => {
                  const { experiments, ...deviceAnswers } = values;
                  const row = {
                    deviceId,
                    ...Object.entries(deviceAnswers).reduce((acc, [questionNumber, answer]) => {
                      acc[questions[questionNumber]] = answer;
                      return acc;
                    }, {}),
                    ...Object.entries(experiments || {}).reduce(
                      (acc, [time, experiment], index) => {
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
                          ...Object.entries(rounds || {}).reduce(
                            (accumulator, [roundNum, round]) => {
                              accumulator[roundNum] = {
                                ...round,
                                '(recordedDuration-redDuration)/redDuration': Number((
                                    (round.recordedDuration - round.redDuration) /
                                    round.redDuration
                                  ).toFixed(4)),
                              };
                              return accumulator;
                            },
                            {},
                          ),
                        };
                        return acc;
                      },
                      {},
                    ),
                  };
                  return flatten(row, { delimiter: ' - ' });
                });
                const csv = parser.parse(flatData);

                const link = document.createElement('a');
                const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const csvUrl = URL.createObjectURL(csvData);
                link.download = `${new Date()}.csv`;
                link.href = csvUrl;
                document.body.appendChild(link); // Required for Firefox
                link.click();
                document.body.removeChild(link);

                this.setState({ data, waiting: false });
              })
              .catch((e) => {
                this.setState({ waiting: false });
                console.log('e', e); // eslint-disable-line no-console
                alert(`No Internet connection or invalid password: ${e.message}`); // eslint-disable-line no-alert
              });
          }}
        >
          Download CSV
        </Button>
        {this.state.waiting && <span> Please wait...</span>}
        {this.state.data && (
          <div className="json-container">
            <span>You can copy the below content and beautify with </span>
            <a target="_blank" rel="noopener noreferrer" href="https://codebeautify.org/jsonviewer">
              https://codebeautify.org/jsonviewer
            </a>
            <JSONPretty json={this.state.data} className="json-content" />
          </div>
        )}
      </div>
    );
  }
}

export default GetData;
