const Passport = require("../models/Passport");

// ADMIN DASHBOARD
exports.dashboard = async (req, res) => {
  const applications = await Passport.find().populate("studentId");
  res.render("admin", { applications });
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  const { status } = req.body;

  let passportNumber = "Pending";

  if (status === "approved") {
    passportNumber = `COL-${new Date().getFullYear()}-${Math.floor(
      10000 + Math.random() * 90000
    )}`;
  }

  await Passport.findByIdAndUpdate(req.params.id, {
    status,
    passportNumber
  });

  res.redirect("/admin/dashboard");
};
