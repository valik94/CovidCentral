-- schema/01_create_practitioners.sql
DROP TABLE IF EXISTS practitioners CASCADE;
-- CREATE USERS
CREATE TABLE practitioners (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255)NOT NULL,
  specialty VARCHAR(255)
);