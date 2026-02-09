const Passport = require("../models/Passport");

// APPLY FORM
exports.applyForm = (req, res) => {
  res.render("apply");
};

// APPLY PASSPORT
exports.applyPassport = async (req, res) => {
  const { department, year } = req.body;

  const applicationNumber = "APP" + Date.now();

  await Passport.create({
    studentId: req.user.id,
    department,
    year,
    applicationNumber,
    status: "pending",
    passportNumber: "Pending"
  });

  res.redirect("/student/status");
};

// CHECK STATUS
exports.checkStatus = async (req, res) => {
  const application = await Passport.findOne({ studentId: req.user.id });
  res.render("status", { application });
};
