import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../../service/web_demo';
import { saveAuthData, getUserFromToken } from '../../service/auth';
import '../../assets/css/login.css';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Kiểm tra lỗi OAuth2 từ URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const oauthError = urlParams.get('error');
    
    if (oauthError === 'oauth2_failed') {
      setError('Đăng nhập Google thất bại. Vui lòng thử lại!');
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginUser(formData);
      console.log("RESPONSE:", res.data);
     
      // Lấy token từ response
      const token = res.data.accessToken;
     
      if (!token) {
        throw new Error('Không nhận được token từ server');
      }

      // Lấy thông tin user từ JWT token
      let userData = getUserFromToken(token);
     
      if (!userData) {
        userData = {
          username: res.data.username || formData.username,
          fullName: res.data.fullName || res.data.username || formData.username,
          email: res.data.email,
          roles: res.data.roles || res.data.role || ['USER']
        };
      }

      // Lưu token và user data
      saveAuthData(token, userData);
      console.log("Đã lưu thông tin đăng nhập:", { token, userData });

      // Dispatch custom event để thông báo đăng nhập thành công
      window.dispatchEvent(new CustomEvent('userLogin', { detail: userData }));
      alert("Đăng nhập thành công!");
     
      // Chuyển hướng về trang chủ
      navigate('/');
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);
     
      if (err.response) {
        // Lỗi từ server
        const status = err.response.status;
        if (status === 401) {
          setError("Sai tên đăng nhập hoặc mật khẩu!");
        } else if (status === 403) {
          setError("Tài khoản bị khóa hoặc không có quyền truy cập!");
        } else {
          setError("Lỗi server: " + (err.response.data?.message || 'Vui lòng thử lại sau'));
        }
      } else if (err.request) {
        // Lỗi kết nối
        setError("Không thể kết nối đến server. Vui lòng kiểm tra kết nối mạng!");
      } else {
        // Lỗi khác
        setError(err.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle Google Login
  const handleGoogleLogin = () => {
    setError(''); // Clear any existing errors
    // Redirect to Spring Boot OAuth2 endpoint
    window.location.href = 'http://localhost:8080/oauth2/authorize/google';
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Đăng nhập</h2>

      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Tên đăng nhập"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
          disabled={loading}
        />
       
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password"
          disabled={loading}
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      {/* ✅ Thêm divider và Google login button */}
      <div className="divider">
        <span>hoặc</span>
      </div>

      <motion.button
        className="google-login-btn"
        onClick={handleGoogleLogin}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
      >
        <svg className="google-icon" width="20" height="20" viewBox="0 0 24 24">
          <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {loading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
      </motion.button>

      {/* ✅ Thêm link đăng ký */}
      <p className="auth-link">
        Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
      </p>
    </motion.div>
  );
};

export default Login;