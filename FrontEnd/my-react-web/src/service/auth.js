// Lấy thông tin user từ localStorage
export const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem('user');
    console.log("Raw storedUser:", storedUser);
    
    if (!storedUser || storedUser === "undefined" || storedUser === "null" || storedUser === "") {
      console.log("User không hợp lệ hoặc null");
      return null;
    }
    
    const parsedUser = JSON.parse(storedUser);
    console.log("Parsed user:", parsedUser);
    
    // Kiểm tra xem parsedUser có phải là object hợp lệ không
    if (parsedUser && typeof parsedUser === 'object' && Object.keys(parsedUser).length > 0) {
      return parsedUser;
    } else {
      console.log("Parsed user không phải object hợp lệ");
      return null;
    }
  } catch (e) {
    console.error("Lỗi khi parse user:", e);
    return null;
  }
};

// Lấy token từ localStorage
export const getToken = () => {
  return localStorage.getItem('token') || null;
};

// Decode JWT token để lấy payload
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    // JWT token có format: header.payload.signature
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Lỗi khi decode token:', error);
    return null;
  }
};

// Kiểm tra token có hợp lệ không
export const isTokenValid = (token) => {
  try {
    if (!token) return false;
    
    const decoded = decodeToken(token);
    if (!decoded) return false;
    
    // Kiểm tra thời gian hết hạn
    const currentTime = Date.now() / 1000;
    if (decoded.exp && decoded.exp < currentTime) {
      console.log('Token đã hết hạn');
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Lỗi khi kiểm tra token:', error);
    return false;
  }
};

// Lấy thông tin user từ JWT token
export const getUserFromToken = (token) => {
  try {
    const decoded = decodeToken(token);
    if (!decoded) return null;
    
    // Trả về thông tin user từ token payload
    return {
      username: decoded.sub || decoded.username,
      // fullName: decoded.fullName || decoded.name || decoded.sub,
      email: decoded.email,
      roles: decoded.roles || decoded.authorities || ['USER'],
      exp: decoded.exp,
      iat: decoded.iat
    };
  } catch (error) {
    console.error('Lỗi khi lấy user từ token:', error);
    return null;
  }
};

// Kiểm tra user có role cụ thể không
export const hasRole = (user, roleName) => {
  if (!user || !user.roles) return false;
  
  // Nếu roles là array
  if (Array.isArray(user.roles)) {
    return user.roles.some(role => {
      if (typeof role === 'object' && role.name) {
        return role.name === roleName;
      }
      return role === roleName;
    });
  }
  
  // Nếu roles là string
  if (typeof user.roles === 'string') {
    return user.roles === roleName;
  }
  
  return false;
};

// Kiểm tra có phải admin không
export const isAdmin = (user) => {
  return hasRole(user, 'ADMIN');
};

// Kiểm tra có phải user thường không
export const isUser = (user) => {
  return hasRole(user, 'USER');
};

// Xóa thông tin user và token khi logout
export const clearAuthData = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

// Lưu thông tin đăng nhập
export const saveAuthData = (token, userData) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));
};

// Kiểm tra trạng thái đăng nhập
export const isAuthenticated = () => {
  const token = getToken();
  return isTokenValid(token);
};
