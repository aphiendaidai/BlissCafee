import React from "react";
import "../../assets/css/footer.css"; // Đảm bảo bạn tạo file này

function FooterCompo() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-column">
          <h4>Về chúng tôi</h4>
          <p>Bliss Coffee là nơi lý tưởng để thưởng thức cà phê, làm việc, và trò chuyện cùng bạn bè.</p>
        </div>

        <div className="footer-column">
          <h4>Liên hệ</h4>
          <p>📍 Số 19 Trà Khê 5, Đà Nẵng</p>
          <p>📞 038 239 9650</p>
          <p>✉️ cafeblissdanang@gmail.com</p>
        </div>

        <div className="footer-column">
          <h4>Theo dõi chúng tôi</h4>
          <a href="https://www.facebook.com/cafeblissdanang" target="_blank" rel="noopener noreferrer">           
          <p>🌐 Facebook</p>
           </a>
          <p>🕒 Mở cửa: 7h - 20h (T2 - T7)</p>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Bliss Coffee. All rights reserved.
      </div>
    </footer>
  );
}

export default FooterCompo;
