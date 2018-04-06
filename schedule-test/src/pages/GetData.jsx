import React from 'react';
import { Button, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import flatten from 'flat';
import json2csv from 'json2csv';
import JSONPretty from 'react-json-pretty';
import './GetData.css';

axios.defaults.baseURL = `${process.env.REACT_APP_SAMPLING_URL}/`;
axios.defaults.baseURL = 'http://localhost:3000/';

const [post] = ['post'].map(method => (path, payload) =>
  axios({
    method,
    url: path,
    data: payload,
  }).then(response => response.data));

const parser = new json2csv.Parser();

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
                const flatData = data.map(row => flatten(row));
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
