import { Link } from 'react-router-dom';
import a from "../assets/31.jpg";
import b from "../assets/32.jpg";
import c from "../assets/33.jpg";
import d from "../assets/34.jpg";

const Page2 = () => {
  return (
    <div className="demo-2 loading">
      <main>
        <div className="frame">
          <div className="frame__title">
            <h1 className="frame__title-main">
              Slideshow <strong>Animations</strong>
            </h1>
          </div>
          <nav className="frame__demos">
            <span>Variations</span>
            <Link to="/" className="frame__demo">01</Link>
            <Link to="/page2" className="frame__demo frame__demo--current">02</Link>
            <Link to="/page3" className="frame__demo">03</Link>
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
            <div className="slide__img" style={{ backgroundImage: `url(${a})` }}></div>
          </div>
          <div className="slide">
            <div className="slide__img" style={{ backgroundImage: `url(${b})` }}></div>
          </div>
          <div className="slide">
            <div className="slide__img" style={{ backgroundImage: `url(${c})` }}></div>
          </div>
          <div className="slide">
            <div className="slide__img" style={{ backgroundImage: `url(${d})` }}></div>
          </div>
          <div className="deco deco--1"></div>
          <div className="deco deco--2"></div>
          <div className="deco deco--3"></div>
        </div>
      </main>
    </div>
  );
};

export default Page2;
