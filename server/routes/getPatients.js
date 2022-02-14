//Get Patients by ID

const express = require('express');
const cookieSession = require('cookie-session');
const router = express.Router();

//get Patients page
module.exports = (db) => {
  router.get("/", (req, res) => {
    const { first_name, last_name, email, phone, emergency_contact, health_card, gender, date_of_birth, practitioner_id } = req.query; //req.body OR req.params
    
    // patient validation by email
    // const isAuthenticated = function (email, password, db) {
    //   console.log(`email is and password is`, email, password)
      
    //   return Promise.resolve(false);
    // };
    
    // if (email && password) {
    //   const query = `SELECT * FROM practitioners WHERE email = $1 AND password = $2`;
    //   return db.query(query, [email, password])
    //     .then(result => {
    //       if (result.rows[0]){
    //         res.send(result.rows[0])

    //       }
    //       else{
    //         res.send({error : "User does not exist"})
    //       }
    //     });
    // }

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
    const showPatient = function ({ first_name, last_name, email, password, specialty }) {
      return db.query(`SELECT * FROM patients
    
    WHERE patients.id = $1`, [1]) //req.session.user_id should be used when we start session

        .then((result) => {
          console.log("RESULT ! IS:", result)
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    showPatient(req.query) //req.body OR req.params
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



//   login(req.body.email, req.body.type, req.body.password)
//     .then((user) => {
//       if (!user) {
//         res.send({ error: "error" });
//         return;
//       }
//       req.session.userId = user.id;
//       req.session.userType = type;

//       res.send({
//         user,
//         type,
//       });
//     })
//     .catch((e) => res.send(e));
// });


