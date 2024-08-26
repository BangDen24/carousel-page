import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  const slidesRef = useRef([]);

  const slides = [a, b, c, d, e];

  const nextSlide = () => {
    if (isAnimating) return;
    const nextSlideIndex = (currentSlide + 1) % slides.length;
    animateSlide(currentSlide, nextSlideIndex);
    setCurrentSlide(nextSlideIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const prevSlideIndex =
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
    animateSlide(currentSlide, prevSlideIndex);
    setCurrentSlide(prevSlideIndex);
  };

  const animateSlide = (current, next) => {
    setIsAnimating(true);

    const timeline = gsap.timeline({
      defaults: { duration: 1.2, ease: "expo" },
      onStart: () => {
        const currentSlideElem = slidesRef.current[current];
        const nextSlideElem = slidesRef.current[next];
        gsap.set(nextSlideElem, { zIndex: 99 });
        currentSlideElem.classList.add("slide--current");
      },
      onComplete: () => {
        const currentSlideElem = slidesRef.current[current];
        const nextSlideElem = slidesRef.current[next];
        currentSlideElem.classList.remove("slide--current");
        gsap.set(nextSlideElem, { zIndex: 1 });
        setIsAnimating(false);
      },
    });

    timeline
      .addLabel("start", 0)
      .to(slidesRef.current[current], { autoAlpha: 0 }, "start")
      .fromTo(
        slidesRef.current[next],
        {
          autoAlpha: 1,
          scale: 0,
          yPercent: 100,
        },
        {
          scale: 1,
          yPercent: 0,
        },
        "start"
      )
      .fromTo(
        slidesRef.current[next].querySelector(".slide__img"),
        {
          scale: 2,
          filter: "brightness(600%)",
        },
        {
          scale: 1,
          filter: "brightness(100%)",
        },
        "start"
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
            className={`slide ${
              index === currentSlide ? "slide--current" : ""
            }`}
            ref={(el) => (slidesRef.current[index] = el)}
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
