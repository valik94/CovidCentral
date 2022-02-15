-- schema/05_appointments.sql
DROP TABLE IF EXISTS appointments CASCADE;
-- CREATE URLS
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  "startAt" TIMESTAMP,
  "endAt" TIMESTAMP,
  summary VARCHAR(255),
  color VARCHAR(255),
  notification_sent BOOLEAN NOT NULL DEFAULT FALSE,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  practitioner_id integer REFERENCES practitioners(id) ON DELETE CASCADE NOT NULL
);
