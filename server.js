require("dotenv").config();

const ConnectToMongo = require("./config/db");
const passport = require("passport");
const bodyParser = require("body-parser");
const LocalStrategy = require("passport-local").Strategy;
const StudentModel = require("./models/Student");
const TeacherModel = require("./models/Teacher");
const AdminModel = require("./models/Admin");
const express = require("express");
const cors = require("cors");
const multer = require("multer");

ConnectToMongo();

const app = express();
const multerConfig = multer();
const parser = multerConfig.none();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use(passport.initialize());

passport.use("student", new LocalStrategy(StudentModel.authenticate()));
passport.use("admin", new LocalStrategy(AdminModel.authenticate()));
passport.use("teacher", new LocalStrategy(TeacherModel.authenticate()));
passport.serializeUser((user, done) =>
  done(null, { id: user.id, type: user.constructor.modelName })
);
passport.deserializeUser((obj, done) => {
  switch (obj.type) {
    case "Student":
      StudentModel.findById(obj.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
      break;
    case "Teacher":
      TeacherModel.findById(obj.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
      break;
    case "Admin":
      AdminModel.findById(obj.id, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
      break;
    default:
      return done(null, false);
  }
});

// Available Routes
app.use("/teacher", require("./routes/teacher"));
app.use("/student", parser, require("./routes/student"));
app.use("/subject", require("./routes/subject"));
app.use("/admin", parser, require("./routes/admin"));
app.use("/salaries", require("./routes/salaries"));
app.use("/cashIn", require("./routes/cashIn"));
app.use("/cashOut", require("./routes/cashOut"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
