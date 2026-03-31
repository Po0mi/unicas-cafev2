import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import useLocationAnimation from "../hooks/useLocationAnimation";
import "./Location.scss";

gsap.registerPlugin(ScrollTrigger);

const LAT = 10.880969949060203;
const LNG = 122.48003020975;
const GMAPS = "https://maps.app.goo.gl/azQ69DD2jNUgojLE9";

const Location = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const mapRef = useRef(null);
  const leafletRef = useRef(null);

  useLocationAnimation(sectionRef, leftRef, rightRef);

  // ── Leaflet init ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (leafletRef.current) return;

    const map = L.map(mapRef.current, {
      center: [LAT, LNG],
      zoom: 17,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    leafletRef.current = map;

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      { maxZoom: 19 },
    ).addTo(map);

    const markerIcon = L.divIcon({
      className: "",
      html: `
        <div class="map-marker">
          <div class="map-marker-dot"></div>
          <div class="map-marker-ring"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
    });

    L.marker([LAT, LNG], { icon: markerIcon })
      .addTo(map)
      .bindPopup(
        `<div class="map-popup">
          <strong>Unica's Cafe</strong>
          <span>Aragon St, Cabatuan, Iloilo</span>
        </div>`,
        { closeButton: false, offset: [0, -8] },
      )
      .openPopup();

    return () => {
      if (leafletRef.current) {
        leafletRef.current.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  return (
    <section className="location" id="location" ref={sectionRef}>
      {/* ── Left — title ── */}
      <div className="location-left" ref={leftRef}>
        <span className="location-tag">Find us</span>
        <h2 className="location-title">
          Unica's <em>Cafe.</em>
        </h2>
      </div>

      {/* ── Center — map ── */}
      <div className="location-map" ref={mapRef} />

      {/* ── Right — details ── */}
      <div className="location-right" ref={rightRef}>
        <div className="location-info">
          <span className="location-item">Aragon St, Cabatuan</span>
          <span className="location-item">5031 Iloilo, Philippines</span>
          <span className="location-item">Open daily · 11am – 7pm</span>
          <span className="location-item">@unicascafecab</span>
        </div>
        <a
          className="location-dir"
          href={GMAPS}
          target="_blank"
          rel="noopener noreferrer"
        >
          Get directions →
        </a>
      </div>
    </section>
  );
};

export default Location;
