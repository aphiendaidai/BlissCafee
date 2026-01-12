import { useState, useEffect } from 'react';
import { 
  getStoredUser, 
  getToken, 
  isTokenValid, 
  getUserFromToken,
  hasRole as authHasRole,
  isAdmin as authIsAdmin,
  isUser as authIsUser,
  isAuthenticated
} from '../service/auth';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = () => {
      try {
        const token = getToken();
        
        // Kiểm tra token có hợp lệ không
        if (token && isTokenValid(token)) {
          // Lấy thông tin user từ JWT token
          const userFromToken = getUserFromToken(token);
          
          if (userFromToken) {
            // Ưu tiên thông tin từ JWT token
            setUser(userFromToken);
          } else {
            // Fallback về localStorage nếu không decode được token
            const storedUser = getStoredUser();
            setUser(storedUser);
          }
        } else {
          // Token không hợp lệ hoặc hết hạn
          console.log('Token không hợp lệ hoặc đã hết hạn');
          setUser(null);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Lỗi khi kiểm tra user:', error);
        setUser(null);
        setLoading(false);
      }
    };

    checkUser();
    
    // Lắng nghe sự kiện đăng nhập
    const handleUserLogin = (event) => {
      setUser(event.detail);
    };
    
    // Lắng nghe sự kiện logout
    const handleUserLogout = () => {
      setUser(null);
    };
    
    window.addEventListener('userLogin', handleUserLogin);
    window.addEventListener('userLogout', handleUserLogout);
    
    return () => {
      window.removeEventListener('userLogin', handleUserLogin);
      window.removeEventListener('userLogout', handleUserLogout);
    };
  }, []);

  // Kiểm tra role
  const hasRole = (roleName) => {
    return authHasRole(user, roleName);
  };

  // Kiểm tra có phải admin không
  const isAdmin = () => {
    return authIsAdmin(user);
  };

  // Kiểm tra có phải user thường không
  const isUser = () => {
    return authIsUser(user);
  };

  // Kiểm tra đã đăng nhập chưa
  const authenticated = () => {
    return isAuthenticated();
  };

  return {
    user,
    loading,
    hasRole,
    isAdmin,
    isUser,
    authenticated
  };
};
