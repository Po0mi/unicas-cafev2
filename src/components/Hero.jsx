import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./Hero.scss";
import coffeeImage from "../assets/coffeeDrink.webp";

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-wrapper"> </div>
        <h1 className="hero-title">Unicas Cafe</h1>
        <p className="hero-subtitle">
          Experience the finest coffee and pastries in town.
        </p>
        <div className="hero-image-wrapper">
          <img
            src={coffeeImage}
            alt="coffee latte"
            className="hero-image"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            width="700"
            height="1000"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
