import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = calculateBmi(height, weight);
      const result = {
        height,
        weight,
        bmi,
      };

      res.json(result);
    } else {
      throw new Error('malformatted parameters');
    }
  } catch (error) {
    if (error instanceof Error) {
      res.json({
        error: error.message,
      });
    }
  }
});

app.post('/exercise', (req, res) => {
  const exercisesHours: number[] = req.body.daily_exercises;
  const target: number = req.body.target;

  try {
    if (!exercisesHours || !target) {
      throw new Error('parameters missing');
    }

    const argumentTests = exercisesHours.filter((hour) => isNaN(hour));
    if (argumentTests.length === 0) {
      const result = calculateExercises(exercisesHours, target);
      res.json(result);
    } else {
      throw new Error('arguments should be a number');
    }
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
