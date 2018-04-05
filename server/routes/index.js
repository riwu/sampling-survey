const express = require('express');
const query = require('./query');

const router = express.Router();

router.get('/disqualified/:deviceId', (req, res) => {
  query.isDisqualified(req.params.deviceId).then((data) => {
    console.log('data', data);
    res.send((data[0] || {}).disqualified === 1);
  });
});

router.patch('/disqualify', (req, res) => {
  res.end();
  query.disqualify(req.body.deviceId);
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
      query.insertSession({ ip: req.headers['x-forwarded-for'], deviceId }),
    ]);

    if (state.codeType) {
      const code = await query.getCode(state.codeType);
      await query.disqualify(deviceId);
      res.send(code);
    }
  } catch (err) {
    next(err);
  }
});

// TODO: remove after app upgrade
router.put('/experiment', (req, res) => {
  res.end();
  query.experiment(req.body.schedule, req.body.deviceId);
});

const timeOptions = [
  '12 am',
  '8 am',
  '4 pm',
  '1 am',
  '9 am',
  '5 pm',
  '2 am',
  '10 am',
  '6 pm',
  '3 am',
  '11 am',
  '7 pm',
  '4 am',
  '12 pm',
  '8 pm',
  '5 am',
  '1 pm',
  '9 pm',
  '6 am',
  '2 pm',
  '10 pm',
  '7 am',
  '3 pm',
  '11 pm',
];

const satisfactionResponse = ['Not at all 1', '2', '3', '4', '5', '6', 'Extremely 7'];
const scaleResponse = ['Not at all true 1', '2', '3', '4', '5', '6', '7', '8', 'Definitely true 9'];

const answerMap = {
  2: timeOptions,
  3: timeOptions,
  4: timeOptions,
  5: timeOptions,
};

router.post('/answers', async (req, res) => {
  const code = await query.getCode('webAccess');
  if ((req.body.password || '').toLowerCase() !== (code || '').toLowerCase()) {
    res.sendStatus(401);
    return;
  }
  const rows = query.getAnswer();
  const data = await rows.reduce((obj, row) => {
    const previousAnswer = (obj[row.deviceId] || {})[row.question];
    const text = [21, 22].includes(row.question) ? null : row.text;
    obj[row.deviceId] = {
      ...obj[row.deviceId],
      [row.question]:
        (previousAnswer === undefined ? '' : `${previousAnswer},`) +
        (text || answerMap[row.question][row.index]),
    };
    return obj;
  }, {});
  const arr = Object.entries(data).map(([deviceId, values]) => ({ 0: deviceId, ...values }));
  res.send(arr);
});

module.exports = router;
