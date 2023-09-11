import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./slideshow.scss";

const Slideshow = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="slideshow">
      <div className="slideshow-container">
        <Carousel className="custom-carousel" activeIndex={index} onSelect={handleSelect} controls={false} fade interval={5000} indicators={false}>

        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/RMT.jpg"
              alt="RMT"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Registered Massage Therapists</p>
            <p className="carousel-description">Highly skilled professionals dedicated to improving the health and well-being of individuals through the application of therapeutic massage techniques.</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/mva-rehab.jpg"
              alt="MVA"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Motor Vehicle Accident Rehabilitation</p>
            <p className="carousel-description">An expert team offering personalized therapies to restore mobility, reduce pain, and enhance strength, guiding individuals back to optimal health with compassionate care.</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>


        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/acupuncture.jpg"
              alt="Acupuncture"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Acupuncturists</p>
            <p className="carousel-description">Highly skilled professionals using the ancient practice using fine needles to stimulate specific points on the body, promoting healing, pain relief, and overall well-being.</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/chiro.jpg"
              alt="Chiropractors"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Chiropractors</p>
            <p className="carousel-description">Healthcare professionals specializing in diagnosing and treating musculoskeletal disorders, primarily focusing on the spine, using manual adjustments to improve alignment, relieve pain, and enhance the body's natural healing abilities.</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/physio.jpg"
              alt="Physiotherapists"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Physiotherapists</p>
            <p className="carousel-description">Healthcare professionals specializing in treating physical conditions through exercises, manual techniques, and modalities to improve mobility, relieve pain, and restore function.</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <div className="darkened-image">
            <img
              className="d-block w-100"
              src="/img/yoga.jpg"
              alt="Yoga"
            />
          </div>
          <Carousel.Caption>
            <p className="carousel-title">WELLNESS & REHAB CENTRE</p>
            <p className="carousel-service">Yoga Instructors</p>
            <p className="carousel-description">Coming Soon!</p>
            <Button href="/booking" className="custom-button d-inline-block" variant="light">Book Now</Button>
          </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        <div className="slideshow-custom-indicators">
          <div onClick={() => handleSelect(0)} className={`slideshow-indicator ${index === 0 ? 'slideshow-indicator-active' : ''}`}></div>
          <div onClick={() => handleSelect(1)} className={`slideshow-indicator ${index === 1 ? 'slideshow-indicator-active' : ''}`}></div>
          <div onClick={() => handleSelect(2)} className={`slideshow-indicator ${index === 2 ? 'slideshow-indicator-active' : ''}`}></div>
          <div onClick={() => handleSelect(3)} className={`slideshow-indicator ${index === 3 ? 'slideshow-indicator-active' : ''}`}></div>
          <div onClick={() => handleSelect(4)} className={`slideshow-indicator ${index === 4 ? 'slideshow-indicator-active' : ''}`}></div>
          <div onClick={() => handleSelect(5)} className={`slideshow-indicator ${index === 5 ? 'slideshow-indicator-active' : ''}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
