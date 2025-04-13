import React from 'react';
import { Link } from 'react-router-dom';
import { NonSensitivePatient } from '../types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

interface PatientListProps {
  patients: NonSensitivePatient[];
}

const PatientList: React.FC<PatientListProps> = ({ patients }) => {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Occupation</TableCell>
            <TableCell>Health Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map(patient => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link to={`/patients/${patient.id}`}>{patient.name}</Link>
              </TableCell>
              <TableCell>{patient.gender}</TableCell>
              <TableCell>{patient.occupation}</TableCell>
              <TableCell>Healthy</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default PatientList; 