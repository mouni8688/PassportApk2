const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.session.message = "Email already registered. Please login.";
      return res.redirect("/");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    req.session.message = "Registration successful. Please login.";
    res.redirect("/login");

  } catch (error) {
    console.error(error);
    req.session.message = "Something went wrong. Try again.";
    res.redirect("/register");
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.session.message = "User not found. Please register.";
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.session.message = "Wrong password. Please try again.";
      return res.redirect("/login");
    }

    req.session.user = {
      id: user._id,
      role: user.role
    };

    if (user.role === "student") {
      return res.redirect("/student/status");
    } else {
      return res.redirect("/admin/dashboard");
    }

  } catch (error) {
    console.error(error);
    req.session.message = "Something went wrong. Try again.";
    res.redirect("/login");
  }
};

// FORGOT PASSWORD (DEMO)
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    req.session.message = "Email not registered.";
    return res.redirect("/forgot-password");
  }

  req.session.message = "Password reset link sent to your email (demo).";
  res.redirect("/login");
};
