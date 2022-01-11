import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, parseInputArguments } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (!req.query.height || !req.query.weight) {
    res.json({ error: 'malformatted parameters' });
    return;
  }

  const bodyData = { height: Number(req.query.height), weight: Number(req.query.weight) };
  const bmi = calculateBmi(bodyData);

  const responseData = {
    weight: req.query.weight,
    height: req.query.height,
    bmi: bmi,
  };

  res.json(responseData);
});

app.post('/exercises', (req, res) => {
  if (!req.body['daily_exercises'] || !req.body.target) {
    res.json({ error: 'parameters missing' });
    return;
  }

  const inputArguments = ['', '', ...req.body['daily_exercises'], req.body.target];

  try {
    const dataForCalculate = parseInputArguments(inputArguments);
    const responseData = calculateExercises(dataForCalculate.exercises, dataForCalculate.goal);
    res.json(responseData);
  } catch (error) {
    res.json({ error: 'malformatted parameters' });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
