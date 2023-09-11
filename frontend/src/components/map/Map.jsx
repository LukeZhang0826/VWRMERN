import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './map.scss';
import { BiCircle, BiPhone } from 'react-icons/bi'

const Location = () => (
    <Container fluid className="loc-container" id="hours">
        <Container className="loc-content-container">
            <Row className="loc-row">
                <Col lg={6} className="loc-map-container">
                    <div className="loc-map-frame">
                        <iframe title="location-map" className="loc-iframe-large" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.6418386734804!2d-79.42145208793077!3d43.759533845425956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d7c322b86cb%3A0x75b073fd26ec962e!2s165%20Sheppard%20Ave%20W%2C%20North%20York%2C%20ON%20M2N%201N1!5e0!3m2!1sen!2sca!4v1684025229374!5m2!1sen!2sca" frameBorder="0" allowFullScreen aria-hidden="false" tabIndex="0"></iframe>
                    </div>
                </Col>
                <Col lg={6} className="loc-info-content">
                    <div className="loc-hours-text">
                        <p className="loc-hours-label">Open Hours</p>
                        <p className="loc-title">Find Us Here!</p>
                        <p className="loc-description">We are located at 165 Sheppard Ave W, North York, Ontario, Canada. We are open everyday with few holiday exceptions. We hope to see you soon!</p>
                        <p className="loc-hours-item"><BiCircle className="loc-hours-item-icon"/> Open Everyday : 10:00 AM - 8:00 PM</p>
                        <p className="loc-hours-item"><BiPhone className="loc-hours-item-icon"/> +1 (647) 352-8688</p>
                        <div className="loc-btn-container">
                            <Button href="/booking" className="loc-booking-btn">Book Now</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </Container>
)

export default Location;