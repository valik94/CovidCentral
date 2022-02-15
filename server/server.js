const express = require("express");
const path = require("path");
const logger = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./configs/db.config");
const cookieSession = require("cookie-session");
db.connect();


const indexRouter = require("./routes/index");

const appointmentsRouter = require("./routes/appointments")

const patientsRouter= require("./routes/patients")
const practitionersRouter = require("./routes/practitioners");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");

const app = express();

app.use(logger("dev"));
// app.use(cors());

app.use(express.json());
app.use(cookieSession({
    name: "Doctor Session",
    keys: ["public key", "private key"], //pseudo-secret keys
    maxAge: 24 * 60 * 60 * 1000 //24 hour expiry
}));
// app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);

app.use("/api/appointments", appointmentsRouter(db));
app.use("/api/patients", patientsRouter(db));
app.use("/api/practitioners", practitionersRouter(db));

app.use("/api/register", registerRouter(db));
app.use("/api/login", loginRouter(db));
app.use("/api/logout", logoutRouter(db));

app.listen(8080, ()=> {console.log("LISTENING ON PORT 8080")})

// console.log(`this is the login router STACK`, app._router.stack)

module.exports = app;
