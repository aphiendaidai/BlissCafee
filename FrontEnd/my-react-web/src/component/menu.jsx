import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../assets/css/Menu.css'; // Assuming you have a CSS file for styling the menu component
// import menuItems from './menudata';
import React, {useState, useEffect} from "react";
import { getMenuDrink } from '../service/web_demo';
import { useNavigate } from 'react-router-dom';


const Menu = () => {

  const [menuItems, setMenuItems] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    getMenuDrink().then(response => {
      console.log('Menu items response:', response.data);
      setMenuItems(response.data);
    }).catch(error => console.error('Error fetching menu items:', error));
  }, []);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    const itemId = item.id || item._id || item.menuId;
    if (itemId) {
      navigator(`/detail/${itemId}`);
    } else {
      console.error('Item ID not found:', item);
      alert('Không thể mở chi tiết sản phẩm. Vui lòng thử lại.');
    }
  };


  return (

<div className="menu-wrapper">
      <h2 className="menu-title">Menu</h2>
        <p className="menu-description">Các loại thức uống của chúng tôi </p>

   {menuItems.length > 0 ? (
      <Swiper
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

      <div className="menu-item" onClick={() => handleItemClick(item)}>
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

export default Menu;
