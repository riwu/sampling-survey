import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import flatten from 'flat';
import json2csv from 'json2csv';
import JSONPretty from 'react-json-pretty';
import './GetData.css';

const fields = [
  ...[...Array(6).keys()].map(String),
  ...[...Array(49).keys()].reduce((acc, scheduleIndex) => {
    const header = `e - ${scheduleIndex + 1} - `;
    acc.push(`${header}time`);
    acc.push(...[...Array(6).keys()].map(i => `${header}Question ${i + 1}`));
    acc.push(`${header}SESSION TIMED OUT`);
    acc.push(...[...Array(5).keys()].reduce((rounds, i) => {
      rounds.push(...['', 'repeat'].reduce((arr, pad) => {
        arr.push(...[
          'blackDuration',
          'redDuration',
          'recordedDuration',
          'timeBetweenMountAndStart',
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
                const flatData = data.map(row => flatten(row, { delimiter: ' - ' }));
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
              .catch(() => {
                this.setState({ waiting: false });
                alert('No Internet connection or invalid password');
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
