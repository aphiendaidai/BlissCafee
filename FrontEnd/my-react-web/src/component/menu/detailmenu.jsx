import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIDItem, createOrder } from "../../service/web_demo";
import "../../assets/css/detailmenu.css";

function DetailMenu() {
  const [item, setItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    getIDItem(id)
      .then((response) => setItem(response.data))
      .catch((error) => console.error("Error:", error));
  }, [id]);

  const sizeOptions = [
    { label: "Nhỏ", value: "small", extra: 0 },
    { label: "Vừa", value: "medium", extra: 10000 },
    { label: "Lớn", value: "large", extra: 16000 },
  ];

  const handleSizeChange = (value) => setSelectedSize(value);

  // Tính tổng tiền ở frontend
  const calculateTotal = () => {
    if (!item) return 0;
    const sizeExtra = sizeOptions.find(s => s.value === selectedSize)?.extra || 0;
    return (item.price + sizeExtra) * quantity;
  };

  const handleOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("Bạn cần đăng nhập trước khi đặt hàng!");
      return;
    }

    if (!phone || !address) {
      alert("Vui lòng nhập đầy đủ số điện thoại và địa chỉ giao hàng!");
      return;
    }

    const orderData = {
      userId: user.id,
      shippingAddress: address,
      phoneNumber: phone,
      items: [
        {
          menuItemId: item.id,
          quantity: quantity,
          size: selectedSize,
        },
      ],
    };

    setIsOrdering(true);

    try {
      const res = await createOrder(orderData);
      console.log('Response data:', res.data); // Debug
      
      // Tính tổng tiền ở frontend vì backend có thể chưa trả về
      const totalPrice = calculateTotal();
      
      alert(`Đặt hàng thành công! 🎉\nTổng tiền: ${totalPrice.toLocaleString("vi-VN")} đ`);
      
      setShowOrderForm(false);
      setPhone("");
      setAddress("");
      setQuantity(1);
    } catch (err) {
      console.error("Lỗi đặt hàng:", err);
      alert("Có lỗi xảy ra khi đặt hàng! Vui lòng thử lại.");
    } finally {
      setIsOrdering(false);
    }
  };

  if (!item) return <div className="loading">Đang tải dữ liệu...</div>;

  return (
    <div className="detail-page-container">
      <div className="detail-top-section">
        <div className="image-wrapper">
          <img src={item.imageUrl} alt={item.name} className="detail-image" />
          {item.isBestSeller && (
            <span className="best-seller-badge">
              BEST <br /> SELLER
            </span>
          )}
        </div>

        <div className="info-block">
          <h2 className="item-title">{item.name}</h2>
          <h3 className="item-price">
            {item.price.toLocaleString("vi-VN")} đ
          </h3>

          <div className="size-section">
            <p className="size-label">🥤 Chọn size:</p>
            <div className="size-options">
              {sizeOptions.map((opt) => (
                <button
                  key={opt.value}
                  className={`size-btn ${
                    selectedSize === opt.value ? "selected" : ""
                  }`}
                  onClick={() => handleSizeChange(opt.value)}
                >
                  <span className="size-label">{opt.label}</span>
                  {opt.extra > 0 && (
                    <span className="size-extra">+{opt.extra.toLocaleString("vi-VN")}đ</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {!showOrderForm ? (
            <div className="action-section">
              <div className="price-display">
                <span className="current-price">
                  {calculateTotal().toLocaleString("vi-VN")} đ
                </span>
                <span className="price-note">
                  (Size {sizeOptions.find(s => s.value === selectedSize)?.label})
                </span>
              </div>
              <button
                className="order-btn modern-btn"
                onClick={() => setShowOrderForm(true)}
              >
                <span className="btn-icon">🚚</span>
                <span className="btn-text">Đặt giao tận nơi</span>
                <span className="btn-arrow">→</span>
              </button>
            </div>
          ) : (
            <div className="order-form modern-form">
              <div className="form-header">
                <h3>📦 Thông tin đặt hàng</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowOrderForm(false)}
                >
                  ✕
                </button>
              </div>

              <div className="form-content">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">🔢</span>
                      Số lượng
                    </label>
                    <div className="quantity-control">
                      <button 
                        className="qty-btn"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        −
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                        className="qty-input"
                      />
                      <button 
                        className="qty-btn"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-icon">💰</span>
                      Tổng tiền
                    </label>
                    <div className="total-price">
                      {calculateTotal().toLocaleString("vi-VN")} đ
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📱</span>
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    placeholder="Nhập số điện thoại của bạn"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-icon">📍</span>
                    Địa chỉ giao hàng
                  </label>
                  <textarea
                    placeholder="Nhập địa chỉ chi tiết (số nhà, tên đường, quận/huyện...)"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-textarea"
                    rows="3"
                  />
                </div>

                <div className="order-summary">
                  <div className="summary-item">
                    <span>Món:</span>
                    <span>{item.name} ({sizeOptions.find(s => s.value === selectedSize)?.label})</span>
                  </div>
                  <div className="summary-item">
                    <span>Số lượng:</span>
                    <span>{quantity}</span>
                  </div>
                  <div className="summary-item total">
                    <span>Tổng cộng:</span>
                    <span>{calculateTotal().toLocaleString("vi-VN")} đ</span>
                  </div>
                </div>

                <div className="form-actions">
                  <button 
                    onClick={handleOrder} 
                    disabled={isOrdering || !phone.trim() || !address.trim()}
                    className="confirm-btn modern-btn primary"
                  >
                    {isOrdering ? (
                      <>  
                        <span className="spinner"></span>
                        Đang xử lý...
                      </>
                    ) : (
                      <>
                        <span className="btn-icon">✅</span>
                        Xác nhận đặt hàng
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setShowOrderForm(false)}
                    className="cancel-btn modern-btn secondary"
                    disabled={isOrdering}
                  >
                    <span className="btn-icon">↩</span>
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailMenu;