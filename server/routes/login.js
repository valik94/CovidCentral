const express = require('express');
// const loginRoute = express.Router();
const cookieSession = require('cookie-session');
const router = express.Router();

module.exports = (db) =>{
router.get("/", (req, res) => {
  const { first_name, last_name, email, password, specialty } = req.body;
  console.log("LOGIN: ", req.body);

  // const id = req.session.user_id; //this id pass to query?
  const showUser = function ({ first_name, last_name, email, password, specialty }) {
    return db.query(`SELECT first_name, last_name, email, password, specialty
    FROM practitioners
    WHERE practitioners.id = $1`, [1]) //req.session.user_id should be used when we start session

        .then((result) => {
          console.log("RESULT ! IS:", result)
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message)
        })
  }

  showUser(req.body)
    .then((result) => {
      console.log(`THE RESULT INSIDE SHOW USER IS THIS:`, result)
      if (result) {
        res.send(result)
      }
    })
})
router.get("/login", (req, res) => {
  res.render('/login');
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