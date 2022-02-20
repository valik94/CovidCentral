import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./navcarousel.scss";

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
            <p>A new system to get the best Healthcare</p>
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
            <h1>Solution</h1>
            <p>Life’s got problems, we’ve got solutions</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./photos/medicalThree.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <div className="carousel-caption-c text-start">
            <h1>Improvements</h1>
            <p>Making health care better together</p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default NavCarousel;
