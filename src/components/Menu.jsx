import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMenuAnimation from "../hooks/useMenuAnimation";
import "./Menu.scss";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    id: "espresso",
    num: "01",
    label: "Espresso",
    count: 12,
    note: "Hot (8oz) · Iced (16oz)",
    items: [
      { name: "Americano", price: "₱85 / ₱115" },
      { name: "Cappuccino", price: "₱105" },
      { name: "Hazelnut Latte", price: "₱105 / ₱125" },
      { name: "Latte", price: "₱105 / ₱145" },
      { name: "White Mocha Latte", price: "₱125 / ₱150" },
      { name: "Mocha Latte", price: "₱125 / ₱145" },
      { name: "Caramel Macchiato", price: "₱125 / ₱150" },
      { name: "Spanish Latte", price: "₱125 / ₱160" },
      { name: "Spanilo", price: "₱125 / ₱165" },
      { name: "Salted Caramel", price: "₱105 / ₱150" },
      { name: "Vanilla Latte", price: "₱105 / ₱150" },
      { name: "Biscoff Latte", price: "₱125 / ₱175" },
    ],
  },
  {
    id: "noncoffee",
    num: "02",
    label: "Non-Coffee",
    count: 6,
    note: "Hot (8oz) · Iced (16oz)",
    items: [
      { name: "Vanilla", price: "₱105 / ₱125" },
      { name: "Salted Caramel", price: "₱105 / ₱130" },
      { name: "Chocolate", price: "₱115 / ₱135" },
      { name: "Matcha", price: "₱115 / ₱150" },
      { name: "Strawberry", price: "₱105 / ₱150" },
      { name: "Blueberry", price: "₱105 / ₱150" },
    ],
  },
  {
    id: "frappe",
    num: "03",
    label: "Frappe",
    count: 11,
    note: "16oz only",
    items: [
      { name: "Oreo Frappe", price: "₱160" },
      { name: "Choco Oreo Frappe", price: "₱195" },
      { name: "Chocolate Frappe", price: "₱185" },
      { name: "Matcha Frappe", price: "₱185" },
      { name: "Caramel Frappe", price: "₱175" },
      { name: "Mocha Frappe", price: "₱175" },
      { name: "White Mocha Frappe", price: "₱175" },
      { name: "Strawberry Frappe", price: "₱165" },
      { name: "Blueberry Frappe", price: "₱165" },
      { name: "Choco Java Chip Frappe", price: "₱175" },
      { name: "Biscoff Dreamy Frappe", price: "₱195" },
    ],
  },
  {
    id: "ricemeals",
    num: "04",
    label: "Rice Meals",
    count: 16,
    note: "Served with garlic rice & egg",
    items: [
      { name: "Tocino", price: "₱120" },
      { name: "Chorizo", price: "₱105" },
      { name: "Corned Beef", price: "₱125" },
      { name: "Tapa", price: "₱120" },
      { name: "Hungarian Sausage", price: "₱115" },
      { name: "Liempo", price: "₱165" },
      { name: "Fried Chicken", price: "₱145" },
      { name: "Chicken Hotdog", price: "₱105" },
      { name: "Spam", price: "₱130" },
      { name: "Longganisa", price: "₱105" },
      { name: "Chicken Fillet", price: "₱110" },
      { name: "Chicken Ala King", price: "₱155" },
      { name: "Chicken Fillet w/ Cheese", price: "₱115" },
      { name: "Bacon", price: "₱178" },
      { name: "Bangus", price: "₱175" },
      { name: "Chicken Nuggets", price: "₱125" },
    ],
  },
  {
    id: "burgers",
    num: "05",
    label: "Burgers & Sandwiches",
    count: 2,
    items: [
      { name: "Bacon & Egg Sandwich", price: "₱150" },
      { name: "Burger & Fries", price: "₱155" },
    ],
  },
  {
    id: "pasta",
    num: "06",
    label: "Pasta",
    count: 3,
    items: [
      { name: "Tuna Pesto", price: "₱170" },
      { name: "Chicken Alfredo", price: "₱170" },
      { name: "Carbonara", price: "₱170" },
    ],
  },
  {
    id: "croffles",
    num: "07",
    label: "Croffles",
    count: 12,
    sections: [
      {
        label: "Classic",
        items: [
          { name: "Plain", price: "₱90" },
          { name: "Chocolate", price: "₱100" },
          { name: "Nutella", price: "₱110" },
          { name: "Biscoff", price: "₱110" },
          { name: "Nutella Almond", price: "₱100" },
          { name: "Biscoff Almond", price: "₱115" },
        ],
      },
      {
        label: "Premium",
        items: [
          { name: "Oreo Cream", price: "₱125" },
          { name: "Blueberry Cream", price: "₱130" },
          { name: "Strawberry Cream", price: "₱130" },
          { name: "Biscoff Overload", price: "₱145" },
          { name: "Nutella Oreo", price: "₱145" },
          { name: "Nutella Banana", price: "₱150" },
        ],
      },
    ],
  },
  {
    id: "snacks",
    num: "08",
    label: "Snacks",
    count: 12,
    note: "Single · Overload",
    items: [
      { name: "Nachos", price: "₱80 / ₱210" },
      { name: "French Fries", price: "₱65 / ₱195" },
      { name: "Chicken Pops", price: "₱75" },
      { name: "Chicken Pops & Fries", price: "₱130" },
      { name: "Chicken & Bacon Burrito", price: "₱110" },
      { name: "French Toast", price: "₱115" },
      { name: "Korean Garlic Bread", price: "₱90" },
      { name: "Lumpia 5pcs", price: "₱60" },
      { name: "Lumpia 10pcs", price: "₱120" },
      { name: "Onion Rings", price: "₱95" },
      { name: "Onion Rings w/ Fries", price: "₱115" },
      { name: "Chicken Nuggets w/ Fries", price: "₱140" },
    ],
  },
  {
    id: "addons",
    num: "09",
    label: "Add Ons",
    count: 10,
    sections: [
      {
        label: "Drinks",
        items: [
          { name: "Oat Milk", price: "₱30" },
          { name: "Espresso Shot", price: "₱35" },
          { name: "Syrup", price: "₱20" },
          { name: "Sauce", price: "₱25" },
          { name: "Condensed Milk", price: "₱20" },
          { name: "Whipped Cream", price: "₱30" },
        ],
      },
      {
        label: "Rice Meals",
        items: [
          { name: "Plain Rice", price: "₱15" },
          { name: "Garlic Rice", price: "₱35" },
          { name: "Java Rice", price: "₱30" },
          { name: "Egg", price: "₱15" },
        ],
      },
    ],
  },
];

