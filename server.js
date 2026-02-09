const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const session = require("express-session");

dotenv.config();
connectDB();

const app = express();

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// view engine
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// session config
app.use(session({
  secret: "collegepassportsecret",
  resave: false,
  saveUninitialized: false
}));

// routes (UI only)
app.use("/", require("./routes/authRoutes"));
app.use("/student", require("./routes/studentRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
