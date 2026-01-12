☕ Bliss Cafe - Modern Coffee Shop Platform


Tác giả: Beer Phiên 

<img width="925" height="442" alt="image" src="https://github.com/user-attachments/assets/47b9ecdc-ce7c-4d1a-8408-e54646e5f395" />


📖 Giới thiệu (Introduction)

Bliss Cafe là giải pháp chuyển đổi số toàn diện dành cho doanh nghiệp kinh doanh cà phê. Hệ thống không chỉ là website giới thiệu thương hiệu mà còn tích hợp quy trình đặt hàng (Ordering System), quản lý menu và theo dõi đơn hàng thời gian thực.

Dự án được xây dựng theo kiến trúc Client-Server (RESTful API), đảm bảo khả năng mở rộng và hiệu năng cao.

🛠 Công nghệ sử dụng (Tech Stack)

🎨 Frontend (Client-side)

Giao diện người dùng hiện đại, tương tác mượt mà (SPA).

Core: ReactJS, Vite

Routing: React Router Dom

State/API: Axios

Styling: Bootstrap, React-Bootstrap, CSS Modules

Animations: AOS (Animate On Scroll), Framer Motion, Swiper (Slider)

Map Integration: Leaflet / React-Leaflet

Icons: React Icons

⚙️ Backend (Server-side)

Xử lý logic nghiệp vụ và bảo mật.

Framework: Spring Boot (Java)

Database Interaction: Spring Data JPA, Hibernate

Security: Spring Security (JWT/Session based)

Build Tool: Maven

🗄️ Database & Tools

Database: MySQL

Design: MySQL Workbench

API Testing: Postman

IDE: VS Code (Frontend), IntelliJ IDEA/Eclipse (Backend)

🌟 Chức năng chính (Features)

👤 Dành cho Khách hàng (User)

[x] Authentication: Đăng ký, Đăng nhập (Hỗ trợ Google Login).

[x] Trang chủ: Slider chuyển động, hiệu ứng cuộn trang giới thiệu không gian quán.

[x] Menu điện tử: Xem danh sách đồ uống/bánh ngọt, tìm kiếm và lọc theo danh mục.

[x] Đặt hàng (Order):

Chọn Size (Nhỏ/Vừa/Lớn).

Thêm vào giỏ hàng.

Tính tổng tiền tự động.

Nhập thông tin giao hàng và đặt đơn.

[x] Quản lý đơn hàng: Theo dõi trạng thái (Chờ xử lý -> Đang giao -> Hoàn thành), hủy đơn khi chưa xử lý.

[x] Thông tin: Xem bản đồ vị trí quán, tin tức sự kiện.

🛡️ Dành cho Quản trị viên (Admin Dashboard)

[x] Dashboard: Thống kê tổng quan.

[x] Quản lý Sản phẩm (Product Management):

Thêm/Sửa/Xóa đồ uống.

Cập nhật giá, hình ảnh, mô tả.

[x] Quản lý Đơn hàng (Order Processing):

Tiếp nhận đơn hàng mới.

Cập nhật trạng thái: Pending -> Shipping -> Completed hoặc Cancelled.

[x] Quản lý Người dùng: Xem danh sách khách hàng.

📸 Demo (Screenshots)

Trang Chủ

Menu Đồ Uống

<img width="945" height="445" alt="image" src="https://github.com/user-attachments/assets/a8d7763f-f2ac-44fc-bfc1-387579bbb2d9" />


Giỏ Hàng & Đặt Đơn
<img width="945" height="455" alt="image" src="https://github.com/user-attachments/assets/1af21413-f62e-4306-8520-889fc7bb57f2" />

<img width="945" height="553" alt="image" src="https://github.com/user-attachments/assets/2337dc18-56c5-4435-b3e8-c2a9cfdf7b0c" />

Admin Dashboard

<img width="945" height="437" alt="image" src="https://github.com/user-attachments/assets/da1f5f30-ff16-480a-aaa6-c41a949207c5" />


(Lưu ý: Hãy tạo thư mục images trong repo và bỏ ảnh chụp màn hình vào đó, đặt tên tương ứng)

🚀 Hướng dẫn cài đặt (Installation)

1. Yêu cầu hệ thống

Java JDK: 17 trở lên

Node.js: v18 trở lên

MySQL: 8.0

2. Thiết lập Database (MySQL)

Tạo database mới tên bliss_cafe.

Import file script SQL (nếu có) hoặc để Hibernate tự động tạo bảng (update application.properties).

3. Cài đặt Backend

cd backend
# Cấu hình file src/main/resources/application.properties (username/password MySQL)
./mvnw clean install
./mvnw spring-boot:run


Backend sẽ chạy tại: http://localhost:8080

4. Cài đặt Frontend

cd FrontEnd
# Cài đặt thư viện
npm install

# Chạy dự án
npm run dev


Frontend sẽ chạy tại: http://localhost:5173

📞 Liên hệ

Nếu bạn có câu hỏi hoặc muốn đóng góp cho dự án, vui lòng liên hệ:

Email: [Email của ông]

Facebook/LinkedIn: [Link Profile của ông]

© 2025 Bliss Cafe Project. Built with ❤️ and Coffee.
