async function chat(req, res) {
  const questionRaw = String(req.body.question || "").trim();
  const question = questionRaw.toLowerCase();

  let answer =
    "Mình chưa xác định được thủ tục bạn cần. Bạn có thể hỏi theo tên thủ tục, ví dụ: “xác nhận sinh viên”, “cấp bảng điểm”, “học phí” hoặc “học lại”.";
  let source = "Kho hướng dẫn nghiệp vụ VKU · bản mô phỏng";
  let action = "Xem danh mục thủ tục";
  let actionHref = "/procedures";

  if (question.includes("xác nhận sinh viên") || question.includes("xác nhận sv")) {
    answer =
      "Thủ tục xác nhận sinh viên thường cần thông tin MSSV, CCCD/thẻ sinh viên và mục đích xin xác nhận. Thời gian xử lý dự kiến 2–3 ngày làm việc. Bạn có thể tạo hồ sơ trực tiếp từ mục Thủ tục & checklist.";
    source = "Hướng dẫn xác nhận sinh viên · Phòng Công tác sinh viên";
    action = "Tạo hồ sơ xác nhận";
    actionHref = "/requests/new";
  } else if (question.includes("bảng điểm")) {
    answer =
      "Để xin bảng điểm, bạn cần xác định loại bảng điểm cần cấp và kiểm tra thông tin học tập. Hồ sơ được chuyển đến Phòng Đào tạo, thời gian xử lý dự kiến 1–2 ngày làm việc.";
    source = "Hướng dẫn cấp bảng điểm · Phòng Đào tạo";
    action = "Xem thủ tục bảng điểm";
    actionHref = "/procedures";
  } else if (question.includes("học phí") || question.includes("miễn giảm")) {
    answer =
      "Hồ sơ miễn/giảm học phí thường gồm đơn đề nghị, giấy tờ chứng minh đối tượng và giấy tờ tùy thân. Bạn nên kiểm tra checklist đúng với diện chính sách trước khi gửi.";
    source = "Quy định miễn giảm học phí · Phòng Công tác sinh viên";
    action = "Xem checklist";
    actionHref = "/procedures";
  } else if (question.includes("học lại") || question.includes("đăng ký học lại")) {
    answer =
      "Với đăng ký học lại, bạn cần kiểm tra học phần, điều kiện tiên quyết và thời gian đăng ký. Nếu hệ thống yêu cầu minh chứng, hãy bổ sung trước hạn để tránh hồ sơ bị treo.";
    source = "Hướng dẫn đăng ký học lại · Phòng Đào tạo";
    action = "Tạo yêu cầu";
    actionHref = "/requests/new";
  } else if (question.includes("trạng thái") || question.includes("hồ sơ của tôi")) {
    answer =
      "Bạn có thể theo dõi trạng thái từ mục Hồ sơ của tôi. Mỗi hồ sơ có mã riêng và tiến trình: Chờ tiếp nhận → Đang xử lý → Cần bổ sung (nếu có) → Hoàn thành.";
    source = "Quy trình theo dõi hồ sơ · VKU Care";
    action = "Mở hồ sơ của tôi";
    actionHref = "/requests";
  }

  res.json({
    success: true,
    answer,
    source,
    action,
    actionHref
  });
}

module.exports = { chat };
