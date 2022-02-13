const express = require("express");
const router = express.Router();

/* GET home page. */
module.exports = (db) => {
  router.post("/", function (req, res) {
    console.log("POST: we got here")
    const {first_name, last_name, email, password, specialty} = req.body

    // const getUserWithEmail = (db, email) =>{
    //     return Promise.resolve({ rows: [] })
    // }
    
    const addPractitioner = function ({first_name, last_name, email, password, specialty}) {
      return db.query( //return of the query is the ones that fulfills the database columns
          'INSERT INTO practitioners (first_name, last_name, email, password, specialty) VALUES($1, $2, $3, $4, $5) RETURNING *',
          [first_name, last_name, email, password, specialty]
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
    //   .then((result) => { // 
    //     if (result) {
    //       return result;
    //     } else {
    //     //   return getUserWithEmail(email);
    //     }
    //   })
      .then((result) => { //sends result to client as response
        if (result) {
            res.send(result)

        //   res.redirect("/login");
        // } else {
        //   addPractitioner(user).then((user) => {
        //     if (user) {
        //       req.session["user_id"] = user.id;
        //     }
        //     res.redirect("/");
        //   });
        }
      });
  });
  router.get("/register", (req, res) => {
    res.render("register");
  });
  return router;
};
