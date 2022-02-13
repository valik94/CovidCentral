const express = require('express');
const loginRoute = express.Router();
const cookieSession = require('cookie-session');

router.post("/login", (req, res) => {
  const { email, password, type } = req.body;
  console.log("LOGIN :", req.body);
  login(req.body.email, req.body.type, req.body.password)
    .then((user) => {
      if (!user) {
        res.send({ error: "error" });
        return;
      }
      req.session.userId = user.id;
      req.session.userType = type;

      res.send({
        user,
        type,
      });
    })
    .catch((e) => res.send(e));
});