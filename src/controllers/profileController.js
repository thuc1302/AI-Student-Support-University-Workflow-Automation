const userModel = require("../models/userModel");

function showProfile(req, res) {
  res.render("profile", { error: null });
}

function changePassword(req, res) {
  const { currentPassword, newPassword, confirmPassword } = req.body;
  const user = userModel.findById(req.session.user.id);

  if (!user || user.password !== currentPassword) {
    return res.render("profile", {
      error: "Mật khẩu hiện tại không chính xác"
    });
  }

  if (!newPassword || newPassword.length < 6) {
    return res.render("profile", {
      error: "Mật khẩu mới phải có ít nhất 6 ký tự"
    });
  }

  if (newPassword !== confirmPassword) {
    return res.render("profile", {
      error: "Mật khẩu nhập lại không khớp"
    });
  }

  userModel.updatePassword(user.id, newPassword);
  req.session.user.password = newPassword;
  req.session.message = "Đổi mật khẩu thành công";
  res.redirect("/profile");
}

module.exports = {
  showProfile,
  changePassword
};
