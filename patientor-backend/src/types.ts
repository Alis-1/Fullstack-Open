import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

const GenderEnum = z.nativeEnum(Gender);

export const PatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: GenderEnum,
  occupation: z.string().min(1)
});

export type PatientInput = z.infer<typeof PatientSchema>; 