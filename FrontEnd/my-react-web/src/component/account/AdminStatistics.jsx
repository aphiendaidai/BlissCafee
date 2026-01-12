import React, { useState, useEffect } from 'react';
import { getMenuCount, getFoodCount, getDrinkCount, getOrdersCount, getOrdersByStatus, getallUsers } from "../../service/web_demo";
import '../../assets/css/AdminStatistics.css';

const AdminStatistics = () => {
  const [stats, setStats] = useState({
    totalMenu: 0,
    foodCount: 0,
    drinkCount: 0,
    totalOrders: 0,
    totalUsers: 0
  });
  const [orderStats, setOrderStats] = useState({});
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [total, food, drink, orders, ordersByStatus, usersResponse] = await Promise.all([
        getMenuCount(),
        getFoodCount(), 
        getDrinkCount(),
        getOrdersCount(),
        getOrdersByStatus(),
        getallUsers()
      ]);
      
      setStats({
        totalMenu: total,
        foodCount: food,
        drinkCount: drink,
        totalOrders: orders,
        totalUsers: usersResponse.data.length
      });
      
      setOrderStats(ordersByStatus);
      setUsers(usersResponse.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ xử lý';
      case 'SHIPPING': return 'Đang giao';
      case 'COMPLETED': return 'Hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusClass = (status) => {
    return status.toLowerCase();
  };



  const getRoleDisplay = (roles) => {
    if (!roles || roles.length === 0) return 'User';
    return roles.map(role => role.roleName || role.name || role).join(', ');
  };

  const getRoleClass = (roles) => {
    if (!roles || roles.length === 0) return 'user';
    const hasAdmin = roles.some(role => 
      (role.roleName || role.name || role).toLowerCase().includes('admin')
    );
    return hasAdmin ? 'admin' : 'user';
  };

  if (loading) {
    return <div className="loading">Đang tải thống kê...</div>;
  }

  return (
    <div className="admin-statistics">
      <h3>📊 Thống kê hệ thống</h3>
      
      {/* Statistics Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-label">Tổng món</div>
          <div className="stat-value menu">{stats.totalMenu}</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍕</div>
          <div className="stat-label">Đồ ăn</div>
          <div className="stat-value food">{stats.foodCount}</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🥤</div>
          <div className="stat-label">Đồ uống</div>
          <div className="stat-value drink">{stats.drinkCount}</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-label">Đơn hàng</div>
          <div className="stat-value orders">{stats.totalOrders}</div>
        </div>

        <div 
          className="stat-card clickable" 
          onClick={() => setShowUsers(!showUsers)}
        >
          <div className="stat-icon">👥</div>
          <div className="stat-label">Người dùng</div>
          <div className="stat-value users">{stats.totalUsers}</div>
          <div className="stat-action">
            {showUsers ? 'Ẩn danh sách' : 'Xem danh sách'}
          </div>
        </div>
      </div>

      {/* Order Status Statistics */}
      {Object.keys(orderStats).length > 0 && (
        <div className="order-status-section">
          <h4 className="order-status-title">📈 Đơn hàng theo trạng thái</h4>
          <div className="order-status-grid">
            {Object.entries(orderStats).map(([status, count]) => (
              <div key={status} className={`order-status-item ${getStatusClass(status)}`}>
                <div className="order-status-label">
                  {getStatusText(status)}
                </div>
                <div className={`order-status-count ${getStatusClass(status)}`}>
                  {count}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Users List */}
      {showUsers && (
        <div className="users-section">
          <div className="users-header">
            <h4 className="users-title">👥 Danh sách người dùng ({users.length})</h4>
            <button 
              className="close-button"
              onClick={() => setShowUsers(false)}
            >
              Ẩn
            </button>
          </div>
          
          {users.length === 0 ? (
            <div className="users-empty">Không có người dùng nào</div>
          ) : (
            <div className="users-table-container">
              <table className="users-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index}>
                      <td>{user.id}</td>
                      <td className="user-username">{user.username}</td>
                      <td>{user.email}</td>
           
                      <td>
                        <span className={`role-badge ${getRoleClass(user.roles)}`}>
                          {getRoleDisplay(user.roles)}
                        </span>
                      </td>
     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminStatistics;