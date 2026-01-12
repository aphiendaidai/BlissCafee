import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/cart.css";
import { getOrdersByUser, updateUserOrderStatus } from "../../service/web_demo"; // Thêm cancelUserOrder

const Cart = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cancellingOrderId, setCancellingOrderId] = useState(null); // State cho loading cancel
    const navigate = useNavigate();
    
    useEffect(() => {
        const userId = localStorage.getItem("user");
        if (!userId) {
            navigate("/login");
            return;
        }
        fetchOrders(userId);
    }, [navigate]);

    const fetchOrders = async (userId) => {
        try {
            setLoading(true);
            const response = await getOrdersByUser(userId);
             const sortedOrders = (response.data || []).sort(
      (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
    );
            setOrders(sortedOrders);
            setError(null);
        } catch (error) {
            console.error("Error fetching orders:", error);
            setError("Không thể tải danh sách đơn hàng. Vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };

    // Hàm hủy đơn hàng
    const handleCancelOrder = async (orderId) => {
        if (!window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này?")) {
            return;
        }

        try {
            setCancellingOrderId(orderId);
            await updateUserOrderStatus(orderId);
            
            // Cập nhật state local thay vì fetch lại toàn bộ
            setOrders(prevOrders => 
                prevOrders.map(order => 
                    order.orderId === orderId 
                        ? { ...order, status: 'CANCELLED' }
                        : order
                )
            );
            
            // Hiển thị thông báo thành công
            alert("Hủy đơn hàng thành công!");
            
        } catch (error) {
            console.error("Error cancelling order:", error);
            alert(error.response?.data || "Không thể hủy đơn hàng. Vui lòng thử lại!");
        } finally {
            setCancellingOrderId(null);
        }
    };

    // Kiểm tra đơn hàng có thể hủy không
    const canCancelOrder = (status) => {
        const cancelableStatuses = ['PENDING', 'pending'];
        return cancelableStatuses.includes(status);
    };

    const getStatusColor = (status) => {
        switch (status?.toUpperCase()) {
            case 'PENDING': return '#ff9800';
            case 'SHIPPING': return '#2196f3';
            case 'COMPLETED': return '#4caf50';
            case 'CANCELLED': return '#f44336';
            default: return '#757575';
        }
    };

    const getStatusText = (status) => {
        const statusMap = {
            'PENDING': 'Đang chờ xử lý',
            'SHIPPING': 'Đang giao',
            'COMPLETED': 'Đã hoàn thành',
            'CANCELLED': 'Đã hủy'
        };
        return statusMap[status?.toUpperCase()] || status;
    };

    const formatDate = (dateString) => {
        try {
            return new Date(dateString).toLocaleString('vi-VN', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            });
        } catch {
            return dateString;
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND'
        }).format(price);
    };

    const calculateTotalPrice = (items) => {
        if (!items || items.length === 0) return 0;
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    if (loading) {
        return (
            <div className="cart-container">
                <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Đang tải đơn hàng...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cart-container">
                <div className="error-message">
                    <i className="fas fa-exclamation-triangle"></i>
                    <h3>Có lỗi xảy ra</h3>
                    <p>{error}</p>
                    <button 
                        className="retry-btn"
                        onClick={() => fetchOrders(localStorage.getItem("user"))}
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }
    
    return (
        <div className="cart-container">
            <div className="cart-header">
                <h1><i className="fas fa-shopping-cart"></i> Đơn hàng của tôi</h1>
                <p className="order-count">
                    {orders.length > 0 ? `Tổng cộng: ${orders.length} đơn hàng` : ''}
                </p>
            </div>

            {orders.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon"><i className="fas fa-shopping-cart"></i></div>
                    <h2>Chưa có đơn hàng nào</h2>
                    <p>Bạn chưa có đơn hàng nào. Hãy đặt món ngay!</p>
                    <button className="shop-now-btn" onClick={() => navigate("/poimenu")}>
                        <i className="fas fa-utensils"></i> Đặt món ngay
                    </button>
                </div>
            ) : (
                <div className="orders-list">
                    {orders.map((order) => (
                        <div key={order.orderId} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Đơn hàng #{order.orderId}</h3>
                                    <span className="order-date">
                                        <i className="far fa-clock"></i> {formatDate(order.orderDate)}
                                    </span>
                                </div>
                                <div 
                                    className="order-status"
                                    style={{ backgroundColor: getStatusColor(order.status) }}
                                >
                                    {getStatusText(order.status)}
                                </div>
                            </div>

                            <div className="order-details">
                                <div className="shipping-info">
                                    <div className="info-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <span>{order.shippingAddress}</span>
                                    </div>
                                    <div className="info-item">
                                        <i className="fas fa-phone"></i>
                                        <span>{order.phoneNumber}</span>
                                    </div>
                                </div>

                                <div className="order-items">
                                    <h4>Chi tiết món ăn:</h4>
                                    <div className="items-list">
                                        {order.items?.map((item, index) => (
                                            <div key={index} className="item">
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.menuItemName} 
                                                    className="item-image"
                                                />
                                                <div className="item-info">
                                                    <span className="item-name">{item.menuItemName}</span>
                                                    <span className="item-category">
                                                        {item.category} - {item.type}
                                                    </span>
                                                    <p className="item-description">{item.menuItemDescription}</p>
                                                    <span className="item-quantity">x{item.quantity}</span>
                                                </div>
                                                <div className="item-price">
                                                    {formatPrice(item.price)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="order-total">
                                    <div className="total-row">
                                        <span className="total-label">Tổng cộng:</span>
                                        <span className="total-amount">
                                            {formatPrice(order.items.reduce((total, item) => total + item.price, 0))}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="order-actions">
                                <button className="btn-secondary">
                                    <i className="fas fa-eye"></i> Chi tiết
                                </button>
                                
                                {canCancelOrder(order.status) && (
                                    <button 
                                        className="btn-danger"
                                        onClick={() => handleCancelOrder(order.orderId)}
                                        disabled={cancellingOrderId === order.orderId}
                                    >
                                        {cancellingOrderId === order.orderId ? (
                                            <>
                                                <i className="fas fa-spinner fa-spin"></i> Đang hủy...
                                            </>
                                        ) : (
                                            <>
                                                <i className="fas fa-times"></i> Hủy đơn
                                            </>
                                        )}
                                    </button>
                                )}
                                
                                <button className="btn-primary">
                                    <i className="fas fa-redo"></i> Đặt lại
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Cart;