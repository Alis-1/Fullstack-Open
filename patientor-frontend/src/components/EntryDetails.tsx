import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { LocalHospital, Work, Favorite } from '@mui/icons-material';
import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';

interface EntryDetailsProps {
  entry: Entry;
}

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case "Hospital":
        return <LocalHospital />;
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <Favorite />;
      default:
        return null;
    }
  };

  const getEntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return (
          <ListItem>
            <ListItemText
              primary="Discharge"
              secondary={`Date: ${entry.discharge.date}, Criteria: ${entry.discharge.criteria}`}
            />
          </ListItem>
        );
      case "OccupationalHealthcare":
        return (
          <>
            <ListItem>
              <ListItemText primary="Employer" secondary={entry.employerName} />
            </ListItem>
            {entry.sickLeave && (
              <ListItem>
                <ListItemText
                  primary="Sick Leave"
                  secondary={`From: ${entry.sickLeave.startDate} To: ${entry.sickLeave.endDate}`}
                />
              </ListItem>
            )}
          </>
        );
      case "HealthCheck":
        return (
          <ListItem>
            <ListItemText
              primary="Health Check Rating"
              secondary={HealthCheckRating[entry.healthCheckRating]}
            />
          </ListItem>
        );
      default:
        return assertNever(entry);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {entry.date} {getEntryIcon(entry.type)}
        </Typography>
        <Typography variant="body1" style={{ fontStyle: 'italic' }}>
          {entry.description}
        </Typography>
        <Typography variant="body2">Diagnosed by {entry.specialist}</Typography>
        {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
          <List>
            <Typography variant="subtitle2">Diagnosis Codes:</Typography>
            {entry.diagnosisCodes.map(code => (
              <ListItem key={code}>
                <ListItemText primary={code} />
              </ListItem>
            ))}
          </List>
        )}
        <List>{getEntryDetails(entry)}</List>
      </CardContent>
    </Card>
  );
};

export default EntryDetails; 