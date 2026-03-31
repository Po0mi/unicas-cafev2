import React, { lazy, Suspense } from "react";
import Navbar from "./layouts/navbar";
import useSmoothScroll from "./hooks/useSmoothScroll";
import "./App.css";

// Lazy load components
const Hero = lazy(() => import("./components/Hero"));
const About = lazy(() => import("./components/About"));
const Menu = lazy(() => import("./components/Menu"));
const Gallery = lazy(() => import("./components/Gallery"));
const Marquee = lazy(() => import("./components/Marquee"));
const Contact = lazy(() => import("./components/Contact"));
const Location = lazy(() => import("./components/Location"));

// Optional: Loading component
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loader"></div>
  </div>
);

function App() {
  useSmoothScroll();

  return (
    <div className="app">
      <Navbar />
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Hero />
          <Marquee />
          <About />
          <Menu />
          <Gallery />
          <Location />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
