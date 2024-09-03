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

// [HIGHLIGHT] Register Observer Plugin
gsap.registerPlugin(Observer);

const Page3 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [a, b, c, d, e];

  const nextSlide = () => {
    if (isAnimating) return;
    const nextSlideIndex = currentSlide + 1;
    if (nextSlideIndex >= slides.length) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(nextSlideIndex);
    }
    // [HIGHLIGHT] Corrected parameter from `-1` to `1`
    navigate(1, currentSlide, nextSlideIndex);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    const prevSlideIndex = currentSlide - 1;
    if (prevSlideIndex < 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(prevSlideIndex);
    }
    // [HIGHLIGHT] Corrected parameter from `nextSlideIndex` to `prevSlideIndex`
    navigate(-1, currentSlide, prevSlideIndex);
  };

  const navigate = (direction, current, next) => {
    setIsAnimating(true);

    const SlideCurr = document.querySelector(`.slide-${current}`);
    const SlideNext = document.querySelector(`.slide-${next}`);
    const decoElements = document.querySelectorAll(".deco");

    gsap.set(SlideNext, { zIndex: 99 });

    const tl = gsap
      .timeline({
        defaults: {
          duration: 0.8,
          ease: "power4.inOut",
        },
        // [HIGHLIGHT] Corrected `isAnimating(false);` to `setIsAnimating(false);`
        onComplete: () => setIsAnimating(false),
      })
      // [HIGHLIGHT] Corrected `addlabel` to `addLabel`
      .addLabel("start", 0);

    decoElements.forEach((x, pos, arr) => {
      const deco = arr[arr.length - 1 - pos];
      tl.fromTo(
        deco,
        {
          xPercent: (x) => (pos % 2 === 1 ? -100 : 100),
          autoAlpha: 1,
        },
        {
          xPercent: (x) => (pos % 2 === 1 ? 50 : -50),
          onComplete: () => {
            if (pos === arr.length - 1) {
              SlideCurr.classList.remove("slide--current");
              SlideNext.classList.add("slide--current");
            }
          },
        },
        `start+=${Math.floor((arr.length - 1 - pos) / 2) * 0.14}`
      );

      if (pos === 0) {
        tl.addLabel("middle", ">");
      }
    });

    tl.to(
      SlideCurr,
      {
        ease: "power4.in",
        scale: 0.1,
        duration: 0.8,
        onComplete: () => gsap.set(SlideCurr, { scale: 1 }),
      },
      "start"
    );

    // [HIGHLIGHT] Corrected to ensure unique variable names in the loop
    decoElements.forEach((x, pos, arr) => {
      const deco = arr[arr.length - 1 - pos];
      tl.to(
        deco,
        {
          xPercent: () => (pos % 2 === 1 ? -100 : 100),
        },
        `middle+=${Math.floor(pos / 2) * 0.12}`
      );
    });

    tl.fromTo(
      SlideNext,
      {
        scale: 0.6,
      },
      {
        duration: 1.1,
        ease: "expo",
        scale: 1,
      },
      ">-0.8"
    );
  };

  useEffect(() => {
    const observer = Observer.create({
      type: "wheel,touch,pointer",
      onDown: () => prevSlide(),
      onUp: () => nextSlide(),
      wheelSpeed: 1,
      tolerance: 10,
    });

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
        {/* [HIGHLIGHT] Ensure unique deco elements */}
        <div className="deco deco--5"></div>
        <div className="deco deco--6"></div>
        <div className="deco deco--7"></div>
      </div>
    </div>
  );
};

export default Page3;
