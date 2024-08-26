import gsap from "gsap";

const NEXT = 1;
const PREV = -1;

export class Slideshow {
  constructor(slides, slidesInner) {
    this.DOM = {
      slides,
      slidesInner,
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
