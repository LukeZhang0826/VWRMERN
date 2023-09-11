import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import './about.scss'

const About = () => (
  <Container className="about-container" id="about">
    <Container className="inner-container">
      <Row className="align-items-center">
        <Col lg={6} className="image-container">
          <Image src="img/about.jpg" alt="" fluid/>
        </Col>
        <Col lg={6} className="text-container">
          <p className="about-title">About Viva</p>
          <p className="about-heading">Your Best Wellness & Rehab Care Center</p>
          <p className="about-description">Experience rejuvenation and healing at Viva Wellness and Rehab Centre, where relaxation and therapeutic treatments combine to enhance your well-being.</p>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default About;