const AccordionItem = ({ cat, isOpen, onToggle }) => {
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (isOpen) {
      gsap.set(bodyRef.current, { height: "auto", autoAlpha: 1 });
      gsap.from(bodyRef.current, {
        height: 0,
        autoAlpha: 0,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        autoAlpha: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  const renderItems = (items) => (
    <div className="accord-items">
      {items.map((item, i) => (
        <div key={i} className="accord-row">
          <span className="accord-row-name">{item.name}</span>
          <span className="accord-row-price">{item.price}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`accord-cat ${isOpen ? "is-open" : ""}`}>
      <button className="accord-head" onClick={onToggle}>
        <div className="accord-head-left">
          <span className="accord-num">{cat.num}</span>
          <span className="accord-name">{cat.label}</span>
        </div>
        <div className="accord-head-right">
          {cat.note && <span className="accord-note">{cat.note}</span>}
          <span className="accord-count">{cat.count} items</span>
          <span className="accord-chevron">{isOpen ? "−" : "+"}</span>
        </div>
      </button>

      <div
        className="accord-body"
        ref={bodyRef}
        style={{ height: 0, overflow: "hidden" }}
      >
        {cat.sections
          ? cat.sections.map((sec, i) => (
              <div key={i} className="accord-section">
                <span className="accord-section-label">{sec.label}</span>
                {renderItems(sec.items)}
              </div>
            ))
          : renderItems(cat.items)}
      </div>
    </div>
  );
};

const Menu = () => {
  // null on mount — first accordion opens when section scrolls into view
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);
  const headRef = useRef(null);
  const listRef = useRef(null);

  useMenuAnimation(sectionRef, headRef);

  // Open espresso when section enters viewport
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      once: true,
      onEnter: () => setOpenId("espresso"),
    });
    return () => trigger.kill();
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section className="menu-section" id="menu" ref={sectionRef}>
      <div className="menu-inner">
        <div className="menu-head" ref={headRef}>
          <span className="menu-tag">What we serve · Est. 2026</span>
          <h2 className="menu-title">
            Our <em>Menu.</em>
          </h2>
          <p className="menu-sub">Crafted with care, served with warmth.</p>
        </div>

        <div className="menu-accord" ref={listRef}>
          {CATEGORIES.map((cat) => (
            <AccordionItem
              key={cat.id}
              cat={cat}
              isOpen={openId === cat.id}
              onToggle={() => toggle(cat.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
