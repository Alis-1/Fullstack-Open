import express from 'express';
import cors from 'cors';
import { v1 as uuid } from 'uuid';
import diagnoses from './data/diagnoses';
import patients from './data/patients';
import { NonSensitivePatient, NewPatient, Gender } from './types';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res) => {
  res.send(diagnoses);
});

app.get('/api/patients', (_req, res) => {
  const nonSensitivePatients: NonSensitivePatient[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
  res.send(nonSensitivePatients);
});

app.post('/api/patients', (req, res) => {
  try {
    const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;

    if (!name || !dateOfBirth || !ssn || !gender || !occupation) {
      return res.status(400).json({ error: 'parameters missing' });
    }

    if (!Object.values(Gender).includes(gender)) {
      return res.status(400).json({ error: 'invalid gender' });
    }

    const newPatient: NewPatient = {
      name,
      dateOfBirth,
      ssn,
      gender,
      occupation
    };

    const addedPatient = {
      ...newPatient,
      id: uuid()
    };

    patients.push(addedPatient);
    res.json(addedPatient);
  } catch (error) {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 