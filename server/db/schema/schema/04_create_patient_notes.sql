-- schema/04_patient_notes.sql
DROP TABLE IF EXISTS patient_notes CASCADE;
-- CREATE URLS
CREATE TABLE patient_notes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  message TEXT NOT NULL,
  created_at TIMESTAMP,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL,
  practitioner_id integer REFERENCES practitioners(id) ON DELETE CASCADE NOT NULL
);
