Ý nghĩa từng tầng
server.js
Điểm khởi động của ứng dụng. File này cấu hình Express, EJS, static files, session, biến dùng chung trong view, đăng ký các route và chạy server ở port 3000.
src/routes/
Khai báo URL nào sẽ gọi controller nào, đồng thời gắn middleware xác thực/phân quyền.
src/controllers/
Chứa logic xử lý request/response: đăng nhập, dashboard, hồ sơ, AI, profile và admin.
src/models/
Hiện đang đóng vai trò kho dữ liệu mô phỏng. Các mảng users, requests, documents tồn tại trong RAM khi server đang chạy.
src/middleware/
Kiểm tra người dùng đã đăng nhập chưa và vai trò có được phép truy cập chức năng không.
src/views/
Giao diện EJS được render ở phía server.
src/public/
CSS và JavaScript chạy phía trình duyệt.
Vai trò và phân quyền
Hệ thống có 3 role:
Student
Có thể:
- Xem dashboard cá nhân.
- Xem lý lịch sinh viên.
- Đổi mật khẩu.
- Xem thủ tục & checklist.
- Chat với trợ lý VKU AI.
- Tạo hồ sơ mới.
- Xem và tìm kiếm hồ sơ của chính mình.
- Xem chi tiết, trạng thái và lịch sử hồ sơ.
Không thể cập nhật trạng thái hồ sơ của người khác.
Staff
Có thể:
- Xem dashboard xử lý nghiệp vụ.
- Xem danh sách hồ sơ toàn hệ thống.
- Tìm kiếm/lọc hồ sơ.
- Xem chi tiết hồ sơ.
- Cập nhật trạng thái và người phụ trách.
Admin
Có các quyền xử lý hồ sơ giống staff và thêm:
- Truy cập trang /admin.
- Xem danh sách tài khoản.
- Xem thống kê hồ sơ.
- Xem danh mục tài liệu nghiệp vụ mô phỏng.