-- schema/05_appointments.sql
DROP TABLE IF EXISTS appointments CASCADE;
-- CREATE URLS
CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  description VARCHAR(255),
  start_time TIMESTAMP,
  -- end_time TIMESTAMP,
  notification_sent BOOLEAN NOT NULL DEFAULT FALSE,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  practitioner_id integer REFERENCES practitioners(id) ON DELETE CASCADE NOT NULL
);
