import React from "react";
import Carousel from "react-bootstrap/Carousel";

const NavCarousel=()=> {
  return (
    <Carousel>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src="./photos/virus.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <div className="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p>
              Some representative placeholder content for the first slide of the
              carousel.
            </p>
            <p>
              <a className="btn btn-lg btn-primary" href="#">
                Schedule Test
              </a>
            </p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        <img
          className="d-block w-100"
          src="./photos/virusTwo.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h1>Example headline.</h1>
          <p>
            Some representative placeholder content for the first slide of the
            carousel.
          </p>
          <p>
            <a className="btn btn-lg btn-primary" href="#">
              Got a Vaccine
            </a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="./photos/four.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h1>Example headline.</h1>
          <p>
            Some representative placeholder content for the first slide of the
            carousel.
          </p>
          <p>
            <a className="btn btn-lg btn-primary" href="#">
              Statistics
            </a>
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default NavCarousel;