const documents = [
  {
    id: 1,
    title: "Quy trình xác nhận sinh viên",
    department: "Phòng CTSV",
    version: "1.2",
    status: "Đang sử dụng",
    updatedAt: "08/2025"
  },
  {
    id: 2,
    title: "Hướng dẫn cấp bảng điểm",
    department: "Phòng Đào tạo",
    version: "2.0",
    status: "Đang sử dụng",
    updatedAt: "07/2025"
  },
  {
    id: 3,
    title: "Quy định miễn giảm học phí",
    department: "Phòng CTSV",
    version: "1.1",
    status: "Chờ duyệt",
    updatedAt: "09/2025"
  }
];

function all() {
  return documents;
}

module.exports = {
  all
};