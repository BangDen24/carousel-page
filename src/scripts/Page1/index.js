import gsap from "gsap";
import imagesLoaded from "imagesloaded";
import { Observer } from "gsap/Observer";

// Preload Images Function
const preloadImages = (selector = "img") => {
  return new Promise((resolve) => {
    imagesLoaded(
      document.querySelectorAll(selector),
      { background: true },
      resolve
    );
  });
};

// Slideshow Class
const NEXT = 1;
const PREV = -1;

class Slideshow {
  constructor(slides) {
    this.DOM = {
      slides,
      slidesInner: Array.from(slides).map((item) =>
        item.querySelector(".slide__img")
      ),
    };

    this.current = 0;
    this.isAnimating = false;

    // Set the initial slide as the current one
    this.DOM.slides[this.current].classList.add("slide--current");

    // Count total slides
    this.slidesTotal = this.DOM.slides.length;
  }

  next() {
    this.navigate(NEXT);
  }

  previous() {
    this.navigate(PREV);
  }

  navigate(direction) {
    if (this.isAnimating) return false;
    this.isAnimating = true;

    const previous = this.current;
    this.current =
      direction === NEXT
        ? this.current < this.slidesTotal - 1
          ? this.current + 1
          : 0
        : this.current > 0
        ? this.current - 1
        : this.slidesTotal - 1;

    const currentSlide = this.DOM.slides[previous];
    const currentInner = this.DOM.slidesInner[previous];
    const upcomingSlide = this.DOM.slides[this.current];
    const upcomingInner = this.DOM.slidesInner[this.current];

    gsap
      .timeline({
        defaults: {
          duration: 1.2,
          ease: "expo",
        },
        onStart: () => {
          this.DOM.slides[this.current].classList.add("slide--current");
          gsap.set(upcomingSlide, { zIndex: 99 });
        },
        onComplete: () => {
          this.DOM.slides[previous].classList.remove("slide--current");
          gsap.set(upcomingSlide, { zIndex: 1 });
          this.isAnimating = false;
        },
      })
      .addLabel("start", 0)
      .to(
        currentSlide,
        {
          ease: "power4",
          autoAlpha: 0,
        },
        "start"
      )
      .fromTo(
        upcomingSlide,
        {
          autoAlpha: 1,
          scale: 0,
          yPercent: direction * 100,
        },
        {
          scale: 1,
          yPercent: 0,
        },
        "start"
      )
      .fromTo(
        upcomingInner,
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
  }
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const slideshow = new Slideshow(slides);

  document
    .querySelector(".slides-nav__item--prev")
    .addEventListener("click", () => slideshow.previous());
  document
    .querySelector(".slides-nav__item--next")
    .addEventListener("click", () => slideshow.next());

  Observer.create({
    type: "wheel, touch, pointer",
    onDown: () => slideshow.previous(),
    onUp: () => slideshow.next(),
    wheelSpeed: -1,
    tolerance: 10,
  });

  preloadImages(".slide__img").then(() =>
    document.body.classList.remove("loading")
  );
});

export { preloadImages, Slideshow };
