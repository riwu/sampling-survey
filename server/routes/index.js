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

const experimentAnswerMap = {
  'Question 1': [
    'My boyfriend / girlfriend / partner / spouse',
    'My friends / colleagues / schoolmates',
    'My family',
    'Alone',
  ],
  'Question 2': ['Yes', 'No'],
  'Question 3': [
    'Work- or study-related activities',
    'Leisure activities',
    'Essential activities (eg. house chores, bath)',
  ],
  'Question 4': [
    '1: Very alert',
    '2',
    '3: Alert - normal level',
    '4',
    '5: Neither alert nor sleepy',
    '6',
    '7: Sleepy, but no effort to keep awake',
    '8',
    '9: Very sleepy, great effort to keep awake',
  ],
  'SESSION TIMED OUT': [
    'I did not check my phone',
    "I didn't have my phone with me.",
    'I was sleeping.',
    "I was doing something that couldn't be disrupted.",
  ],
  'SESSION TIMED OUT QUESTION': [
    'My boyfriend / girlfriend / partner / spouse',
    'My friends / colleagues / schoolmates',
    'My family',
    'Alone',
  ],
};

router.post('/answers', async (req, res) => {
  const code = await query.getCode('webAccess');
  if ((code || '').toLowerCase() !== (req.body.password || '').toLowerCase()) {
    res.sendStatus(401);
    return;
  }

  const data = {};

  const answers = query.getAnswer().each((row) => {
    // for questions that can select multiple options; concatenate with previous answer
    const previousAnswer = (data[row.deviceId] || {})[row.question];
    // checkbox options, ignore text and use index
    const text = [21, 22].includes(row.question) ? null : row.text;
    data[row.deviceId] = {
      ...data[row.deviceId],
      [row.question]:
        (previousAnswer === undefined ? '' : `${previousAnswer},`) +
        (text || answerMap[row.question][row.index]), // ignore index if text present
    };
  });

  const experimentAnswers = query.getExperimentAnswer().each((row) => {
    const deviceAnswers = data[row.deviceId] || {};
    const experiments = deviceAnswers.experiments || {};
    const scheduleAnswers = experiments[row.schedule] || {};
    const previousAnswer = scheduleAnswers[row.question];
    const text = ['Question 1', 'SESSION TIMED OUT QUESTION'].includes(row.question)
      ? null
      : row.text;
    data[row.deviceId] = {
      ...deviceAnswers,
      experiments: {
        ...experiments,
        [row.schedule]: {
          ...scheduleAnswers,
          [row.question]:
            (previousAnswer === undefined ? '' : `${previousAnswer},`) +
            (text || experimentAnswerMap[row.question][row.index]),
        },
      },
    };
  });

  const rounds = query.getRounds().each((row) => {
    const {
      deviceId, round, schedule, ...durations
    } = row;
    const deviceAnswers = data[deviceId] || {};
    const experiments = deviceAnswers.experiments || {};
    data[deviceId] = {
      ...deviceAnswers,
      experiments: {
        ...experiments,
        [schedule]: {
          ...experiments[schedule],
          [`r${round}`]: durations,
        },
      },
    };
  });

  await answers;
  await experimentAnswers;
  await rounds;

  const arr = Object.entries(data).map(([deviceId, values]) => {
    const { experiments, ...deviceAnswers } = values;
    return {
      0: deviceId,
      ...deviceAnswers,
      // make csv same column headers across devices regardless of schedule timing
      ...Object.entries(experiments || {}).reduce((acc, [time, results], index) => {
        // TODO: convert `time` to device timezone to support multi-timezone
        acc[`e - ${index + 1}`] = { time, ...results };
        return acc;
      }, {}),
    };
  });
  res.send(arr);
});

module.exports = router;
