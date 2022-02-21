//Get Patients by ID

const express = require("express");
const cookieSession = require("cookie-session");
const router = express.Router();
const { sendEmail } = require("../emailnotification");

module.exports = (db) => {
  router.post("/", (req, res) => {
    const sessionId = req.session.user_id; //getting session using id being sent to client
    const {
      first_name,
      last_name,
      email,
      phone,
      emergency_contact,
      healthcare_card,
      gender,
      date_of_birth,
    } = req.body;

    const updatePatient = function (
      first_name,
      last_name,
      email,
      phone,
      emergency_contact,
      healthcare_card,
      gender,
      date_of_birth,
      practitioner_id
    ) {
      return db
        .query(
          `INSERT INTO patients (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *;`,
          [
            first_name,
            last_name,
            email,
            phone,
            emergency_contact,
            healthcare_card,
            gender,
            date_of_birth,
            practitioner_id,
          ]
        )

        .then((result) => {
          console.log(result);
          res.json(result.rows[0]);
        })
        .catch((err) => {
          res.status(500).json({ err: err.message });
        });
    };
    updatePatient(
      first_name,
      last_name,
      email,
      phone,
      emergency_contact,
      healthcare_card,
      gender,
      date_of_birth,
      sessionId
    );
  });

  //PATIENTS POST - UPDATE PATIENT RECORDS
  router.put("/:id", (req, res) => {
    const sessionId = req.session.user_id; //getting session using id being sent to client
    const promises = [];
    const patientId = req.params.id;
    const {
      first_name,
      last_name,
      email,
      phone,
      emergency_contact,
      healthcare_card,
      gender,
      date_of_birth,
    } = req.body[0];
    const {
      diagnosis_details,
      medical_history_details,
      medication_details,
      surgery_details,
    } = req.body[1];
    const updatePatients = db.query(
      `UPDATE patients SET first_name = $1, last_name = $2, email = $3, phone = $4, emergency_contact = $5, healthcare_card = $6, gender= $7, date_of_birth= $8, practitioner_id= $9  
    WHERE patients.id = $10 RETURNING *;`,
      [
        first_name,
        last_name,
        email,
        phone,
        emergency_contact,
        healthcare_card,
        gender,
        date_of_birth,
        sessionId,
        patientId,
      ]
    );
    // const updatePatient = function (first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id, patientId) {

    const updatePatientHistories = db.query(
      `INSERT INTO patient_histories (diagnosis_details, medical_history_details, medication_details, surgery_details, patient_id) 
    VALUES ($1, $2, $3, $4, $5) 
    ON CONFLICT (patient_id) 
    DO UPDATE SET 
    diagnosis_details = $1, medical_history_details= $2, medication_details = $3, surgery_details = $4  
    RETURNING *;`,
      [
        diagnosis_details,
        medical_history_details,
        medication_details,
        surgery_details,
        patientId,
      ]
    );

    promises.push(updatePatients);
    promises.push(updatePatientHistories);

    Promise.all(promises)
      .then((updatedResult) => {
        const patient = updatedResult[0].rows[0];
        const patientHistory = updatedResult[1].rows[0];
        console.log(
          `UPDATED RESULTS [0]ARE FOUND HERE:---------`,
          updatedResult[0].rows[0]
        );
        console.log(
          `UPDATED RESULTS [1]ARE FOUND HERE:---------`,
          updatedResult[1].rows[0]
        );
        //sendEmail(patient)
        res.json({
          // updatedPatient: updatedResult[0].rows,
          // updatedPatientHistories: updatedResult[1].rows,
        });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  });

  //PATIENTS GET - VIEW PATIENT RECORDS BASED ON SELECTED PATIENT ID
  // A patient is selected from list of patients and rendered based on their id sent from frontend to backend
  router.get("/:id", (req, res) => {
    const patientId = req.params.id; //this is coming from URL /:id
    const practitionerId = req.session.user_id; //this id only works when session exists (upon logging in or registering)
    const promises = [];
  
    const patients = db.query(
      `SELECT * FROM patients WHERE patients.id = $1;`,
      [patientId]
    );
    const patientsHistory = db.query(
      `SELECT patient_histories.* FROM patient_histories
    JOIN patients ON patients.id = patient_id
    WHERE patients.id = $1;`,
      [patientId]
    );
    const patientNotes = db.query(
      `SELECT patient_notes.* FROM patient_notes JOIN patients ON patients.id = patient_id
    WHERE patients.id = $1;`,
      [patientId]
    );

    promises.push(patients);
    promises.push(patientsHistory);
    promises.push(patientNotes);

    Promise.all(promises)
      .then((result) => {
        res.json({
          patients: result[0].rows,
          patientsHistory: result[1].rows,
          patientNotes: result[2].rows,
        });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  });

  return router;
};

//Create a routes
// const patients = `SELECT * FROM patients WHERE patients.id = 1;`, [sessionId]
// const patientsHistory = `SELECT * FROM patient_histories
// JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`
// const patientNotes = `SELECT * FROM patient_notes JOIN patients ON patients.id = patient_id
// WHERE patients.id = 1;`
