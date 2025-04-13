import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
const port = 3003;

app.get('/hello', (req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
