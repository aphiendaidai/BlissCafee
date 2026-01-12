import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../assets/css/Menu.css'; // Assuming you have a CSS file for styling the menu component
// import menuItems from './menudata';
import React, {useState, useEffect} from "react";
import { getMenuFood } from '../service/web_demo';
import { useNavigate } from 'react-router-dom';

const Menu2 = () => {
  const [menuItems, setMenuItems] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getMenuFood().then(response => {
      setMenuItems(response.data);
    }).catch(error => console.error('Error fetching menu items:', error));
  }, []);


  return (
  <div className="menu-wrapper">
    <p className="menu-description">Các loại đồ ăn của chúng tôi</p>

    {menuItems.length > 0 ? (
      <Swiper
        dir="rtl"
        key={menuItems.length} // ép Swiper khởi tạo lại khi có data
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={4}
        navigation
        loop={true}
        autoplay={{ delay: 3000 }}
      >
        {menuItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="menu-item" onClick={() => navigator(`/detail/${item.id}`)}>
              <img src={item.imageUrl} alt={item.name} />
              <div className="menu-item-text">
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <p>Đang tải dữ liệu...</p>
    )}
  </div>
);

};

export default Menu2;
