import React from 'react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { getPatientById } from '../services/patientService';
import { useState, useEffect } from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const PatientDetails = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await getPatientById(id);
        setPatient(patient);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <Paper>
      <Typography variant="h4">{patient.name}</Typography>
      <List>
        <ListItem>
          <ListItemText primary="SSN" secondary={patient.ssn} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Occupation" secondary={patient.occupation} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Gender" secondary={patient.gender} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date of Birth" secondary={patient.dateOfBirth} />
        </ListItem>
      </List>
      <Typography variant="h5">Entries</Typography>
      {patient.entries.length === 0 ? (
        <Typography>No entries</Typography>
      ) : (
        <List>
          {patient.entries.map(entry => (
            <ListItem key={entry.id}>
              <ListItemText primary={entry.date} secondary={entry.description} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
};

export default PatientDetails; 