import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../assets/css/map.css'; // Assuming you have a CSS file for custom styles

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Cần fix biểu tượng marker mặc định
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const MapComponent = () => {
  return (
      <div className="location-section">
      {/* Left: Map */}
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
      </div>

      {/* Right: Text */}
      <div className="location-description">
        <h2>Vị trí thuận lợi</h2>
        <p>
          Bliss Coffee nằm ngay <strong>khu đô thị FPT Đà Nẵng</strong> — một trong những khu vực phát triển nhanh nhất thành phố.
        </p>
        <p>
          Gần các trường đại học lớn như <strong>Đại học FPT</strong>, <strong>Đại học Công nghệ thông tin và truyền thông Việt-Hàn</strong>, và <strong>Đại học Đông Á</strong>.
        </p>
        <p>
          Không gian yên tĩnh, giao thông thuận tiện, lý tưởng để học tập, làm việc nhóm hoặc thư giãn.
        </p>
      </div>
    </div>
  );
};

export default MapComponent;
