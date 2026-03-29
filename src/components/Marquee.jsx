import "./Marquee.scss";

const text =
  "Coffee · Pastries · Good Vibes · Cabatuan, Iloilo · Dine In & Takeaway · Open Daily · ";

const Marquee = () => (
  <div className="marquee">
    <div className="marquee-content">
      <span>{text}</span>
      <span>{text}</span>
    </div>
  </div>
);

export default Marquee;
