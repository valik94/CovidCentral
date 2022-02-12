const express = require("express");
const router = express.Router();

/* GET home page. */
module.exports = (db) => {
  router.post("/register", function (req, res, next) {
    console.log("POST: we got here")
    const {first_name, last_name, email, password, specialty} = req.body
    const addUser = function (user) {
      return db
        .query(
          `INSERT INTO practitioners (first_name, last_name, email, password, specialty)
VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
          [first_name, last_name, email, password, specialty]
        )
        .then((result) => {
          console.log("RESULT==========", result);
          return result.rows[0];
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    
    

    getUserWithEmail(email)
      .then((result) => {
        if (result) {
          return result;
        } else {
          return getUserWithEmail(email);
        }
      })
      .then((result) => {
        if (result) {
          res.redirect("/login");
        } else {
          addUser(user).then((user) => {
            if (user) {
              req.session["user_id"] = user.id;
            }
            res.redirect("/");
          });
        }
      });
  });
  router.get("/register", (req, res) => {
    res.render("register");
  });
  return router;
};
