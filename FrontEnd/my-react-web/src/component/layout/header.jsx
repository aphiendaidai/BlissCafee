import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import '../../assets/css/Header.css';
import { useAuth } from '../../hooks/useAuth';
import { clearAuthData } from '../../service/auth';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const { user, isAdmin, authenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Hàm xử lý logout
  const handleLogout = () => {
    try {
      // Xóa dữ liệu localStorage
      clearAuthData();
      
      // Dispatch event để thông báo logout
      window.dispatchEvent(new CustomEvent('userLogout'));
      
      setIsLoggedIn(false);
      setExpanded(false);
      
      alert('Đăng xuất thành công!');
      navigate('/');
    } catch (error) {
      console.error("Lỗi khi logout:", error);
    }
  };

  return (
    <Navbar
      expand="md"
      fixed="top"
      expanded={expanded}
      className="shadow-sm custom-navbar py-2"
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/imgate/logo.jpg"
            alt="Coffee Shop Logo"
            width="50"
            height="10"
            className="img-fluid me-2"
          />
          <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Cà Phê Bliss</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" className="mx-2" onClick={() => setExpanded(false)}>
              Trang chủ
            </Nav.Link>
            
            {/* Menu chỉ hiển thị cho admin */}
            {/* {isAdmin() && (
              <Nav.Link as={NavLink} to="/poimenu" className="mx-2" onClick={() => setExpanded(false)}>
                Quản lý Menu
              </Nav.Link>
            )} */}
            
            {/* Menu cho tất cả user */}
            <Nav.Link as={NavLink} to="/poimenu" className="mx-2" onClick={() => setExpanded(false)}>
              Xem Menu
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about" className="mx-2" onClick={() => setExpanded(false)}>
              Giới thiệu
            </Nav.Link>
            
            {/* Giỏ hàng */}
            <Nav.Link
              as={NavLink}
              to="/cart"
              className="mx-2 d-flex align-items-center"
              onClick={() => setExpanded(false)}
            >
              <FaShoppingCart className="me-1" /> Giỏ hàng
            </Nav.Link>
            
            {/* Nút đăng nhập/đăng xuất */}
            {authenticated() ? (
              <>
                {/* Nút Account */}
                <Button
                  as={Link}
                  to="/account"
                  className="ms-3 px-3 fw-bold order-button"
                  onClick={() => setExpanded(false)}
                >
                  Tài khoản
                </Button>
                
                {/* Nút Logout */}
                <Button
                  variant="outline-light"
                  className="ms-2 px-3 fw-bold"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </>
            ) : (
              <Button
                as={Link}
                to="/login"
                className="ms-3 px-3 fw-bold order-button"
                onClick={() => setExpanded(false)}
              >
                Đăng nhập
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
