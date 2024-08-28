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

    gsap.set(nextSlideElem, { zIndex: 99 });

    const tl = gsap.timeline({
      defaults: {
        duration: 0.8,
        ease: "power4.inOut",
      },
      onStart: () => {
        //ADD GSAP INTRO NYA DISINI
        nextSlideElem.classList.add("slide--current");
      },
      onComplete: () => {
        currentSlideElem.classList.remove("slide--current");
        gsap.set(nextSlideElem, { zIndex: 1 });
        setIsAnimating(false);
      },
    });

    tl
    .addLabel('start', 0);

    tl.to(
      currentSlideElem,
      {
        scale: 0.6, // [HIGHLIGHT] Slide lama mengecil
        autoAlpha: 0, // [HIGHLIGHT] Slide lama menjadi tidak terlihat
        onComplete: () => gsap.set(currentSlideElem, { scale: 1, autoAlpha: 1 }), // [HIGHLIGHT] Reset scale dan opacity
      },
      "start"
    );

    document.querySelectorAll(".deco").forEach((deco, pos, arr) => {
      const reverseDeco = arr[arr.length - 1 - pos];

      tl.fromTo(
        reverseDeco, {
          xPercent: pos % 2 === 1 ? - 100 : 100,
          autoAlpha : 1,
        },
        {
          xPercent: pos % 2 === 1 ? -50 : 50,
          onComplete: () => {
            if (pos === arr.length - 1){
              currentSlideElem.classList.remove("slide--current");
              nextSlideElem.classList.add("slide--current");
            }
          },
        },
        `start+=${Math.floor((arr.length -1 -pos) / 2) * 0.14}`
      );
      if (!pos) {
        tl.addLabel("middle", ">");
      }
    });
    
    tl.to(
      currentSlideElem,
      {
        ease: "power4.in",
        scale: 0.1,
        onComplete: () => gsap.set(currentSlideElem, {scale : 1})
      }, "start"
    );
    document.querySelectorAll(".deco").forEach((deco, pos, arr) => {
      tl.to(
        deco,
        {
          xPercent: pos % 2 === 1 ? -100 : 100,
          duration : 0.5,
        },
        `middle+=${Math.floor(pos / 2) * 0.12}`
      );
    });
  
    // Animasi skala slide berikutnya
    tl.fromTo(
      nextSlideElem,
      {
        duration: 0.8,
        scale: 0.6,
        autoAlpha: 0,
        zIndex: 0,
      },
      {
        duration: 1.1,
        ease: "expo",
        scale: 1,
        autoAlpha:1,
      },
      ">-0.8"
    );
  };


  useEffect(() => {
    // Create the Observer instance
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
