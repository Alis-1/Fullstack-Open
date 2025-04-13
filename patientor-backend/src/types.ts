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

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export type NewPatient = Omit<Patient, 'id'>;

const GenderEnum = z.nativeEnum(Gender);
const HealthCheckRatingEnum = z.nativeEnum(HealthCheckRating);

export const PatientSchema = z.object({
  name: z.string().min(1),
  dateOfBirth: z.string().min(1),
  ssn: z.string().min(1),
  gender: GenderEnum,
  occupation: z.string().min(1)
});

export type PatientInput = z.infer<typeof PatientSchema>;

export const EntrySchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("HealthCheck"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    healthCheckRating: HealthCheckRatingEnum
  }),
  z.object({
    type: z.literal("OccupationalHealthcare"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    employerName: z.string().min(1),
    sickLeave: z.object({
      startDate: z.string().min(1),
      endDate: z.string().min(1)
    }).optional()
  }),
  z.object({
    type: z.literal("Hospital"),
    description: z.string().min(1),
    date: z.string().min(1),
    specialist: z.string().min(1),
    diagnosisCodes: z.array(z.string()).optional(),
    discharge: z.object({
      date: z.string().min(1),
      criteria: z.string().min(1)
    })
  })
]);

export type EntryInput = z.infer<typeof EntrySchema>; 