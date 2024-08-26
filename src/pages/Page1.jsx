import React, {useEffect} from "react";
import "./styles/Page1.scss"; 

const Page1 = () => {
  return (
    <div className="demo-12 loading">
      <main>
        <div className="frame">
          <div className="frame__title">
            <h1 className="frame__title-main">
              Slideshow <strong>Animations</strong>
            </h1>
          </div>
          <a
            href="https://tympanus.net/codrops/?p=73708"
            className="frame__back"
          >
            Article
          </a>
          <a
            href="http://tympanus.net/Development/GridItemHoverEffect/"
            className="frame__prev"
          >
            Previous demo
          </a>
          <nav className="frame__demos">
            <span>Variations</span>
            <a href="index1.html" className="frame__demo">
              01
            </a>
            <a href="index2.html" className="frame__demo">
              02
            </a>
            <a href="index3.html" className="frame__demo">
              03
            </a>
            <a href="index4.html" className="frame__demo frame__demo--current">
              04
            </a>
          </nav>
          <nav className="slides-nav">
            <button className="slides-nav__item slides-nav__item--prev">
              &larr;
            </button>
            <button className="slides-nav__item slides-nav__item--next">
              &rarr;
            </button>
          </nav>
        </div>
        <div className="slides">
          <div className="slide">
            <div
              className="slide__img"
              style={{ backgroundImage: `url(img/3.jpg)` }}
            ></div>
          </div>
          <div className="slide">
            <div
              className="slide__img"
              style={{ backgroundImage: `url(img/4.jpg)` }}
            ></div>
          </div>
          <div className="slide">
            <div
              className="slide__img"
              style={{ backgroundImage: `url(img/5.jpg)` }}
            ></div>
          </div>
          <div className="deco deco--1"></div>
          <div className="deco deco--2"></div>
          <div className="deco deco--3"></div>
        </div>
      </main>
    </div>
  );
};

export default Page1;
