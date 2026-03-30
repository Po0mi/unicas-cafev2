import React, { useState, useEffect } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Menu from "./components/Menu";
import Gallery from "./components/Gallery";
import Marquee from "./components/Marquee";
import Contact from "./components/Contact";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Menu />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}

export default App;
