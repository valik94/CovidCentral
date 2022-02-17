//Get Patients by ID

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();


module.exports = (db) => {
  
  //POST to change/update patients information
  router.post("/", (req, res) => {
    const { first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id } = req.body;

    const updatePatient = function (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id) {

      return db.query(`INSERT INTO patients (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id])

        .then((result) => {
          console.log(result)
          res.json(result.rows[0])
        })
        .catch((err) => {
          res.status(500).json({ err: err.message });
        })
    }
    updatePatient(first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)

  })

  //PATIENTS GET - VIEW PATIENT RECORDS BASED ON SELECTED PATIENT ID 
  // A patient is selected from list of patients and rendered based on their id sent from frontend to backend
  router.get("/:id", (req, res) => {
    const patientId = req.params.id
    const practitionerId = req.session.user_id; //this id only works when session exists (upon logging in or registering)
    const promises = [];
    // const patientId = 3 // --> req.body.id this id comes from the selection of patient from list and send to backend from frontend
    const patients = db.query(`INSERT INTO patients (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id]);
    const patientsHistory = db.query(`SELECT * FROM patient_histories
    JOIN patients ON patients.id = patient_id
    WHERE patients.id = $1;`, [patientId]);
    const patientNotes = db.query(`SELECT patient_notes.* FROM patient_notes JOIN patients ON patients.id = patient_id
    WHERE patients.id = $1;`, [patientId]);

    promises.push(patients);
    promises.push(patientsHistory);
    promises.push(patientNotes);

    Promise.all(promises)
      .then((result) => {
        res.json({
          patients: result[0].rows,
          patientsHistory: result[1].rows,
          patientNotes: result[2].rows
        });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message })
      })
  });

//PATIENTS POST - UPDATE PATIENT RECORDS
router.post("/:id", (req, res) => {
  const patientId = req.params.id
  const practitionerId = req.session.user_id; //this id only works when session exists (upon logging in or registering)
  const promises = [];
  // const patientId = 3 // --> req.body.id this id comes from the selection of patient from list and send to backend from frontend
  const patients = db.query(`SELECT * FROM patients WHERE patients.id = $1;`, [patientId]);
  const patientsHistory = db.query(`SELECT * FROM patient_histories JOIN patients ON patients.id = patient_id
  WHERE patients.id = $1;`, [patientId]);

  promises.push(patients);
  promises.push(patientsHistory);

})

return router;
}

