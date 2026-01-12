import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import '../../assets/css/Hero.css';

const Hero = () => {
  return (
    <div className="hero-wrapper">
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{ delay: 3000 }}
      > 
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="hero-slide">
            <a 
              href="https://www.facebook.com/cafeblissdanang" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/imgate/hinh1.jpg" alt="Slide 1" />
            </a>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="hero-slide">
            <a 
              href="https://www.facebook.com/cafeblissdanang" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/imgate/hinh2.jpg" alt="Slide 2" />
            </a>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="hero-slide">
            <a 
              href="https://www.facebook.com/cafeblissdanang" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/imgate/quan2.jpg" alt="Slide 3" />
            </a>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="hero-slide">
            <a 
              href="https://www.facebook.com/cafeblissdanang" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <img src="/imgate/quan3.jpg" alt="Slide 4" />
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Hero;
