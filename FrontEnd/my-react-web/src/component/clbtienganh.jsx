import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../assets/css/clsenglish.css';

function ClbEnglish() {
  return (
<div className='clb-wrapper'>
        <div className="clb-english-page">
      <header className="clb-header py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="clb-title">Học tiếng Anh miễn phí</h1>
              <p className="clb-subtitle">Dành cho học sinh / sinh viên</p>
              <p className="clb-description">
                Bạn đang tìm kiếm một môi trường học tiếng Anh thân thiện, hiệu quả và miễn phí? 
                Hãy đến với câu lạc bộ tiếng Anh của chúng tôi! 
                Các lớp học với giáo viên bản ngữ, phương pháp học hiện đại, hoạt động giao tiếp thực tế sẽ giúp bạn tự tin hơn mỗi ngày.
              </p>
                <a href="http://facebook.com/groups/296021351856050" target="_blank" rel="noopener noreferrer">
              <Button variant="success" size="lg" >Tham gia ngay</Button>
             </a>
            </Col>
            <Col md={6} className="text-center">
              <img
                src="/imgate/tienganh.jpg"
                alt="English Class"
                className="img-fluid clb-image"
              />
            </Col>
          </Row>
        </Container>
      </header>
    </div>
</div>
  );
}

export default ClbEnglish;
