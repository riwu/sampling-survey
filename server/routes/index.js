const express = require('express');
const query = require('./query');

const router = express.Router();

router.get('/disqualified/:deviceId', (req, res) => {
  query.isDisqualified(req.params.deviceId).then(data => res.send(data));
});

router.post('/all', async (req, res) => {
  try {
    const state = req.body;
    const { deviceId } = state.device;
    await query.device(state.device);

    await Promise.all([
      query.disqualify(deviceId),
      ...state.trialAnswers.map(answer => query.trial({ ...answer, deviceId })),
      ...Object.entries(state.answers).map(([question, answer]) =>
        query.answer({ answer, question, deviceId })),
      Promise.all(Object.entries(state.notificationSchedule).map(([schedule, info]) =>
        query.experiment(schedule, deviceId).then(() => query.experimentStarted({
          startedAt: info.startTime,
          deviceId,
          schedule,
        })))).then(() => Promise.all([
        ...Object.entries(state.experimentAnswers).map(([schedule, answers]) =>
          Promise.all(Object.entries(answers).map(([question, answer]) =>
            query.experimentAnswer({
              ...answer, schedule, deviceId, question,
            })))),
        ...Object.entries(state.experimentRounds).map(([schedule, answers]) =>
          Promise.all(Object.entries(answers).map(([round, answer]) =>
            query.experimentRounds({
              ...answer, round, deviceId, schedule,
            })))),
      ])),
    ]);
    res.end();
  } catch (err) {
    res.send(err);
  }
});

router.post('/device', (req, res) => {
  res.end();
  query.device(req.body);
});

router.patch('/disqualify', (req, res) => {
  res.end();
  query.disqualify(req.body.deviceId);
});

router.post('/answer', (req, res) => {
  res.end();
  query.answer(req.body);
});

router.post('/trial', (req, res) => {
  res.end();
  query.trial(req.body);
});

router.post('/experiment', (req, res) => {
  res.end();
  query.experiment(req.body.schedule, req.body.deviceId);
});

router.post('/experiment/started', (req, res) => {
  res.end();
  query.experimentStarted(req.body);
});

router.post('/experiment/answer', (req, res) => {
  res.end();
  query.experimentAnswer(req.body);
});

router.post('/experiment/round', (req, res) => {
  res.end();
  query.experimentRounds(req.body);
});

module.exports = router;
