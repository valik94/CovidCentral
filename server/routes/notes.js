//POST NOTES of patient

const router = require("express").Router();

//POST Create New Notes page
module.exports = (db) => {
  router.post("/",(req,res) => {
    const { title, message, patient_id, practitioner_id } = req.body;
 
    const createNote = function( title, message, patient_id, practitioner_id ) {

      return db.query(`INSERT INTO patient_notes (title, message, patient_id, practitioner_id)
      VALUES ($1, $2, $3, $4) RETURNING *;`, [title, message, patient_id, practitioner_id])

      .then((result) =>{
        console.log(result)
        res.json(result.rows[0])
      })
      .catch((err) => {
          console.log("ERROR IS : ", err)
        res.status(500).json({ err: err.message });
      })
    }
    createNote(title, message, patient_id, practitioner_id)

  })
  return router;
}