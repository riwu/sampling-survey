import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import flatten from 'flat';
import json2csv from 'json2csv';
import JSONPretty from 'react-json-pretty';
import './GetData.css';

const questions = [
  'deviceId',
  'MTurkID no:',
  'Gender:',
  'Age:',
  'What is your sexual orientation?',
  'Current marital/relationship status:',
  'Race:',
  '"Hispanic or Latino" refers to a person of Cuban, Mexican,' +
    ' Puerto Rican, South or Central American, or other Spanish culture or' +
    ' origin regardless of race. Are you of Hispanic or Latino origin?',
  'Religion:',
  'Country of birth:',
  'Education (highest qualification obtained):',
  'Annual family income (USD):',
  'Household size:',
  'What is your usual country of residence?' +
    ' (i.e. the country where you spend most of your time eating and sleeping, not continent):',
  'Which of the following best describes the setting you grew up in?',
  'Occupation:',

  'What time do you normally wake up on a weekday?',
  'What time do you normally sleep on a weekday?',
  'What time do you normally wake up on a weekend?',
  'What time do you normally sleep on a weekend?',
  'How often do you meet your partner in a week?',
  'On weekdays, when are you most likely to meet your partner? (Select all that apply)',
  'On weekends, when are you most likely to meet your partner? (Select all that apply)',

  'How satisfied are you with your relationship?',
  'How content are you with your relationship?',
  'How happy are you with your relationship?',
  "Since I've been involved with my partner, my emotions have been on a roller coaster.",
  'I would feel deep despair if my partner left me.',
  'Sometimes my body trembles with excitement at the sight of my partner.',
  "I take delight in studying the movements and angles of my partner's body.",
  "Sometimes I feel I can't control my thought; they are obsessively on my partner.",
  'I feel happy when I am doing something to make my partner happy.',
  'I would rather be with my partner than anyone else.',
  "I'd get jealous if I thought my partner were falling in love with someone else.",
  'No one else could love my partner like I do.',
  'I yearn to know all about my partner.',
  'I want my partner -- physically, emotionally, mentally.',
  'I will love my partner forever.',
  "I melt when looking deeply into my partner's eyes.",
  'I have an endless appetite for affection from my partner.',
  'For me, my partner is the perfect romantic partner.',
  'My partner is the person who can make me feel the happiest.',
  'I sense my body responding when my partner touches me.',
  'I feel tender toward my partner.',
  'My partner always seems to be on my mind.',
  'If I were separated from my partnerfor a long time, I would feel intensely lonely.',
  'I sometimes find it difficult to concentrate on work because thoughts of my partner occupy my mind.',
  'I want my partner to know me – my thoughts, my fears, and my hopes.',
  'Knowing that my partner cares about me makes me feel complete.',
  "I eagerly look for signs indicating my partner's desire for me.",
  'If my partner were going through a difficult time, I would put away my own concerns to help him/her out.',
  'My partner can make me feel effervescent and bubbly.',
  'In the presence of my partner, I yearn to touch and be touched.',
  'An existence without my partner would be dark and dismal.',
  'I possess a powerful attraction for my partner.',
  "I get extremely depressed when things don't go right in my relationship with my partner.",
  'If my partner were feeling badly, my first duty would be to cheer him/her up.',
  'I feel that I can confide in my partner about virtually everything.',
  "I find it easy to ignore my partner's faults.",
  'I would do almost anything for my partner.',
  'I feel very possessive toward my partner.',
  'If I could never be with my partner, I would feel miserable.',
  'If I were lonely, my first thought would be to seek out my partner.',
  "One of my primary concerns is my partner 's welfare.",
  'I would forgive my partner for practically anything.',
  "I feel responsible for my partner 's well-being.",
  'When I am with my partner, I spend a good deal of time just looking at him/her.',
  'I would greatly enjoy being confided in by my partner.',
  'It would be hard for me to get along without my partner.',
];

const experimentQuestionsMap = {
  'Question 1': 'Right now, I am with (select all that apply):',
  'Question 2': 'Did you multitask while doing our task?',
  'Question 3': 'Just before I opened this app, I was doing:',
  'Question 4': 'How alert or sleepy do you feel right now?',
  'Question 5': 'How happy or sad do you feel right now?',
  'SESSION TIMED OUT': 'You did not complete the session at {time}. Please indicate why',
  'SESSION TIMED OUT QUESTION': 'On {time}, I was with (select all that apply):',
};

const dataFields = [
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

axios.defaults.baseURL = `${process.env.REACT_APP_SAMPLING_URL}/`;
axios.defaults.baseURL = 'http://localhost:3000/';

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

        this.setState({ data, waiting: false });
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
                const row = {
                  deviceId,
                  ...Object.entries(deviceAnswers).reduce((acc, [questionNumber, answer]) => {
                    acc[questions[questionNumber]] = answer;
                    return acc;
                  }, {}),
                  ...Object.entries(experiments || {}).reduce((acc, [time, experiment], index) => {
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
                          '(recordedDuration-redDuration)/redDuration': Number((
                              (round.recordedDuration - round.redDuration) /
                              round.redDuration
                            ).toFixed(4)),
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
        <Button className="rounds-button" onClick={() => this.getResult('rounds')}>
          Download rounds only
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
