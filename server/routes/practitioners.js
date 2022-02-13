// -- routes/catRoutes.js
const router = require("express").Router();
const express = require('express');


module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
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
    const { first_name, last_name, email, password, specialty } = req.body;
    const sql = `INSERT INTO practitioners (first_name, last_name, email, password, specialty)
        VALUES ($1, $2, $3, $4, $5) RETURNING *;`;

    db.query(sql, [first_name, last_name, email, password, specialty])
      .then((result) => {
        console.log("RESULT==========", result.rows[0]);
        res.json(result.rows[0]);
      })
      .catch((err) => {
        res.json({ err: err.message });
        console.log(err.message);
      });

    console.log(req.body);

    return;
  });
  return router;
};
