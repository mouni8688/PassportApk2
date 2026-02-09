const authMiddleware = (roles = []) => {
  return (req, res, next) => {

    // user login ayyada?
    if (!req.session.user) {
      return res.redirect("/login");
    }

    // role check
    if (roles.length && !roles.includes(req.session.user.role)) {
      return res.send("Access Denied");
    }

    // controller ki user info pampadam
    req.user = req.session.user;
    next();
  };
};

module.exports = authMiddleware;
