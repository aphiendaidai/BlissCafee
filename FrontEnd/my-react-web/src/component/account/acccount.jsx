import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { clearAuthData } from '../../service/auth';
import UserInfo from '../../components/UserInfo';
import AdminStatistics from './AdminStatistics';
import '../../assets/css/account.css';

const Account = () => {
  const { user, isAdmin, isUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa thông tin đăng nhập
    clearAuthData();
    
    // Dispatch event để thông báo logout
    window.dispatchEvent(new CustomEvent('userLogout'));
    
    alert('Đăng xuất thành công!');
    navigate('/');
  };

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh' 
      }}>
        <p>Đang tải thông tin tài khoản...</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-content">
        <h1>Quản lý tài khoản</h1>
        
        {/* Thông tin user */}
        <UserInfo />
        
        {/* Các chức năng theo role */}
        <div className="account-actions">
          {isAdmin() && (
            <div className="admin-actions">
              <h3>Chức năng Admin</h3>
              <div className="action-buttons">
                <button 
                  onClick={() => navigate('/menu')}
                  className="action-btn admin-btn"
                >
                  Thêm sản phẩm
                </button>
                <button 
                  onClick={() => navigate('/listmenu')}
                  className="action-btn admin-btn"
                >
                  Chỉnh sửa sản phẩm
                </button>
       <button 
                  onClick={() => navigate('/admincart')}
                  className="action-btn admin-btn"
                >
                 Xem các đơn hàng
                </button>

                <button 
                  onClick={() => navigate('/poimenu')}
                  className="action-btn admin-btn"
                >
                  Quản lý menu
                </button>
              </div>
            </div>
          )}
                  {isAdmin() && <AdminStatistics />}

          {isUser() && (
            <div className="user-actions">
              <h3>Chức năng User</h3>
              <div className="action-buttons">
                <button 
                  onClick={() => navigate('/')}
                  className="action-btn user-btn"
                >
                  Xem menu
                </button>
                <button 
                  onClick={() => navigate('/cart')}
                  className="action-btn user-btn"
                >
                  Xem giỏ hàng
                </button>
              </div>
            </div>
          )}
          
          {/* Chức năng chung */}
          <div className="common-actions">
            <h3>Chức năng chung</h3>
            <div className="action-buttons">
              <button 
                onClick={() => navigate('/about')}
                className="action-btn common-btn"
              >
                Giới thiệu
              </button>
              <button 
                onClick={handleLogout}
                className="action-btn logout-btn"
              >
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;