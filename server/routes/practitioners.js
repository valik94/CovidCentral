// -- routes/catRoutes.js
const router = require("express").Router();

module.exports = (db) => {
  // all routes will go here
  router.get("/", (req, res) => {
    // const command = `SELECT practitioners.*, patients.*, appointments.*
    // FROM practitioners
    // JOIN patients ON practitioner_id = practitioners.id
    // JOIN appointments ON appointments.practitioner_id = practitioners.id
    // WHERE practitioners.id = 1;`
    // const command = `SELECT * FROM practitioners;`

    const promises = [];
    const practitioners = db.query(`SELECT *
    FROM practitioners
    WHERE practitioners.id = 1;`);

    const patients = db.query(`SELECT *
    FROM patients
    WHERE practitioner_id = 1;`);

    const appointments = db.query(`SELECT *
    FROM appointments
    WHERE practitioner_id = 1;`);
    promises.push(practitioners);
    promises.push(patients);
    promises.push(appointments);

    Promise.all(promises)
      .then((result) => {
        console.log("RESULT:", result);
        console.log("ROWSSSSS+++++++:", result[0].rows);
        // res.json(result[0].rows, result[1].rows, result[2].rows);
        res.json({
          practitioners: result[0].rows,
          patients: result[1].rows,
          appointments: result[2].rows
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // db.query(command)
  //   .then((data) => {
  //     res.json(data.rows);
  //     console.log("DATA HERE:", data.rows);
  //   })
  //   .catch((error) => {
  //     console.log(`Error setting up the reset route: ${error}`);
  //   });

  return router;
};
