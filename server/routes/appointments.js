//POST Appointments

// const express = require('express');
// const cookieSession = require('cookie-session');
const router = require("express").Router();
const {sendEmail} = require('../emailnotification')


//POST book Appointments page
module.exports = (db) => {
  router.post("/",(req,res) => {
    const sessionId = req.session.user_id; //getting session using id being sent to client
    const { startAt, endAt, summary, color, notification_sent, patient_id } = req.body;
    const bookAppointments = function( startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id) {

    console.log("REQ=======================:", req.body)

      return db.query(`INSERT INTO appointments ("startAt", "endAt", summary, color, notification_sent, patient_id, practitioner_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id])

      .then((result) =>{
        console.log(result)
        const appointment = result.rows[0]
        console.log(`appointment is ===`, appointment)
        sendEmail(appointment)
        res.json(result.rows[0])
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      })
    }
    bookAppointments(startAt, endAt, summary, color, notification_sent, patient_id, sessionId)

  })
  return router;
}