//POST Appointments
const router = require("express").Router();
const {sendEmail} = require('../emailnotification')

const bookAppointments = async function( db, startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id) { //async defines the TYPE of function this is. Async specifically allows for the functionality of awaiting of each promise line being resolved before moving onto the next promise.
  try {
    const appointmentTo = await db.query(`INSERT INTO appointments ("startAt", "endAt", summary, color, notification_sent, patient_id, practitioner_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`, [startAt, endAt, summary, color, notification_sent, patient_id, practitioner_id]) //await makes this return sequentially. Meaning this returns first. await is similar in nature to .then()

    const patientBasedOnId = await db.query(`SELECT * FROM patients WHERE patients.id = $1`, [patient_id]) // this returns second after appointmentTo returns. The await ensures we don't move forward before this is resolved.

    return {appointmentTo , patientBasedOnId} 
   
  } catch (error) {
    console.log(error)
    throw new Error('error');
  }
}

//POST book Appointments page
module.exports = (db) => {

  router.post("/", async (req,res) => { //this callback (req,res) is an async function
    const sessionId = req.session.user_id; //getting session using id being sent to client
    const { startAt, endAt, summary, color, notification_sent, patient_id } = req.body; //getting information from FORM that is sent from frontend
    
      console.log("WE ARE INSIDE POST ")
      const {appointmentTo, patientBasedOnId} = await bookAppointments( db, startAt, endAt, summary, color, notification_sent, patient_id, sessionId) //calling function and destructuring the result into appointmentTo and patientBasedOnId
      console.log(`ALL MY appointmentTo ARE: `, appointmentTo)
      console.log(`ALL MY patientBasedOnId ARE:`, patientBasedOnId)
      sendEmail(appointmentTo.rows[0], patientBasedOnId.rows[0])
      res.json(appointmentTo.rows[0], patientBasedOnId.rows[0]).end()      
  })
  return router;
};
