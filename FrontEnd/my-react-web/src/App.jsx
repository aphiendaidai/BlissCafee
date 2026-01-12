import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './component/layout/header';
import Hero from './component/layout/hero';
import Menu from './component/menu';
import ClbEnglish from './component/clbtienganh';
import Music from './component/music';
import MapComponent from './component/map';
import FooterCompo from './component/layout/footer';
import Menu2 from './component/menu2';
import AddMenu from './component/menu/admin/addmenu';
import DetailMenu from './component/menu/detailmenu';
import Introduce from './component/header/introduct';
import LikeButton from './component/header/LikeButton';
import Poimenu from './component/menu/poimenu';
import Register from './component/login/regiter';
import Login from './component/login/login';
import Account from './component/account/acccount';
import ProtectedRoute from './components/ProtectedRoute';
import EditMenu from './component/menu/admin/editmenu';
import ListMenu from './component/menu/admin/listmenu';
import Cart from './component/account/cart';
import AdminCart from './component/menu/admin/admincart';
import OAuth2RedirectHandler from './component/login/OAuth2RedirectHandler ';
function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,     // hiệu ứng kéo dài 1s
      once: false,         // chỉ chạy hiệu ứng 1 lần khi xuất hiện
      easing: 'ease-in-out', // hiệu ứng mượt mà
        offset: 200, // Cách viewport 200px mới chạy animation

    });
  }, []);

  return (
    <>
      <BrowserRouter>
        {/* <LikeButton />  👍 Nút Like hiển thị trên mọi trang */}

        <Header />
    
  <Routes>
          <Route
            path="/"
            element={
              <>
                <div data-aos="fade-down">
                  <Hero />
                </div>

                <div data-aos="fade-right" data-aos-delay="200">
                  <Menu />
                </div>
                <div data-aos="fade-left" data-aos-delay="300">
                  <Menu2 />
                </div>

                <div data-aos="fade-left" data-aos-delay="500">
                  <ClbEnglish />
                </div>

                <div data-aos="fade-right" data-aos-delay="800">
                  <Music />
                </div>

                <div data-aos="zoom-in" data-aos-delay="500">
                  <MapComponent />
                </div>
                 {/* <div data-aos="zoom-out" data-aos-delay="400"> */}
                  <FooterCompo />
                {/* </div> */}


              </>
            }
          />
          <Route path="/detail/:id" element={<DetailMenu />} />
          {/* Trang cần đăng nhập */}
          <Route 
            path="/menu" 
            element={
              <ProtectedRoute requireAuth={true}>
                <AddMenu />
              </ProtectedRoute>
            } 
          />
          
          {/* Trang chỉ dành cho Admin */}
          <Route 
            path="/poimenu" 
            element={
              // <ProtectedRoute requiredRole="ADMIN">
                <Poimenu />
              // </ProtectedRoute>
            } 
          />
          
          {/* Trang tài khoản - cần đăng nhập */}
          <Route 
            path="/account" 
            element={
              <ProtectedRoute requireAuth={true}>
                <Account />
              </ProtectedRoute>
            } 
          />
          
          <Route path="/about" element={<Introduce />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/editmenu/:id" 
            element={
              <ProtectedRoute requireAuth={true}>
                <EditMenu />
              </ProtectedRoute>
            }
          />
             <Route path="/listmenu" element={<ListMenu />} />
          <Route 
            path="/cart" 
            element={
              <ProtectedRoute requireAuth={true}>
                <Cart />
              </ProtectedRoute>
            }
          />

                       <Route path="/admincart" element={<AdminCart />} />
  <Route path="/auth/oauth2/redirect" element={<OAuth2RedirectHandler />} />



        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
