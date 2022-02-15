//Get Patients by ID

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();

//get Patients page
module.exports = (db) => {
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
  router.get("/", (req, res) => {
    const { first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id } = req.body; //req.body OR req.params
    
    // patient validation by email
    // const isAuthenticated = function (email, password, db) {
    //   console.log(`email is and password is`, email, password)
      
    //   return Promise.resolve(false);
    // };
    

    // const id = req.session.user_id; //this id pass to query?
    // const idIsExisting = isAuthenticated(email, password, db);
    // idIsExisting.then((value) => {
    //   if (value) {
    //     res.send() //if user in db exists, redirect to homepage
    //   }
    //   const templateVars = { value: false };

    // res.send(templateVars)
    // })


    const id = req.session.user_id; //this id only works when session exists (upon logging in)
    const showPatient = function ({ first_name, last_name, email, phone, emergency_contact, healthcare_card, gender, date_of_birth, practitioner_id }) {
      return db.query(`SELECT * FROM patients
    
    WHERE patients.id = $1`, [id]) //req.session.user_id should be used when we start session

        .then((result) => {
          console.log("RESULT ! IS:", result)
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    showPatient(req.body) //req.body OR req.params
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