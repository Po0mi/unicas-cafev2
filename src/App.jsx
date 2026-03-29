import React, { useState, useEffect } from "react";
import Navbar from "./layouts/navbar";
import Hero from "./components/Hero";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
      </main>
    </div>
  );
}

export default App;
