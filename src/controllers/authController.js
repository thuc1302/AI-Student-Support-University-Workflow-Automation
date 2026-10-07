const userModel = require("../models/userModel");

function showLogin(req, res) {
  res.render("login", { error: null });
}

function login(req, res) {
  const { email, password } = req.body;
  const user = userModel.findByEmail(email);

  if (!user || user.password !== password) {
    return res.render("login", {
      error: "Email hoặc mật khẩu không chính xác"
    });
  }

  req.session.user = user;
  res.redirect("/dashboard");
}

function showRegister(req, res) {
  res.render("register", { error: null });
}

function register(req, res) {
  const { name, email, password, role } = req.body;

  if (password.length < 6) {
    return res.render("register", {
      error: "Mật khẩu phải có ít nhất 6 ký tự"
    });
  }

  if (userModel.findByEmail(email)) {
    return res.render("register", {
      error: "Email đã tồn tại"
    });
  }

  const user = userModel.create({
    name,
    email,
    password,
    role: role || "student"
  });

  req.session.user = user;
  res.redirect("/dashboard");
}

function logout(req, res) {
  req.session.destroy(() => {
    res.redirect("/login");
  });
}

module.exports = {
  showLogin,
  login,
  showRegister,
  register,
  logout
};