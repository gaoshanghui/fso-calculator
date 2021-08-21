import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    if (!isNaN(height) && !isNaN(weight)) {
      const bmi = bmiCalculator(height, weight);
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

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
