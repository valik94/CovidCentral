const express = require('express');
// const loginRoute = express.Router();
const cookieSession = require('cookie-session');
const router = express.Router();


//GET login page
module.exports = (db) => {
  router.get("/", (req, res) => {
    const { first_name, last_name, email, password, specialty } = req.query; //req.body OR req.params
    // console.log("LOGIN: REQ QUERY IS HERE ", req.query); //req.body OR req.params
    // console.log(`REQ`, Object.keys(req))
    //user validation by id
    // const isAuthenticated = function (email, password, db) {
    //   console.log(`email is and password is`, email, password)
      
    //   return Promise.resolve(false);
    // };
    
    if (email && password) {
      const query = `SELECT * FROM practitioners WHERE email = $1 AND password = $2`;
      return db.query(query, [email, password])
        .then(result => {
          if (result.rows[0]){
            res.send(result.rows[0])

          }
          else{
            res.send({error : "User does not exist"})
          }
        });
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