import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../assets/css/music.css';

const Music = () => {
  return (
    <div className="music-section">
      <div className="music-container">
        {/* Left: Swiper (ảnh) */}
        <div className="music-slider">
          <Swiper
            spaceBetween={30}
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            loop={true}
            autoplay={{ delay: 2000 }}
          > 
            <SwiperSlide><img src="/imgate/hat1.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgate/hat2.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgate/hat3.jpg" alt="" /></SwiperSlide>
            <SwiperSlide><img src="/imgate/hat4.jpg" alt="" /></SwiperSlide>
          </Swiper>
        </div>  

        {/* Right: Nội dung */}
        <div className="music-content">
          <h2>🎶 Giao lưu văn hóa – nghệ thuật</h2>
          <p>
            Tham gia các buổi giao lưu văn nghệ cùng bạn bè Hàn Quốc ngay tại quán!  
            Tận hưởng không gian âm nhạc ấm cúng, được chuẩn bị chỉn chu, kèm đồ ăn, thức uống miễn phí cho người tham dự.
          </p>
          <p>
            Đây là cơ hội tuyệt vời để bạn làm quen, kết nối, nâng cao kỹ năng tiếng Anh, tiếng Hàn, cũng như hiểu hơn về văn hóa các quốc gia.
          </p>
          <p>📅 Diễn ra định kỳ vào những dịp lễ.</p>
        </div>
      </div>
    </div>
  );
};

export default Music;
