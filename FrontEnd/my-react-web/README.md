# Coffee Shop Web Application

Ứng dụng web quản lý quán cà phê với hệ thống phân quyền JWT.

## Tính năng chính

### 🔐 Hệ thống phân quyền JWT
- **Đăng nhập/Đăng xuất** với JWT token
- **Phân quyền theo role**: ROLE_ADMIN, ROLE_USER
- **Bảo vệ route** với ProtectedRoute component
- **Tự động refresh token** khi hết hạn

### 👥 Phân quyền chi tiết

#### ROLE_ADMIN
- Thêm/sửa/xóa sản phẩm menu
- Quản lý toàn bộ menu
- Truy cập trang quản lý
- Xem thông tin tài khoản

#### ROLE_USER
- Xem menu sản phẩm
- Đặt hàng
- Xem chi tiết sản phẩm
- Quản lý tài khoản cá nhân

### 🛡️ Bảo mật
- JWT token được lưu trong localStorage
- Token tự động được thêm vào header của tất cả API calls
- Tự động logout khi token hết hạn
- Mã hóa thông tin nhạy cảm

## Cấu trúc hệ thống phân quyền

### 1. Auth Service (`src/service/auth.js`)
```javascript
// Các function chính:
- decodeToken(token) // Decode JWT token
- isTokenValid(token) // Kiểm tra token hợp lệ
- getUserFromToken(token) // Lấy thông tin user từ token
- hasRole(user, roleName) // Kiểm tra role
- isAdmin(user) // Kiểm tra admin
- isUser(user) // Kiểm tra user thường
- saveAuthData(token, userData) // Lưu thông tin đăng nhập
- clearAuthData() // Xóa thông tin đăng nhập
```

### 2. Auth Hook (`src/hooks/useAuth.js`)
```javascript
// Hook cung cấp:
- user // Thông tin user hiện tại
- loading // Trạng thái loading
- hasRole(roleName) // Kiểm tra role
- isAdmin() // Kiểm tra admin
- isUser() // Kiểm tra user
- authenticated() // Kiểm tra đã đăng nhập
```

### 3. Protected Route (`src/components/ProtectedRoute.jsx`)
```javascript
// Sử dụng:
<ProtectedRoute requireAuth={true}>
  <Component />
</ProtectedRoute>

<ProtectedRoute requiredRole="ADMIN">
  <AdminComponent />
</ProtectedRoute>
```

### 4. API Interceptor (`src/service/web_demo.js`)
- Tự động thêm JWT token vào header
- Xử lý lỗi 401 (Unauthorized)
- Tự kh động logouti token hết hạn

## Cách sử dụng

### 1. Đăng nhập
```javascript
// Component Login tự động xử lý JWT token
const response = await loginUser({ username, password });
// Token được lưu tự động và user được chuyển hướng
```

### 2. Bảo vệ route
```javascript
// Trong App.jsx
<Route 
  path="/admin" 
  element={
    <ProtectedRoute requiredRole="ROLE_ADMIN">
      <AdminPage />
    </ProtectedRoute>
  } 
/>
```

### 3. Kiểm tra quyền trong component
```javascript
const { user, isAdmin, hasRole } = useAuth();

if (isAdmin()) {
  // Hiển thị chức năng admin
}

if (hasRole('ROLE_USER')) {
  // Hiển thị chức năng user
}
```

### 4. API calls
```javascript
// Tự động thêm token vào header
const response = await addMenuItem(formData);
// Không cần thêm Authorization header thủ công
```

## Backend Integration

### Response format từ backend
```json
{
  "accessToken": "eyJhbGciOiJIUzUxMiJ9...",
  "tokenType": "Bearer"
}
```

### JWT Token Payload
```json
{
  "sub": "username",
  "fullName": "User Full Name",
  "email": "user@example.com",
  "roles": ["ROLE_ADMIN"],
  "exp": 1234567890,
  "iat": 1234567890
}
```

## Cài đặt và chạy

1. **Cài đặt dependencies:**
```bash
npm install
```

2. **Chạy development server:**
```bash
npm run dev
```

3. **Build production:**
```bash
npm run build
```

## Lưu ý quan trọng

1. **Backend URL**: Đảm bảo backend chạy trên `http://localhost:8080`
2. **CORS**: Backend cần cấu hình CORS cho frontend
3. **JWT Secret**: Backend cần sử dụng secret key để sign JWT
4. **Token Expiration**: Token có thời hạn, cần refresh khi cần thiết

## Troubleshooting

### Token không hợp lệ
- Kiểm tra backend JWT secret
- Kiểm tra token expiration time
- Xóa localStorage và đăng nhập lại

### Không có quyền truy cập
- Kiểm tra role trong JWT token
- Đảm bảo backend trả về đúng roles
- Kiểm tra ProtectedRoute configuration

### API calls fail
- Kiểm tra backend URL
- Kiểm tra CORS configuration
- Kiểm tra Authorization header
