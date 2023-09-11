import React, { useState } from 'react';
import { Container, Row, Col, Image, Carousel } from 'react-bootstrap';
import { BiSolidQuoteRight } from 'react-icons/bi';
import './testimonial.scss';

const testimonials = [
    {
        name: 'Alicia Zhu',
        message: 'The massage therapist was very nice and the clinic was very clean. The therapist was very experienced and patient. I felt nice after the treatment.'
    },
    {
        name: 'Vee Elsie',
        message: 'The staff at Viva made us feel welcomed from the moment we walked in the door, greeting us by name. The treatments were great, and my therapist was clearly well trained and experienced.'
    },
    {
        name: 'Song Sun',
        message: 'Great location who serves the local community. Especially great for people like me needs a massage after a exhausting day or week! Really professional massage services to relieve my muscle pain. Shout out to Anne!'
    },
];

const Testimonial = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Container className="testimonial-container" id="testimonial">
            <Container className="inner-container">
                <Row className="align-items-center">
                    <Col lg={6} className="text-container">
                        <div>
                            <p className="testimonial-title">Testimonials</p>
                            <p className="testimonial-header">What Our Clients Say!</p>
                        </div>
                        <div className="carousel-container">
                            <Carousel
                                controls={false}
                                indicators={false}
                                interval={5000}
                                activeIndex={index}
                                onSelect={handleSelect}
                            >
                                {testimonials.map((testimonial, index) => (
                                    <Carousel.Item key={index}>
                                        <p className="testimonial-name">{testimonial.name} <BiSolidQuoteRight /></p>
                                        <p className="testimonial-description">{testimonial.message}</p>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                            <div className="custom-indicators">
                                {testimonials.map((_, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => handleSelect(idx)}
                                        className={`testimonial-indicator ${index === idx ? 'testimonial-indicator-active' : ''}`}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </Col>
                    <Col lg={6} className="image-container">
                        <Image
                            src="img/testimonial.jpg"
                            alt=""
                            fluid
                        />
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default Testimonial;