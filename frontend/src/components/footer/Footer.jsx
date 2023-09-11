import React from 'react';
import './footer.scss'
import { Container, Row, Col } from 'react-bootstrap';
import { BiSolidLocationPlus, BiSolidPhone, BiMailSend } from 'react-icons/bi';

const Footer = () => {
    return (
        <><Container fluid className="footer-container">
            <Container className="footer-content">
                <Row>
                    <Col className="footer-left">
                            <p className="brand-title">
                                <span className="brand-primary">Viva</span> Wellness & Rehab
                            </p>
                        <p className="brand-info">Unwind and revitalize at Viva Wellness and Rehab Centre, where the synergy of relaxation and therapeutic techniques renews your vitality and fosters holistic wellness. We hope to see you soon!</p>
                    </Col>
                    <Col className="footer-right">
                        <Row>
                            
                            <Col className="services-links">
                                <p className="services-links-title">About Us</p>
                                <div className="links-list">
                                    <p><BiSolidLocationPlus/> 165 Sheppard Ave W, <br/>North York, ON, M2N 1M9</p>
                                    <p><BiSolidPhone/> +1 (647) 352-8688</p>
                                    <p><BiMailSend/> vivarehab@gmail.com</p>
                                </div>
                            </Col>
                            <Col className="quick-links">
                                <p className="quick-links-title">Quick Links</p>
                                <div className="links-list">
                                    <a href="/home">Home</a>
                                    <a href="/services">Services</a>
                                    <a href="/team">Team</a>
                                    <a href="/booking">Booking</a>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </Container>
        <Container fluid className="footer-copyright">
            <p>&copy; Viva Wellness & Rehab. All Rights Reserved.</p>
        </Container></>
    )
}

export default Footer;