const requestModel = require("../models/requestModel");

function dashboard(req, res) {
  const user = req.session.user;
  const requests =
    user.role === "student"
      ? requestModel.findByStudent(user.email)
      : requestModel.all();

  const stats = {
    processing: requests.filter((item) => item.status === "Đang xử lý").length,
    completed: requests.filter((item) => item.status === "Hoàn thành").length,
    supplement: requests.filter((item) => item.status === "Cần bổ sung").length,
    pending: requests.filter((item) => item.status === "Chờ tiếp nhận").length
  };

  const notifications = user.role === "student"
    ? [
        {
          title: "Hồ sơ xác nhận sinh viên đang được xử lý",
          meta: "HS-2026-0212 · cập nhật hôm nay",
          tone: "blue"
        },
        {
          title: "Hồ sơ đăng ký học lại cần bổ sung minh chứng",
          meta: "HS-2026-0196 · hạn 10/10/2026",
          tone: "orange"
        },
        {
          title: "Bảng điểm điện tử đã sẵn sàng",
          meta: "HS-2026-0201 · đã hoàn thành",
          tone: "green"
        }
      ]
    : [
        {
          title: `${stats.pending} hồ sơ đang chờ tiếp nhận`,
          meta: "Ưu tiên phân công trong hôm nay",
          tone: "orange"
        },
        {
          title: `${stats.supplement} hồ sơ đang chờ sinh viên bổ sung`,
          meta: "Theo dõi trước khi đến hạn",
          tone: "blue"
        }
      ];

  res.render("dashboard", {
    requests: requests.slice(0, 4),
    stats,
    notifications
  });
}

function procedures(req, res) {
  res.render("procedures");
}

function chat(req, res) {
  res.render("chat");
}

module.exports = {
  dashboard,
  procedures,
  chat
};
