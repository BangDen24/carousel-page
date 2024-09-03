import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import "../styles/base.scss";
import a from "../assets/31.jpg";
import b from "../assets/32.jpg";
import c from "../assets/33.jpg";
import d from "../assets/34.jpg";
import e from "../assets/35.jpg";

gsap.registerPlugin(Observer);

const Page1 = () => {
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
    
    // Set zIndex for upcoming slide
    gsap.set(nextSlideElem, { zIndex: 99 });

    const timeline = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo" },
      onStart: () => {
        nextSlideElem.classList.add("slide--current");
      },
      onComplete: () => {
        currentSlideElem.classList.remove("slide--current");
        gsap.set(nextSlideElem, { zIndex: 1 });
        setIsAnimating(false);
      },
    });
    timeline.timeScale(0.2)
    timeline
      .addLabel("start", 0)
      .fromTo(
        nextSlideElem,
        {
          autoAlpha: 1,
          scale: 0.1,
          yPercent: direction * 100,
        },
        {
          scale: 1,
          yPercent: 0,
        },
        "start"
      )
      .fromTo(
        nextSlideElem.querySelector(".slide__img"),
        {
          scale: 2,
          filter: "brightness(600%)",
        },
        {
          scale: 1,
          filter: "brightness(100%)",
        },
        "start"
      )
      .fromTo(
        currentSlideElem.querySelector(".slide__img"),
        {
          filter: "contrast(100%) saturate(100%)",
        },
        {
          filter: "contrast(120%) saturate(140%)",
        },
        "start"
      )
      .addLabel("middle", "start+=0.6")
      .to(nextSlideElem, {
        scale: 1,
      }, "middle")
      .to(currentSlideElem, {
        scale: 1,
        autoAlpha: 0,
      }, "middle");
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
          <Link to="/page1" className="frame__demo frame__demo--current">
            01
          </Link>
          <Link to="/page2" className="frame__demo">
            02
          </Link>
          <Link to="/page3" className="frame__demo">
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
      </div>
    </div>
  );
};

export default Page1;
