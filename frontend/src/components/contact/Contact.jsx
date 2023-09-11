import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import "./contact.scss";

const Contact = () => {

  return (
    <Container fluid className="contact">
      <Row className="justify-center">
        <Col lg={6} className="contact-container">
          <div className="contact-form">
            <p className="custom-header">Questions</p>
            <p className="contact-query">Contact For Any Query!</p>
            <div id="success"></div>

            <form action="https://formsubmit.co/vivarehab@gmail.com" method="POST">

              <Row className="contact-row">
                <Col sm={6} className="control-group">
                  <input type="text" name="Name" id="name" placeholder="Your Name" required />
                  <p className="help-block text-danger"></p>
                </Col>
                <Col sm={6} className="control-group">
                  <input type="email" name="Email" id="email" placeholder="Your Email" required />
                  <p className="help-block text-danger"></p>
                </Col>
              </Row>

              <div className="control-group">
                <input type="text" name="Subject" id="subject" placeholder="Subject" required />
                <p className="help-block text-danger"></p>
              </div>

              <div className="control-group">
                <textarea name="Message" rows={3} id="message" placeholder="Message" required />
                <p className="help-block text-danger"></p>
              </div>

              <div>
                <Button className="contact-button" type="submit" id="sendMessageButton">Send Message</Button>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;