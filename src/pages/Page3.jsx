import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import "../styles/base.scss";
import a from "../assets/51.jpg";
import b from "../assets/52.jpg";
import c from "../assets/53.jpg";
import d from "../assets/54.jpg";
import e from "../assets/55.jpg";

// gsap.registerPlugin(Observer);

const Page3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [a, b, c, d, e];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    // Create the Observer instance
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      onDown: () => prevSlide(), // Call prevSlide function
      onUp: () => nextSlide(), // Call nextSlide function
      wheelSpeed: -1,
      tolerance: 10,
    });

    // Cleanup observer on component unmount
    return () => {
      observer.kill();
    };
  }, []);

  return (
    <div className="demo-1 loading">
      <div className="frame">
        <div className="frame__title">
          <h1 className="frame__title-main">
            Slideshow <strong>Animations</strong>
          </h1>
        </div>
        <nav className="frame__demos">
          <span>Variations</span>
          <Link to="/" className="frame__demo">
            01
          </Link>
          <Link to="/page2" className="frame__demo">
            02
          </Link>
          <Link to="/page3" className="frame__demo frame__demo--current">
            03
          </Link>
          <Link to="/page4" className="frame__demo">
            04
            </Link>
        </nav>
        <nav className="slides-nav">
          <button
            className="slides-nav__item slides-nav__item--prev"
            onClick={prevSlide}
          >
            &larr;
          </button>
          <button
            className="slides-nav__item slides-nav__item--next"
            onClick={nextSlide}
          >
            &rarr;
          </button>
        </nav>
      </div>
      <div className="slides">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide slide-${index} ${
              index === currentSlide ? "slide--current" : ""
            }`}
          >
            <div
              className="slide__img"
              style={{ backgroundImage: `url(${slide})` }}
            ></div>
          </div>
        ))}
        <div className="deco deco--5"></div>
        <div className="deco deco--5"></div>
        <div className="deco deco--6"></div>
        <div className="deco deco--6"></div>
        <div className="deco deco--7"></div>
        <div className="deco deco--7"></div>
      </div>
    </div>
  );
};

export default Page3;
