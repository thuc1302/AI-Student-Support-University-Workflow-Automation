function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }

  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/login");
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).send("Bạn không có quyền truy cập chức năng này");
    }

    next();
  };
}

module.exports = {
  requireAuth,
  requireRole
};