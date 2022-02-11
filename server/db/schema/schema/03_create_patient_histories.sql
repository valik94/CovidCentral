-- schema/03_create_patient_histories.sql
DROP TABLE IF EXISTS patient_histories CASCADE;
-- CREATE URLS
CREATE TABLE patient_histories (
  id SERIAL PRIMARY KEY,
  diagnosis_details TEXT,
  medical_history_details TEXT,
  medication_details TEXT,
  surgery_details TEXT,
  patient_id integer REFERENCES patients(id) ON DELETE CASCADE NOT NULL
);
