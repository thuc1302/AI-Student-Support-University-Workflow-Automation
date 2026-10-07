const requestModel = require("../models/requestModel");

function list(req, res) {
  const user = req.session.user;
  const { q, status } = req.query;

  let requests =
    user.role === "student"
      ? requestModel.findByStudent(user.email)
      : requestModel.filter({ q, status });

  if (user.role === "student" && status) {
    requests = requests.filter((request) => request.status === status);
  }

  if (user.role === "student" && q) {
    const keyword = String(q).toLowerCase();
    requests = requests.filter((request) =>
      [request.id, request.type, request.department]
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }

  res.render("requests", {
    requests,
    filters: { q: q || "", status: status || "" }
  });
}

function detail(req, res) {
  const user = req.session.user;
  const request = requestModel.findById(req.params.id);

  if (!request) return res.status(404).send("Không tìm thấy hồ sơ");
  if (user.role === "student" && request.studentEmail !== user.email) {
    return res.status(403).send("Bạn không có quyền xem hồ sơ này");
  }

  res.render("request-detail", { request });
}

function showCreate(req, res) {
  res.render("new-request");
}

function create(req, res) {
  const user = req.session.user;

  requestModel.create({
    type: req.body.type,
    description: req.body.description,
    student: user.name,
    studentEmail: user.email,
    department: req.body.department
  });

  req.session.message = "Tạo hồ sơ thành công";
  res.redirect("/requests");
}

function update(req, res) {
  requestModel.update(req.params.id, {
    status: req.body.status,
    assignee: req.body.assignee
  });

  req.session.message = "Đã cập nhật hồ sơ";
  res.redirect(`/requests/${req.params.id}`);
}

module.exports = {
  list,
  detail,
  showCreate,
  create,
  update
};
