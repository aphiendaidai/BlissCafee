import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../assets/css/admincart.css";
import { getAllOrders, updateOrderStatus, } from "../../../service/web_demo";

const AdminCart = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const navigate = useNavigate();

  // Fetch all orders khi component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAllOrders();

       const sortedOrders = (response.data || []).sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );

      setOrders(sortedOrders);
      setError("");
    } catch (err) {
      console.error("Lỗi khi lấy orders:", err);
      setError("Không thể tải danh sách đơn hàng");
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật status order
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);
      
      // Cập nhật state local
      setOrders(orders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus, completedDate: newStatus === 'COMPLETED' ? new Date().toISOString() : order.completedDate }
          : order
      ));
      
      alert("Cập nhật trạng thái thành công!");
    } catch (err) {
      console.error("Lỗi khi cập nhật status:", err);
      alert("Không thể cập nhật trạng thái");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Lọc orders theo status
  const filteredOrders = orders.filter(order => 
    selectedStatus === "ALL" || order.status === selectedStatus
  );

  // Tính tổng tiền của order
  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "Chưa có";
    return new Date(dateString).toLocaleString('vi-VN');
  };

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING': return 'badge-pending';
      case 'SHIPPING': return 'badge-shipping';
      case 'COMPLETED': return 'badge-completed';
      case 'CANCELLED': return 'badge-cancelled';
      default: return 'badge-default';
    }
  };

  // Get status display text
  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING': return 'Chờ xử lý';
      case 'SHIPPING': return 'Đang giao';
      case 'COMPLETED': return 'Hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="admin-cart-container">
        <div className="loading">Đang tải danh sách đơn hàng...</div>
      </div>
    );
  }

  return (
    <div className="admin-cart-container">
      <div className="admin-cart-header">
        <h2>Quản lý đơn hàng</h2>
        <button className="refresh-btn" onClick={fetchOrders}>
          Làm mới
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Filter by status */}
      <div className="filter-section">
        <label>Lọc theo trạng thái:</label>
        <select 
          value={selectedStatus} 
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="status-filter"
        >
          <option value="ALL">Tất cả</option>
          <option value="PENDING">Chờ xử lý</option>
          <option value="SHIPPING">Đang giao</option>
          <option value="COMPLETED">Hoàn thành</option>
          <option value="CANCELLED">Đã hủy</option>
        </select>
        <span className="order-count">({filteredOrders.length} đơn hàng)</span>
      </div>

      {/* Orders list */}
      <div className="orders-list">
        {filteredOrders.length === 0 ? (
          <div className="no-orders">Không có đơn hàng nào</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.orderId} className="order-card">
              {/* Order header */}
              <div className="order-header">
                <div className="order-info">
                  <h3>Đơn hàng #{order.orderId}</h3>
                  <p className="customer-info">
                    <strong>Khách hàng:</strong> {order.username} (ID: {order.userId})
                  </p>
                  <p className="order-date">
                    <strong>Ngày đặt:</strong> {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              {/* Shipping info */}
              <div className="shipping-info">
                <p><strong>Địa chỉ giao hàng:</strong> {order.shippingAddress}</p>
                <p><strong>Số điện thoại:</strong> {order.phoneNumber}</p>
                {order.completedDate && (
                  <p><strong>Ngày hoàn thành:</strong> {formatDate(order.completedDate)}</p>
                )}
              </div>

              {/* Order items */}
              <div className="order-items">
                <h4>Chi tiết đơn hàng:</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img 
                      src={item.imageUrl} 
                      alt={item.menuItemName}
                      className="item-image"
                    />
                    <div className="item-details">
                      <h5>{item.menuItemName}</h5>
                      <p className="item-description">{item.menuItemDescription}</p>
                      <p className="item-category">
                        <span className="category">{item.category}</span>
                        <span className="type">{item.type}</span>
                      </p>
                    </div>
                    <div className="item-quantity">
                      Số lượng: {item.quantity}
                    </div>
                    <div className="item-price">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order total */}
           <div className="order-total">
  <strong>
    Tổng cộng: {formatCurrency(
      order.items.reduce((total, item) => total + item.price, 0)
    )}
  </strong>
</div>

              {/* Action buttons */}
              <div className="order-actions">
                {order.status === 'PENDING' && (
                  <div className="action-buttons">
                    <button
                      className="btn-confirm"
                      onClick={() => handleStatusUpdate(order.orderId, 'SHIPPING')}
                      disabled={updatingOrderId === order.orderId}
                    >
                      {updatingOrderId === order.orderId ? 'Đang xử lý...' : 'Xác nhận đơn hàng'}
                    </button>
                    <button
                      className="btn-cancel"
                      onClick={() => handleStatusUpdate(order.orderId, 'CANCELLED')}
                      disabled={updatingOrderId === order.orderId}
                    >
                      Hủy đơn hàng
                    </button>
                  </div>
                )}
                
                {order.status === 'SHIPPING' && (
                  <button
                    className="btn-complete"
                    onClick={() => handleStatusUpdate(order.orderId, 'COMPLETED')}
                    disabled={updatingOrderId === order.orderId}
                  >
                    {updatingOrderId === order.orderId ? 'Đang xử lý...' : 'Hoàn thành giao hàng'}
                  </button>
                )}
                
                {(order.status === 'COMPLETED' || order.status === 'CANCELLED') && (
                  <div className="status-final">
                    Đơn hàng đã {order.status === 'COMPLETED' ? 'hoàn thành' : 'bị hủy'}
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminCart;