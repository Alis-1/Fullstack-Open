import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { NonSensitivePatient } from './types';
import { getAllPatients } from './services/patientService';
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import { AppBar, Toolbar, Typography, Container } from '@mui/material';

const App = () => {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const patients = await getAllPatients();
      setPatients(patients);
    };
    fetchPatients();
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Patientor
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<PatientList patients={patients} />} />
          <Route path="/patients/:id" element={<PatientDetails />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
