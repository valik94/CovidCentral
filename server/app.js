const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./configs/db.config");
// const db2 = require('./routes/register.js')
db.connect();

const indexRouter = require("./routes/index");
const practitionersRouter = require("./routes/practitioners");

// const registerRouter = require("./routes/register");
// const loginRouter = require("./routes/login");

const app = express();

app.use(logger("dev"));
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/practitioners", practitionersRouter(db));

// app.use("/appointment", practitionersRouter(db));
// app.use("/api/register", registerRouter(db));
// app.get('/users', db2.getUsers);
// app.use("/login", loginRouter(db));
// console.log(process.env)
module.exports = app;
