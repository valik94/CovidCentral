const express = require('express');
// const loginRoute = express.Router();
const cookieSession = require('cookie-session');
const router = express.Router();

module.exports = (db) => {

router.post("/", (req, res) => {
    req.session = null;
    res.redirect("/")
})
    return router;
}