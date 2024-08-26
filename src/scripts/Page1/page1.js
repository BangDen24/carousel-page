import { preloadImages } from "../utils";
import { Slideshow } from "./slideshow";
import { Observer } from "gsap/Observer";

const slides = document.querySelector('.slides');
const slideshow = new Slideshow(slides);

document.querySelector('.slides-nav__item--prev').addEventListener('click', () => slideshow.previous());

document.querySelector('.slides-nav__item--next').addEventListener('click', () => slideshow.next());
Observer.create({
    type: 'wheel, touch, pointer',
    onDown: () => slideshow.previous(),
    onUp: () => slideshow.next(),
    wheelSpeed: -1,
    tolerance: 10
});

preloadImages('.slide__img').then(() => document.body.classList.remove('loading'));
