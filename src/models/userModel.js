const users = [
  {
    id: 1,
    name: "Nguyễn An",
    email: "student@vku.edu.vn",
    password: "123456",
    role: "student",
    department: "Khoa Khoa học máy tính",
    studentId: "23IT001",
    className: "23IT1",
    major: "Công nghệ thông tin",
    faculty: "Khoa Khoa học máy tính",
    course: "2023 - 2027",
    phone: "0905 123 456",
    dateOfBirth: "15/08/2005",
    gender: "Nam",
    academicStatus: "Đang học",
    advisor: "TS. Trần Minh"
  },
  {
    id: 2,
    name: "Trần Minh",
    email: "staff@vku.edu.vn",
    password: "123456",
    role: "staff",
    department: "Phòng Công tác sinh viên"
  },
  {
    id: 3,
    name: "Quản trị VKU",
    email: "admin@vku.edu.vn",
    password: "123456",
    role: "admin",
    department: "Quản trị hệ thống"
  }
];

function findByEmail(email) {
  return users.find((user) => user.email === email);
}

function findById(id) {
  return users.find((user) => user.id === Number(id));
}

function create(data) {
  const user = {
    id: users.length + 1,
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role || "student",
    department: data.department || "Sinh viên",
    studentId: data.role === "student" || !data.role ? `SV${Date.now().toString().slice(-6)}` : undefined,
    className: "Chưa cập nhật",
    major: "Chưa cập nhật",
    faculty: "Chưa cập nhật",
    course: "Chưa cập nhật",
    phone: "Chưa cập nhật",
    dateOfBirth: "Chưa cập nhật",
    gender: "Chưa cập nhật",
    academicStatus: "Đang học",
    advisor: "Chưa cập nhật"
  };

  users.push(user);
  return user;
}

function updatePassword(id, newPassword) {
  const user = findById(id);
  if (!user) return null;
  user.password = newPassword;
  return user;
}

function all() {
  return users;
}

module.exports = {
  users,
  findByEmail,
  findById,
  create,
  updatePassword,
  all
};
