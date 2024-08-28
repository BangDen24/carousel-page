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
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [a, b, c, d, e];

  const nextSlide = () => {
    if (isAnimating) return;
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    navigate(1, currentSlide, nextSlideIndex);
    setCurrentSlide(nextSlideIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const prevSlideIndex =
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    navigate(-1, currentSlide, prevSlideIndex);
    setCurrentSlide(prevSlideIndex);
  };

  const navigate = (direction, current, next) => {
    setIsAnimating(true);

    const currentSlideElem = document.querySelector(`.slide-${current}`);
    const nextSlideElem = document.querySelector(`.slide-${next}`);
    
    gsap.timeline()
      .to(currentSlideElem, { opacity: 0, duration: 0.3 })
      .fromTo(nextSlideElem, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.3 })
      .call(() => {
        const decoElements = document.querySelectorAll(".deco");
        gsap.timeline()
          .FromTo(decoElements, 
            0.15, // durasi setiap elemen
            { xPercent: (_, i) => i % 2 === 0 ? 100 : -100, autoAlpha: 1 },
            { xPercent: 0, autoAlpha: 1, ease: "power2.inOut", repeat: 1, yoyo: true }, // efek boomerang
            -0.2) // jeda antar elemen dimulai sebelum transisi foto selesai
          .call(() => {
            setIsAnimating(false);
          });
      });
  };

  useEffect(() => {
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      onDown: () => prevSlide(),
      onUp: () => nextSlide(),
      wheelSpeed: -1,
      tolerance: 10,
    });

    return () => {
      observer.kill();
    };
  }, [isAnimating]);

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
