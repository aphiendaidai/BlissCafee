import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, requiredRole = null, requireAuth = true }) => {
  const { user, loading, hasRole, authenticated } = useAuth();

  // Đang loading
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <p>Đang kiểm tra quyền truy cập...</p>
      </div>
    );
  }

  // Kiểm tra đăng nhập
  if (requireAuth && !authenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra role cụ thể nếu có yêu cầu
  if (requiredRole && !hasRole(requiredRole)) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        padding: '20px'
      }}>
        <h2>Không có quyền truy cập</h2>
        <p>Bạn cần quyền {requiredRole} để truy cập trang này.</p>
        <p>Vai trò hiện tại: {user?.roles?.map(r => typeof r === 'object' ? r.name : r).join(', ') || 'Không có'}</p>
        <button 
          onClick={() => window.history.back()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Quay lại
        </button>
      </div>
    );
  }

  // Có quyền - render children
  return children;
};

export default ProtectedRoute;
