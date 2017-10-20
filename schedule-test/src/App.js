import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function getRandom(min, max) {
  return (Math.random() * (max - min)) + min;
}

function getHourDiff(h1, h2) {
  return Math.min(Math.abs(h1 - h2), Math.abs((h1 + 24) - h2), Math.abs(h1 - (h2 + 24)));
}

const TIME_OUT = 0.5;

const getSchedule = (partner, wakeup, sleep) => {
  const partnerSchedule = [];
  if (partner.length <= 5) {
    partner.forEach(time => partnerSchedule.push(time + 0.5));
  }
  const awakeHours = [];
  const notNearSchedule = hr => partnerSchedule.every(time => getHourDiff(time, hr) > 1.6);
  for (let i = wakeup; i < (wakeup + 24); i += 1) {
    const hr = i % 24;
    if (hr === sleep) break;
    if (notNearSchedule(hr)) {
      awakeHours.push(hr);
    }
  }
  const notiLeft = 7 - partnerSchedule.length;
  const freq = awakeHours.length / notiLeft;
  const nonPartnerSchedule = [];
  for (let i = wakeup; i < (wakeup + 24); i += freq) {
    const maxHr = (i + freq) % 24;
    if (notNearSchedule(i) && notNearSchedule(maxHr)) {
      const minNext = nonPartnerSchedule.length === 0
        ? i
        : Math.max((nonPartnerSchedule[nonPartnerSchedule.length - 1] + 0.5 + TIME_OUT) % 24, i);
      const randHr = getRandom(minNext, i + freq);
      nonPartnerSchedule.push(randHr % 24);
    }
  }
  return {
    partnerSchedule,
    nonPartnerSchedule,
    freq,
    awakeHours,
    notiLeft,
    schedule: [...partnerSchedule, ...nonPartnerSchedule],
  }
};

class App extends Component {
  state = {
    sleep: 23,
    wakeup: 8,
    partner: '9, 12',
  }
  render() {
    const partnerHours = this.state.partner.split(',').filter(v => v.trim() !== '' && !isNaN(v)).map(v => Number(v))
    console.log()
    const {
      partnerSchedule,
      nonPartnerSchedule,
      freq,
      awakeHours,
      notiLeft,
      schedule,
    } = getSchedule(partnerHours, this.state.wakeup, this.state.sleep);
    return (
      <div>
        <div>Sleep time Between 0 (12 am) to 23 (11 pm) )
          <input
            type="number"
            value={this.state.sleep}
            min={0}
            max={23}
            onChange={(e) => this.setState({ sleep: e.target.value })}
           />
        </div>
        <div>Wakeup time Between 0 (12 am) to 23 (11 pm) )
          <input
            type="number"
            value={this.state.wakeup}
            min={0}
            max={23}
            onChange={(e) => this.setState({ wakeup: e.target.value })}
           />
        </div>
        <div>Partner hours (separate by commas)
          <input
            value={this.state.partner}
            onChange={(e) => this.setState({ partner: e.target.value})}
           />
        </div>
        <div style={{marginTop: '20px'}}>
          <div>Partner hours selected: {partnerHours.join(', ')}</div>
          <div>Awake hours excluding partner hours: {awakeHours.join(', ')}</div>
          <div>Notification frequency for non-partner hrs (in hrs): {freq}</div>
          <div>No. of notifications for non-partner hrs: {notiLeft}</div>
          <div>Partner schedule: </div>
          <div>
            {partnerSchedule.map(t => <div>{t}</div>)}
          </div>
          <p>
            <div>Non-partner schedule: </div>
            <div>
              {nonPartnerSchedule.map(t => <div>{t}</div>)}
            </div>
          </p>
          <p>
            <div>Overall schedule: </div>
            <div>
              {schedule.map(t => <div key={t}>{t}</div>)}
            </div>
          </p>
        </div>
      </div>
    );
  }
}

export default App;
