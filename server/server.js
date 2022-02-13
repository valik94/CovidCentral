const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bcrypt = require("bcrypt");
const cors = require("cors");
const db = require("./configs/db.config");

db.connect();
// db.query(`SELECT * FROM patients`)
// .then(res => console.log(res.rows))
// .catch(err => console.log(err.message))

// const indexRouter = require("./routes/index");
const practitionersRouter = require("./routes/practitioners");

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");

const app = express();

// app.use(logger("dev"));
// app.use(cors());

app.use(express.json());
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));



// app.use("/", indexRouter);
app.use("/api/practitioners", practitionersRouter(db));

// app.use("/appointment", practitionersRouter(db));
app.use("/api/register", registerRouter(db));
// app.get('/users', db2.getUsers);
app.use("/api/login", loginRouter(db));
// console.log(process.env)

app.listen(8080, ()=> {console.log("LISTENING ON PORT 8080")})


module.exports = app;
