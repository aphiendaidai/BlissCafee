import React from "react";
import "../../assets/css/introduc.css"; // Nhớ tạo file CSS riêng
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function Introduce() {
  return (
    <div className="introduce-container">
      <h1 className="title">Giới thiệu</h1>


      <div className="location-map">
        <MapContainer
          center={[15.977011318080873, 108.25896918529976]}
          zoom={15}
          scrollWheelZoom={false}
          className="custom-map"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          <Marker position={[15.977011318080873, 108.25896918529976]}>
            <Popup>
              Đây là vị trí của <strong>Bliss Coffee</strong>.
            </Popup>
          </Marker>
        </MapContainer>
           <p><strong>Địa chỉ:</strong> Số 19 đường Trà Khê 5, Hoà Hải, Ngũ Hành Sơn, Đà Nẵng, Vietnam</p>

      </div>



      <p className="description">
        Menu đa dạng các món thức uống, từ cafe, sinh tố đến các loại nước khác
        với giá chỉ từ <strong>20.000 VND</strong> đến <strong>38.000 VND</strong>, trong không gian yên tĩnh,
        phù hợp để làm việc và tán gẫu với bạn bè.
      </p>

      <div className="info-section">
        <p><strong>Trang:</strong> Quán cà phê</p>
        <p><strong>Số điện thoại:</strong> 038 239 9650</p>
        <p><strong>Email:</strong> cafeblissdanang@gmail.com</p>
        <p><strong>Trạng thái:</strong> Đang mở cửa</p>
        <p><strong>Dịch vụ:</strong> Nhận hàng ngay bên ngoài</p>
        <p><strong>Đánh giá:</strong> Chưa xếp hạng (3 lượt đánh giá)</p>
      </div>

      <div className="hours-section">
        <h2>Giờ hoạt động</h2>
        <ul>
          <li>Thứ Hai - Thứ Bảy: 07:00 - 20:00</li>
          <li>Chủ Nhật: <strong>ĐÓNG CỬA</strong></li>
        </ul>
        <p className="updated">Cập nhật khoảng 7 tháng trước</p>
      </div>
    </div>
  );
}

export default Introduce;
