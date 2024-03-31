import React from "react";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import "../css/slide.css";

const proprietes = {
  duration: 5000,
  transitionDuration: 700,
  infinite: true,
  indicators: true,
  arrows: true,
};

const Header2 = () => {
  return (
    <div className="containerSlide">
      <Slide {...proprietes}>
        <div className="each-slide">
          <div>
            <img src='slide-img\1.png' alt="img1" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src='slide-img\2.png' alt="img2" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src='slide-img\3.png' alt="img3" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src='slide-img\4.png' alt="img4" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src='slide-img\5.png' alt="img5" />
          </div>
        </div>
        <div className="each-slide">
          <div>
            <img src='slide-img\6.png' alt="img6" />
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Header2;
