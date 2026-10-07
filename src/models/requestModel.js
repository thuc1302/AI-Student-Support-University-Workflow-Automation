const requests = [
  {
    id: "HS-2026-0212",
    type: "Xác nhận sinh viên",
    student: "Nguyễn An",
    studentEmail: "student@vku.edu.vn",
    department: "Phòng CTSV",
    status: "Đang xử lý",
    assignee: "Trần Minh",
    createdAt: "05/10/2026",
    dueAt: "09/10/2026",
    description: "Xin giấy xác nhận sinh viên để bổ sung hồ sơ học bổng.",
    history: [
      { label: "Đã gửi hồ sơ", time: "05/10/2026 · 09:15", done: true },
      { label: "Đã tiếp nhận", time: "05/10/2026 · 14:20", done: true },
      { label: "Đang xử lý", time: "06/10/2026 · 08:30", done: true },
      { label: "Hoàn thành", time: "Dự kiến 09/10/2026", done: false }
    ]
  },
  {
    id: "HS-2026-0201",
    type: "Cấp bảng điểm",
    student: "Nguyễn An",
    studentEmail: "student@vku.edu.vn",
    department: "Phòng Đào tạo",
    status: "Hoàn thành",
    assignee: "Lê Hương",
    createdAt: "25/09/2026",
    dueAt: "27/09/2026",
    description: "Đề nghị cấp bảng điểm học kỳ gần nhất.",
    history: [
      { label: "Đã gửi hồ sơ", time: "25/09/2026 · 10:10", done: true },
      { label: "Đã tiếp nhận", time: "25/09/2026 · 13:40", done: true },
      { label: "Đang xử lý", time: "26/09/2026 · 08:15", done: true },
      { label: "Hoàn thành", time: "26/09/2026 · 16:05", done: true }
    ]
  },
  {
    id: "HS-2026-0196",
    type: "Đăng ký học lại",
    student: "Nguyễn An",
    studentEmail: "student@vku.edu.vn",
    department: "Phòng Đào tạo",
    status: "Cần bổ sung",
    assignee: "Lê Hương",
    createdAt: "22/09/2026",
    dueAt: "10/10/2026",
    description: "Đăng ký học lại học phần Cơ sở dữ liệu.",
    history: [
      { label: "Đã gửi hồ sơ", time: "22/09/2026 · 11:25", done: true },
      { label: "Đã tiếp nhận", time: "22/09/2026 · 15:00", done: true },
      { label: "Cần bổ sung minh chứng", time: "23/09/2026 · 09:30", done: true },
      { label: "Hoàn thành", time: "Chưa hoàn thành", done: false }
    ]
  },
  {
    id: "HS-2026-0183",
    type: "Cấp bảng điểm",
    student: "Lê Hà",
    studentEmail: "leha@vku.edu.vn",
    department: "Phòng Đào tạo",
    status: "Cần bổ sung",
    assignee: "",
    createdAt: "18/09/2026",
    dueAt: "24/09/2026",
    description: "Đề nghị cấp bảng điểm học tập.",
    history: []
  },
  {
    id: "HS-2026-0180",
    type: "Giấy miễn giảm học phí",
    student: "Phạm Nam",
    studentEmail: "phamnam@vku.edu.vn",
    department: "Phòng CTSV",
    status: "Hoàn thành",
    assignee: "Trần Minh",
    createdAt: "15/09/2026",
    dueAt: "20/09/2026",
    description: "Xin xác nhận thuộc diện miễn giảm học phí.",
    history: []
  }
];

function all() {
  return requests;
}

function findById(id) {
  return requests.find((request) => request.id === id);
}

function findByStudent(email) {
  return requests.filter((request) => request.studentEmail === email);
}

function filter({ q, status }) {
  return requests.filter((request) => {
    const keyword = (q || "").toLowerCase();

    const matchesKeyword =
      !keyword ||
      request.id.toLowerCase().includes(keyword) ||
      request.student.toLowerCase().includes(keyword) ||
      request.type.toLowerCase().includes(keyword);

    const matchesStatus = !status || request.status === status;
    return matchesKeyword && matchesStatus;
  });
}

function create(data) {
  const year = new Date().getFullYear();
  const maxSequence = requests.reduce((max, request) => {
    const match = request.id.match(/(\d{4})$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 200);

  const request = {
    id: `HS-${year}-${String(maxSequence + 1).padStart(4, "0")}`,
    type: data.type,
    student: data.student,
    studentEmail: data.studentEmail,
    department: data.department || "Phòng CTSV",
    status: "Chờ tiếp nhận",
    assignee: "",
    createdAt: new Date().toLocaleDateString("vi-VN"),
    dueAt: "Đang cập nhật",
    description: data.description,
    history: [
      {
        label: "Đã gửi hồ sơ",
        time: `${new Date().toLocaleDateString("vi-VN")} · vừa xong`,
        done: true
      },
      { label: "Đã tiếp nhận", time: "Đang chờ", done: false },
      { label: "Đang xử lý", time: "Đang chờ", done: false },
      { label: "Hoàn thành", time: "Đang chờ", done: false }
    ]
  };

  requests.unshift(request);
  return request;
}

function update(id, data) {
  const request = findById(id);
  if (!request) return null;

  const oldStatus = request.status;
  if (data.status) request.status = data.status;
  if (data.assignee !== undefined) request.assignee = data.assignee;
  if (data.description) request.description = data.description;

  if (data.status && data.status !== oldStatus) {
    request.history = request.history || [];
    request.history.push({
      label: data.status,
      time: `${new Date().toLocaleDateString("vi-VN")} · vừa cập nhật`,
      done: true
    });
  }

  return request;
}

module.exports = {
  all,
  findById,
  findByStudent,
  filter,
  create,
  update
};
