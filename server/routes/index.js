const express = require('express');
const query = require('./query');

const router = express.Router();

router.get('/disqualified/:deviceId', (req, res) => {
  query.isDisqualified(req.params.deviceId).then((data) => {
    console.log('data', data);
    res.send((data[0] || {}).disqualified === 1);
  });
});

const insertExperiment = async (state, deviceId) => {
  await query.experiment(Object.keys(state.notificationSchedule), deviceId);
  return Promise.all([
    ...Object.entries(state.notificationSchedule).map(([schedule, { startTime }]) =>
      query.experimentStarted({ startedAt: startTime, deviceId, schedule })),

    ...Object.entries(state.experimentAnswers).map(([schedule, answers]) =>
      Promise.all(Object.entries(answers).map(([question, answer]) =>
        query.experimentAnswer({
          answer,
          schedule,
          deviceId,
          question,
        })))),

    ...Object.entries(state.experimentRounds).map(([schedule, answers]) =>
      Promise.all(answers.map(answer =>
        query.experimentRounds({
          ...answer,
          schedule,
          deviceId,
        })))),
  ]);
};

router.put('/all', async (req, res, next) => {
  const state = req.body;
  if (!state.codeType) {
    res.end();
  }

  try {
    const { deviceId } = state.device;
    await query.device(state.device);

    await Promise.all([
      ...state.trialAnswers.map(answer => query.trial({ ...answer, deviceId })),
      ...Object.entries(state.answers).map(([question, answer]) =>
        query.answer({ answer, question, deviceId })),
      insertExperiment(state, deviceId),
    ]);

    if (state.codeType) {
      const data = await query.getCode(state.codeType);
      if (!data.length) {
        console.warn('no data for code type', state.codeType);
        res.end();
      }
      await query.disqualify(deviceId);
      res.send(Object.values(data[0])[0]);
    }
  } catch (err) {
    next(err);
  }
});

router.put('/device', (req, res) => {
  res.end();
  query.device(req.body);
});

router.patch('/disqualify', (req, res) => {
  res.end();
  query.disqualify(req.body.deviceId);
});

router.put('/answer', (req, res) => {
  res.end();
  query.answer(req.body);
});

router.put('/trial', (req, res) => {
  res.end();
  query.trial(req.body);
});

router.put('/experiment', (req, res) => {
  res.end();
  query.experiment(req.body.schedule, req.body.deviceId);
});

router.patch('/experiment/started', (req, res) => {
  res.end();
  query.experimentStarted(req.body);
});

router.put('/experiment/answer', (req, res) => {
  res.end();
  query.experimentAnswer(req.body);
});

router.put('/experiment/round', (req, res) => {
  res.end();
  query.experimentRounds(req.body);
});

module.exports = router;
