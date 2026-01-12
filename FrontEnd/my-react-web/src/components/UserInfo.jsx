import React from 'react';
import { useAuth } from '../hooks/useAuth';

const UserInfo = () => {
  const { user, isAdmin, isUser, hasRole } = useAuth();

  // Helper function để lấy tên role chính
  const getRoleDisplayName = () => {
    if (!user || !user.roles) return 'User';
    
    console.log('UserInfo - User roles:', user.roles);
    
    if (Array.isArray(user.roles)) {
      // Tìm role admin trước
      const adminRole = user.roles.find(r => {
        if (typeof r === 'object' && r.name) {
          return r.name === 'ADMIN';
        }
        return r === 'ADMIN';
      });
      if (adminRole) return 'Admin';
      
      // Nếu không có admin, trả về role đầu tiên
      const firstRole = user.roles[0];
      if (firstRole) {
        if (typeof firstRole === 'object' && firstRole.name) {
          return firstRole.name.replace('ROLE_', '');
        }
        if (typeof firstRole === 'string') {
          return firstRole.replace('ROLE_', '');
        }
      }
    }
    
    return 'User';
  };

  if (!user) {
    return <div>Đang tải thông tin...</div>;
  }

  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderRadius: '8px',
      marginBottom: '20px'
    }}>
      <h3>Thông tin tài khoản</h3>
      <p><strong>Tên:</strong> {user.fullName || user.username}</p>
             <p><strong>Email:</strong> {user.email || <span style={{color: '#dc3545', fontStyle: 'italic'}}>Chưa có email</span>}</p>
      <p><strong>Vai trò:</strong> 
        <span style={{ 
          color: isAdmin() ? '#dc3545' : '#28a745',
          fontWeight: 'bold',
          marginLeft: '5px'
        }}>
                     {getRoleDisplayName()}
        </span>
      </p>
      
      {isAdmin() && (
        <div style={{ 
          backgroundColor: '#fff3cd', 
          border: '1px solid #ffeaa7',
          borderRadius: '4px',
          padding: '10px',
          marginTop: '10px'
        }}>
          <p style={{ margin: 0, color: '#856404' }}>
            <strong>Quyền Admin:</strong> Bạn có thể thêm sản phẩm và quản lý tài khoản
          </p>
        </div>
      )}
      
      {isUser() && (
        <div style={{ 
          backgroundColor: '#d1ecf1', 
          border: '1px solid #bee5eb',
          borderRadius: '4px',
          padding: '10px',
          marginTop: '10px'
        }}>
          <p style={{ margin: 0, color: '#0c5460' }}>
            <strong>Quyền User:</strong> Bạn có thể xem menu và đặt hàng
          </p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
