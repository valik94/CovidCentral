import React from "react";
import Carousel from "react-bootstrap/Carousel";
import './navcarousel.scss';

const NavCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src="./photos/medicalThree.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="carousel-caption-a text-start">
            <h1>Innovation</h1>
            <p>
              Some representative placeholder content for the first slide of the
              carousel.
            </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src="./photos/medicalOne.jpeg"
          alt="Second slide"
        />
        <Carousel.Caption>
        <div className="carousel-caption-b text-start">
          <h1>Example headline.</h1>
          <p>
            Some representative placeholder content for the first slide of the
            carousel.
          </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./photos/medicalTwo.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Example headline.</h1>
          <p>
            Some representative placeholder content for the first slide of the
            carousel.
          </p>
      
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default NavCarousel;
