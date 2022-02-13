// -- routes/catRoutes.js
const router = require("express").Router();
const express = require('express');


module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    console.log("GET /");
    // const command = `SELECT practitioners.*, patients.*, appointments.*
    // FROM practitioners
    // JOIN patients ON practitioner_id = practitioners.id
    // JOIN appointments ON appointments.practitioner_id = practitioners.id
    // WHERE practitioners.id = 1;`
    // const command = `SELECT * FROM practitioners;`
    const promises = [];
    const practitioners = db.query(`SELECT *
    FROM practitioners
    WHERE practitioners.id = 1;`);

    const patients = db.query(`SELECT *
    FROM patients
    WHERE practitioner_id = 1;`);

    const appointments = db.query(`SELECT *
    FROM appointments
    WHERE practitioner_id = 1;`);
    promises.push(practitioners);
    promises.push(patients);
    promises.push(appointments);

    Promise.all(promises)
      .then((result) => {
        console.log("RESULT:", result);
        console.log("ROWSSSSS+++++++:", result[0].rows);
        // res.json(result[0].rows, result[1].rows, result[2].rows);
        res.json({
          practitioners: result[0].rows,
          patients: result[1].rows,
          appointments: result[2].rows,
        });
      })

      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  });

  router.post("/", function (req, res) {
    console.log("POST: we got here");
    const {first_name, last_name, email, password, specialty} = req.body
    const sql = `INSERT INTO practitioners (first_name, last_name, email, password, specialty)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

     db.query(sql, [first_name, last_name, email, password, specialty])
      .then((result) => {
        console.log("RESULT==========", result.rows[0]);
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.json({ err: err.message })
        console.log(err.message);
      });

    console.log(req.body);

    return;
  });

  //     const addUser = function (user) {
  //       return db
  //         .query(
  //           `INSERT INTO practitioners (first_name, last_name, email, password, specialty)
  // VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
  //           [first_name, last_name, email, password, specialty]
  //         )
  //         .then((result) => {
  //           console.log("RESULT==========", result);
  //           return result.rows[0];
  //         })
  //         .catch((err) => {
  //           console.log(err.message);
  //         });
  //     };

  // db.query(command)
  //   .then((data) => {
  //     res.json(data.rows);
  //     console.log("DATA HERE:", data.rows);
  //   })
  //   .catch((error) => {
  //     console.log(`Error setting up the reset route: ${error}`);
  //   });

  return router;
};
