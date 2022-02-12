const express = require('express');
// const loginRoute = express.Router();
// const cookieSession = require('cookie-session');


// app.use(cookieSession({
//     name: 'session',
//     keys: ['key1'],
  
//     maxAge: 24 * 60 * 60 * 1000
//   }));

// /*Helper Function QUERIES*/
// //Authentication function based on userID passed to db
// const isAuthenticated = function (userId, db) {
//     if (userId) {
//       const query = `SELECT id FROM users
//       WHERE id = ${userId}`;
//       return db.query(query)
//         .then(res => {
//           if (res.rows.length === 0) {
//             return false;
//           } else {
//             return res.rows[0].id;
//           }
//         })}
//     return Promise.resolve(false);
//   };

//   const emailExists = function (userEmail, db) {
//     const query = ` SELECT email
//         FROM users
//         WHERE email = '${userEmail}';`
//     return db.query(query)
//       .then(res => {
//     // if email not found in db, res.rows.length === 0, we catch this
//         if (res.rows.length === 0) {
//           return false;
//         } else {
//           return true;
//         }
//       });
//   };

//   const passwordValidator = function (userPassword, userEmail, db) {

//     const query = `
//        SELECT id, master_password
//        FROM users
//        WHERE email = '${userEmail}';`
  
//     return db.query(query)
//       .then(res => {
  
//         if (res.rows[0].master_password === userPassword) {
//           return res.rows[0].id;
//         } else {
//           return false;
//         }
//       });
//   };




// /* GET route FOR LOGIN page authentication*/
// loginRoute.get("/", (req, res) => {
//     const id = req.session.user_id;
//     const idIsExisting = isAuthenticated(id, db); //perform authentication based on user id
//     idIsExisting.then((value) => {
  
//       if (value) {
//         res.redirect('/index'); //if user in db redirect to index (homepage)
//       }
//       const templateVars = {value: false};
  
//     res.render('login', templateVars) //else redirect to login page to login/register
//   })
// });

// /* POST route
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then
//    syncronous error handling before our promise chain below even starts */
//    loginRoute.post("/", (req, res) => {
//     const { email, password } = req.body;
//     const errors = {
//       email: "Must provide email!",
//       password: "Must provide password!",
//       emailOrPwinvalid: "Email or Password is invalid!",
//     };
  
//     if (!email) {
//       res.send(errors.email);
//       return;
//     } else if (!password) {
//       res.send(errors.password);
//       return;
//     }
  
//     /* promise chain that will first check if the users email exists against our db and then validate their password
//      * async error handling for when a username or password is invalid will happen in here */
//     let validUserEmail = emailExists(email, db);
//     validUserEmail.then((value) => { //helper password and email validation function follow
  
//       if (!value) {
//         res.send(errors.emailOrPwinvalid);
//         throw new Error('email does not exist');
//       } else {
//         return passwordValidator(password, email, db);
//       }
//     }).then((value) => {
  
//       if (!value) {
//         res.send(errors.emailOrPwinvalid);
//         throw new Error('password does not exist');
//       } else {
//         req.session.user_id = value;
//         res.json({status: "Success", redirect: '/'});
//       }
//     }).catch(error => {
//       console.log(error);
//     });
//   });
  
//   module.exports = loginRoute;