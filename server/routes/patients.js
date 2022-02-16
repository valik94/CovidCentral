//Get Patients by ID

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();


module.exports = (db) => {
//PATIENTS POST - UPDATE PATIENT RECORDS
  router.post("/",(req,res) => {
    const { first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id } = req.body;

    const updatePatient = function( first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id ) {

      return db.query(`INSERT INTO patients (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id])

      .then((result) =>{
        console.log(result)
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      })
    }
    updatePatient(first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)

  })

  //PATIENTS GET - VIEW PATIENT RECORDS BASED ON LOGGED IN PRACTITIONER ID
  router.get("/", (req, res) => {
    // const { first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id } = req.query; //req.body OR req.params
    console.log("WE ARE INSIDE GET REQUEST: REQ AND RES IS", req, res );
    const practitionerId = req.session.user_id; //this id only works when session exists (upon logging in or registering)
    const showPatient = function () {
      return db.query(`SELECT * FROM patients WHERE practitioner_id = $1;`, [practitionerId]) //req.session.user_id should be used when we start session

        .then((result) => {
          console.log("RESULT FROM GET REQUEST IS:", result)
          return result.rows; //return all rows of patients for this practitionersid
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    showPatient() //req.body OR req.params
      .then((result) => {
        console.log(`THE RESULT INSIDE SHOW USER IS THIS:`, result)
        if (result) {
          res.send(result)
        }
      })
  })
  router.get("/login", (req, res) => {
    res.send();
  });
  return router;

}

//Create a routes
// const patients = `SELECT * FROM patients WHERE patients.id = 1;`, [sessionId]
// const patientsHistory = `SELECT * FROM patient_histories
// JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`
// const patientNotes = `SELECT * FROM patient_notes JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`

