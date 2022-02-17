-- schema/02_create_patients.sql
DROP TABLE IF EXISTS patients CASCADE;
-- CREATE URLS
CREATE TABLE patients (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255),
  emergency_contact VARCHAR(255),
  healthcare_card VARCHAR(255) NOT NULL,
  gender VARCHAR(255),
  date_of_birth VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  practitioner_id integer REFERENCES practitioners(id) ON DELETE CASCADE NOT NULL
);
