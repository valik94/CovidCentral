const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
/* GET home page. */
module.exports = (db) => {
  router.post("/", function (req, res) {
    console.log("POST: we got here")
    const {first_name, last_name, email, password, specialty} = req.body

    // const getUserWithEmail = (db, email) =>{
    //     return Promise.resolve({ rows: [] })
    // }
   
    const addPractitioner = function ({first_name, last_name, email, password, specialty}) {
      const hashPassword = bcrypt.hashSync(password, 10);
      return db.query( //return of the query is the ones that fulfills the database columns
          'INSERT INTO practitioners (first_name, last_name, email, password, specialty) VALUES($1, $2, $3, $4, $5) RETURNING *',
          [first_name, last_name, email, hashPassword, specialty]
        )
        .then((result) => {  //receives results of the query
          console.log("RESULT==========", result);
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        });
    };

    addPractitioner(req.body)
    
      .then((result) => { //sends result to client as response -- truncated result from query
        if (result) {
            res.send(result)
        }
      });
  });
  router.get("/register", (req, res) => {
    res.send();
  });
  return router;
};
