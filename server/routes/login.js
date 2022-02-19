const express = require('express');
// const loginRoute = express.Router();
const cookieSession = require('cookie-session');
const router = express.Router();
const bcrypt = require("bcrypt");
const { set } = require('../server');


//GET login page
module.exports = (db) => {

  router.post("/", (req, res) => {
    const { first_name, last_name, email, password, specialty } = req.body; 
    
    //req.body OR req.params
    // console.log("LOGIN: REQ QUERY IS HERE ", req.query); //req.body OR req.params
    // console.log(`REQ`, Object.keys(req))
    //user validation by id
    // const isAuthenticated = function (email, password, db) {
    //   console.log(`email is and password is`, email, password)

    //   return Promise.resolve(false);
    // };


    console.log(bcrypt.hashSync(password, 10))

    if (email || password) {
      const query = `SELECT * FROM practitioners WHERE email = $1`;
      return db.query(query, [email])
        .then(result => {
          const user = result.rows[0]
          if (user) {
            const passwordCheck = bcrypt.compareSync(password, user.password);
            if (passwordCheck) {
              req.session.user_id = user.id; //setting session using id being sent to client
              res.json({ id: user.id, 
                email: user.email,
                first_name : user.first_name,
                last_name : user.last_name,
                specialty : user.specialty
              })
                
            } else {
              res.status(403).send(`Your credential doesn't match`)
            }
          } else {
            res.send({ error: "User does not exist" })
          }
        })
    }
    else {
      res.status(401)
      res.send({ error: "Email and Password required" })

    }

    // const id = req.session.user_id; //this id pass to query?
    // const idIsExisting = isAuthenticated(email, password, db);
    // idIsExisting.then((value) => {
    //   if (value) {
    //     res.send() //if user in db exists, redirect to homepage
    //   }
    //   const templateVars = { value: false };

    // res.send(templateVars)
    // })


    // const id = req.session.user_id; //this id pass to query?
    // const showUser = function ({ first_name, last_name, email, password, specialty }) {
    //   return db.query(`SELECT first_name, last_name, email, password, specialty
    // FROM practitioners
    // WHERE practitioners.email = $1`, [email]) //req.session.user_id should be used when we start session

    //     .then((result) => {
    //       console.log("RESULT ! IS:", result)
    //       return result.rows[0];
    //     })
    //     .catch((err) => {
    //       console.log(err.message)
    //     })
    // }

    // showUser(req.query) //req.body OR req.params
    //   .then((result) => {
    //     console.log(`THE RESULT INSIDE SHOW USER IS THIS:`, result)
    //     if (result) {
    //       res.send(result)
    //     }
    //   })
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