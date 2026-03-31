import coffeeImage from "../assets/Coffee.webp";
import "./About.scss";
import useAboutAnimation from "../hooks/useAboutAnimation";

const BLOCKS = [
  {
    num: "01",
    tag: "Our Story",
    title: "A cozy corner in Cabatuan",
    body: "Unica's Cafe is a warm neighborhood spot in Cabatuan, Iloilo — where good food and good company always come together.",
    side: "left",
  },
  {
    num: "02",
    tag: "The Vibe",
    title: "Study, sip, stay a while",
    body: "A favorite for casual hangouts, study sessions, and quiet breaks from the day. Always welcoming, never rushing.",
    side: "right",
  },
  {
    num: "03",
    tag: "Quality",
    title: "Thoughtfully prepared",
    body: "Comforting drinks and carefully prepared meals — consistency and quality in every single order.",
    side: "left",
  },
  {
    num: "04",
    tag: "The Word",
    title: null,
    quote: "The best coffee in town – feels like home every time.",
    cite: "– Maria L., regular customer",
    side: "right",
  },
];

const About = () => {
  const { sectionRef, metaRef, titleRef, blocksRef, imageRef, bodyRef } =
    useAboutAnimation();

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        {/* ── Meta ── */}
        <div className="about-meta" ref={metaRef}>
          <span className="about-meta-tag">Our Story</span>
          <span className="about-meta-divider">·</span>
          <span className="about-meta-tag">Est. 2026</span>
        </div>

        {/* ── Title ── */}
        <h2 className="about-title" ref={titleRef}>
          More than <em>just coffee.</em>
        </h2>

        {/* ── Four blocks ── */}
        {BLOCKS.map((b, i) => (
          <div
            key={i}
            ref={(el) => (blocksRef.current[i] = el)}
            className={`about-block about-block--${b.side} about-block--${i < 2 ? "top" : "bottom"}`}
          >
            <span className="block-num">{b.num}</span>
            <span className="block-tag">{b.tag}</span>
            {b.title && <h3 className="block-title">{b.title}</h3>}
            {b.body && <p className="block-body">{b.body}</p>}
            {b.quote && (
              <blockquote className="block-quote">
                <p>"{b.quote}"</p>
                <cite>{b.cite}</cite>
              </blockquote>
            )}
          </div>
        ))}

        {/* ── Center image ── */}
        <div className="about-image-wrapper">
          <img
            ref={imageRef}
            src={coffeeImage}
            alt="Unica's Cafe iced coffee"
            className="about-image"
            fetchpriority="high"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* ── Bottom body text ── */}
        <div className="about-body" ref={bodyRef}>
          <p>
            With a welcoming atmosphere and a focus on quality and consistency,
            Unica's Cafe aims to be a place where locals can relax, connect, and
            enjoy simple moments over great coffee and food.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
