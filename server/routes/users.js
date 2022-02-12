
// -- routes/catRoutes.js
const router = require('express').Router();

const users = ['Val', 'Alex', 'Elena'];
module.exports = (db) => {
  // all routes will go here 
  router.get('/', (req, res) => {
    const command = "SELECT * FROM patients";
    db.query(command).then(data => {
      res.json(data.rows);
    })
  });

  router.get('/monday', (req, res) =>{
    return res.status(200) .send({
      status: "okay", 
      message: "We are the doctor medical records app",
      date: new Date()
    })
  })

  return router;
}