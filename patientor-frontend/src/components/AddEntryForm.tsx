import React, { useState } from 'react';
import { Button, TextField, MenuItem, FormControl, InputLabel, Select, Box } from '@mui/material';
import { EntryInput, HealthCheckRating } from '../types';

interface AddEntryFormProps {
  onSubmit: (entry: EntryInput) => void;
  onCancel: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel }) => {
  const [type, setType] = useState<string>('HealthCheck');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string>('');
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes ? diagnosisCodes.split(',').map(code => code.trim()) : undefined
    };

    let entry: EntryInput;

    switch (type) {
      case 'HealthCheck':
        entry = {
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating
        };
        break;
      case 'OccupationalHealthcare':
        entry = {
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: sickLeaveStart && sickLeaveEnd ? {
            startDate: sickLeaveStart,
            endDate: sickLeaveEnd
          } : undefined
        };
        break;
      case 'Hospital':
        entry = {
          ...baseEntry,
          type: 'Hospital',
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria
          }
        };
        break;
      default:
        throw new Error(`Unhandled entry type: ${type}`);
    }

    onSubmit(entry);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Type"
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Specialist"
        value={specialist}
        onChange={(e) => setSpecialist(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Diagnosis Codes (comma separated)"
        value={diagnosisCodes}
        onChange={(e) => setDiagnosisCodes(e.target.value)}
        sx={{ mb: 2 }}
      />

      {type === 'HealthCheck' && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Health Check Rating</InputLabel>
          <Select
            value={healthCheckRating}
            onChange={(e) => setHealthCheckRating(e.target.value as HealthCheckRating)}
            label="Health Check Rating"
          >
            <MenuItem value={HealthCheckRating.Healthy}>Healthy</MenuItem>
            <MenuItem value={HealthCheckRating.LowRisk}>Low Risk</MenuItem>
            <MenuItem value={HealthCheckRating.HighRisk}>High Risk</MenuItem>
            <MenuItem value={HealthCheckRating.CriticalRisk}>Critical Risk</MenuItem>
          </Select>
        </FormControl>
      )}

      {type === 'OccupationalHealthcare' && (
        <>
          <TextField
            fullWidth
            label="Employer Name"
            value={employerName}
            onChange={(e) => setEmployerName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Sick Leave Start Date"
            type="date"
            value={sickLeaveStart}
            onChange={(e) => setSickLeaveStart(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Sick Leave End Date"
            type="date"
            value={sickLeaveEnd}
            onChange={(e) => setSickLeaveEnd(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
        </>
      )}

      {type === 'Hospital' && (
        <>
          <TextField
            fullWidth
            label="Discharge Date"
            type="date"
            value={dischargeDate}
            onChange={(e) => setDischargeDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Discharge Criteria"
            value={dischargeCriteria}
            onChange={(e) => setDischargeCriteria(e.target.value)}
            sx={{ mb: 2 }}
          />
        </>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Add
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default AddEntryForm; 