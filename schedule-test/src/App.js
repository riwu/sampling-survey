import React, { Component } from 'react';
import moment from 'moment';
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

  const exceededSleep = (start, end) => {
    for (let i = Math.trunc(start); i <= end; i += 1) {
      if (i % 24 === sleep) {
        return true;
      }
    }
    return false;
  };

  const frequency = awakeHours.length / notiLeft;
  let freq = frequency;
  let nonPartnerSchedule = [];
  while (freq > 0) {
    const currentSchedule = [];
    for (let i = wakeup; i < (wakeup + 24); i += freq) {
      const maxHr = (i + freq) % 24;
      let upperLimit = i + freq;
      const exceeded = exceededSleep(i, i + freq, sleep);
      if (exceeded) {
        upperLimit = sleep + (i > sleep ? 24 : 0);
      }
      if (notNearSchedule(i) && notNearSchedule(maxHr)) {
        const minNext = (currentSchedule.length === 0)
          ? i
          : Math.max(currentSchedule[currentSchedule.length - 1] + 0.5 + TIME_OUT, i);
        if (upperLimit <= minNext) {
          break;
        }
        const randHr = getRandom(minNext, upperLimit);
        currentSchedule.push(randHr);
      }
      if (exceeded || currentSchedule.length === notiLeft) {
        break;
      }
    }
    if (currentSchedule.length === notiLeft) {
      nonPartnerSchedule = currentSchedule.map(hr => hr % 24);
      break;
    }
    freq -= 0.1;
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
    sleep: "23",
    wakeup: "6",
    partner: '9, 12',
  }
  render() {
    const partnerHours = this.state.partner.split(',').filter(v => v.trim() !== '' && !isNaN(v)).map(v => Number(v))
    const {
      partnerSchedule,
      nonPartnerSchedule,
      freq,
      awakeHours,
      notiLeft,
      schedule,
    } = getSchedule(partnerHours, Number(this.state.wakeup), Number(this.state.sleep));

    const finalSchedule = [];
    for (let i = 1; i < 8; i += 1) {
      const day = moment().add(i, 'd');
      const daySchedule = getSchedule(partnerHours, Number(this.state.wakeup), Number(this.state.sleep)).schedule;
      daySchedule.forEach((time) => {
        const hr = Math.floor(time);
        const newHour = moment().add(i, 'd').hour(hr).minute(Math.round((time - hr) * 60));
        finalSchedule.push(newHour);
      });
    }

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
            {partnerSchedule.map(t => <div key={t}>{t}</div>)}
          </div>
          <div className="paragraph">
            <div>Non-partner schedule: </div>
            <div>
              {nonPartnerSchedule.map(t => <div key={t}>{t}</div>)}
            </div>
          </div>
          <div className="paragraph">
            <div>Overall schedule: </div>
            <div>
              {schedule.map(t => <div key={t}>{t}</div>)}
            </div>
          </div>
          <p>Total notifications: {schedule.length}</p>
          { (schedule.length !== 7) && <p style={{color: 'red'}}>WARNING: NOT 7!</p>}
          <div>Overall schedule:</div>
          {finalSchedule.map(time => (
            <div key={+time}>
              {time.format()}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
