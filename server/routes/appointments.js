//POST Appointments

// const express = require('express');
// const cookieSession = require('cookie-session');
const router = require("express").Router();

//POST book Appointments page
module.exports = (db) => {
  router.post("/",(req,res) => {
    const { startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id } = req.body;
    const bookAppointments = function( startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id ) {

      return db.query(`INSERT INTO appointments ("startAt", "endAt", summary, color, notification_sent, patient_id, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id])

      .then((result) =>{
        console.log(result)
        res.json(result.rows[0])
      })
      .catch((err) => {
          console.log("XXXXXXXXXXXX", err)
        res.status(500).json({ err: err.message });
      })
    }
    bookAppointments(startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id)

  })
  return router;
}