import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { saveAuthData, getUserFromToken } from '../../service/auth'; // Import auth functions

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get('token');
    const error = searchParams.get('error');

    if (token) {
      try {
        // Lấy thông tin user từ JWT token (giống như trong Login component)
        let userData = getUserFromToken(token);
        
        if (!userData) {
          // Nếu không decode được token, tạo userData mặc định
          userData = {
            username: 'Google User',
            fullName: 'Google User', 
            email: '',
            roles: ['USER']
          };
        }

        // Lưu token và user data (sử dụng cùng function như Login)
        saveAuthData(token, userData);
        
        console.log("Google login successful:", { token, userData });
        
        // Dispatch custom event để cập nhật UI (giống như Login)
        window.dispatchEvent(new CustomEvent('userLogin', { detail: userData }));
        
        // Redirect về trang chủ
        navigate('/', { replace: true });
      } catch (err) {
        console.error('Error processing Google login:', err);
        navigate('/login?error=oauth2_failed', { replace: true });
      }
    } else if (error) {
      console.error('OAuth2 login failed:', error);
      navigate('/login?error=oauth2_failed', { replace: true });
    } else {
      // Không có token và không có error, redirect về login
      navigate('/login', { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      <div className="spinner"></div>
      <p style={{ color: '#666', fontSize: '16px' }}>Đang xử lý đăng nhập Google...</p>
      
      <style jsx>{`
        .spinner {
          border: 4px solid #f3f3f3;
          border-top: 4px solid #4285f4;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default OAuth2RedirectHandler;