import axios from 'axios';
import { Patient, NonSensitivePatient, EntryInput } from '../types';

const baseUrl = 'http://localhost:3001/api/patients';

export const getAllPatients = async () => {
  const response = await axios.get<NonSensitivePatient[]>(baseUrl);
  return response.data;
};

export const getPatientById = async (id: string) => {
  const response = await axios.get<Patient>(`${baseUrl}/${id}`);
  return response.data;
};

export const addEntry = async (id: string, entry: EntryInput) => {
  const response = await axios.post<Patient>(`${baseUrl}/${id}/entries`, entry);
  return response.data;
}; 