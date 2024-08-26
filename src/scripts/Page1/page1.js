import { preloadImages } from "../utils";
import { Slideshow } from "./slideshow";

const slides = document.querySelector('.slides');
const slideshow = new Slideshow(slides);

document.querySelector('.slides-nav__item--prev').addEventListener('click', () => slideshow.previous());
