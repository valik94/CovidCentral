//Get Patients by ID

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();


module.exports = (db) => {
  //PATIENTS POST - UPDATE PATIENT RECORDS
  router.put("/:id", (req, res) => {
    const promises = [];
    const patientId = req.params.id
    const { first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id, diagnosis_details, medical_history_details, medication_details, surgery_details } = req.body;
    const updatePatients = db.query(`UPDATE patients SET first_name = $1, last_name = $2, email = $3, phone = $4, emergency_contact = $5, healthcare_card = $6, gender= $7, date_of_birth= $8, practitioner_id= $9  
    WHERE patients.id = $10 RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id, patientId ])
    // const updatePatient = function (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id, patientId) {

    const updatePatientHistories = db.query(`UPDATE patient_histories SET diagnosis_details = $1, medical_history_details= $2, medication_details = $3, surgery_details = $4
    WHERE patient_id = $5 RETURNING *;`, [diagnosis_details, medical_history_details, medication_details, surgery_details, patientId ])
      
    promises.push(updatePatients);
    promises.push(updatePatientHistories);

    Promise.all(promises)
    .then((updatedResult) =>{
      console.log(`UPDATED RESULTS [0]ARE FOUND HERE:---------`,updatedResult[0])
      console.log(`UPDATED RESULTS [1]ARE FOUND HERE:---------`,updatedResult[1])
      res.json({
        updatedPatients: updatedResult[0].rows,
        updatedPatientHistories : updatedResult[1].rows
      })
    })
    .catch((err) =>{
      res.status(500).json({ err: err.message });
    })
    
    // return db.query(`UPDATE patients SET first_name = $1, last_name = $2, email = $3, phone= $4, emergency_contact =$5, healthcare_card =$6, gender =$7, date_of_birth =$8, practitioner_id =$9)
      // WHERE patients.id = 1 RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id])
      
      // return db.query(`UPDATE patients SET first_name = $1, last_name = $2, email = $3, phone = $4, emergency_contact = $5, healthcare_card = $6, gender= $7, date_of_birth= $8, practitioner_id= $9  
      // WHERE patients.id = $10 RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id, patientId ]) 
                   
      // return db.query(`UPDATE patient_histories SET diagnosis_details = $1, medical_history_details= $2, medical_history_details = $3, medication_details = $4, surgery_details = $5
      // WHERE patient_id = $6 RETURNING *;`, [diagnosis_details, medical_history_details, medication_details, surgery_details, patientId ])

      // return db.query(`INSERT INTO patients (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)
      // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`, [first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id])

    // }
    // updatePatient(first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)

  })

  //PATIENTS GET - VIEW PATIENT RECORDS BASED ON SELECTED PATIENT ID 
  // A patient is selected from list of patients and rendered based on their id sent from frontend to backend
  router.get("/:id", (req, res) => {
    const patientId = req.params.id
    const practitionerId = req.session.user_id; //this id only works when session exists (upon logging in or registering)
    const promises = [];
    // const patientId = 3 // --> req.body.id this id comes from the selection of patient from list and send to backend from frontend
    const patients = db.query(`SELECT * FROM patients WHERE patients.id = $1;`, [patientId]);
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

  })

  return router;
}

//Create a routes
// const patients = `SELECT * FROM patients WHERE patients.id = 1;`, [sessionId]
// const patientsHistory = `SELECT * FROM patient_histories
// JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`
// const patientNotes = `SELECT * FROM patient_notes JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`

