// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type MeasurementForm = {
  id: string;
  filename: string;
  description: string | null;
  status: 'offen' | 'validiert';
  channels: string[];
  data: {
    seconds_from_start: number;
    [key: string]: number;  // Dynamische Kanalwerte
  }[];
};

export type TimeseriesDataPoint = {
  timestamp: string;
  seconds_from_start: number;
  channel1: number | null;
  channel2: number | null;
  channel3: number | null;
};
