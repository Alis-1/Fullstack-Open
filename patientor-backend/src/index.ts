import express from 'express';
import cors from 'cors';
import { v1 as uuid } from 'uuid';
import diagnoses from './data/diagnoses';
import patients from './data/patients';
import { NonSensitivePatient, PatientInput, PatientSchema, Patient } from './types';

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
  res.json(patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  })));
});

app.get('/api/patients/:id', (req, res) => {
  const patient = patients.find(p => p.id === req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }
});

app.post('/api/patients', (req, res) => {
  try {
    const parsedData = PatientSchema.parse(req.body);
    const newPatient: PatientInput = parsedData;

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