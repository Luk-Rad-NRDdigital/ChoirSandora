import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const sections = [
  { id: "apie-mus", label: "Apie mus" },
  { id: "galerija", label: "Galerija" },
  { id: "kontaktai", label: "Kontaktai" },
];
const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const height = header.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        "--header-height",
        height + "px",
      );
    };
    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header.current);
    updateHeaderHeight();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current.focus();
      }
    };
    const handleOutsideClick = (event) => {
      if (!header.current.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <>
      <a className="skip-link" href="#pradzia">
        Pereiti prie turinio
      </a>
      <header
        ref={header}
        className="header"
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setMenuOpen(false);
        }}
      >
        <div className="header-inner">
          <button
            ref={menuButton}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Uždaryti meniu" : "Atidaryti meniu"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="menu-label">MENIU</span>
          </button>
          <a
            className="brand"
            href="#pradzia"
            aria-label="Sandora — pradžia"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark">s</span>
            <span>
              SANDORA<small>CHORAS</small>
            </span>
          </a>
          <span className="banner-caption" aria-hidden="true">
            SKAMBAME KARTU.
          </span>
        </div>
        <nav
          id="main-navigation"
          className="banner-menu"
          aria-label="Pagrindinė navigacija"
          hidden={!menuOpen}
        >
          <div className="menu-inner">
            {sections.map(({ id, label }, index) => (
              <a
                key={id}
                href={"#" + id}
                onClick={() => {
                  setMenuOpen(false);
                  document.getElementById(id).focus({ preventScroll: true });
                }}
              >
                <span className="menu-number" aria-hidden="true">
                  0{index + 1}
                </span>
                {label}
                <span className="menu-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main>
        <section
          id="pradzia"
          className="opening"
          aria-labelledby="title"
          tabIndex={-1}
        >
          <div className="hero">
            <div className="eyebrow">
              <span /> SUSITIKIME MUZIKOJE{" "}
              <span className="section-index">CHORAS / SANDORA</span>
            </div>
            <div className="title-row">
              <h1 id="title">
                Skirtingi balsai.
                <br />
                <em>Viena muzika.</em>
              </h1>
              <div className="seal" aria-hidden="true">
                <span>CHORAS</span>
                <b>S</b>
                <span>SANDORA</span>
              </div>
            </div>
            <div className="hero-bottom">
              <p>
                Esame „Sandora“ — žmonės, kuriuos sujungia daina.
                <br className="desktop" /> Kuriame skambesį, kuriame kiekvienas
                balsas svarbus.
              </p>
              <a className="scroll-cue" href="#apie-mus">
                ATRASKITE DAUGIAU <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
          <div className="music-panel" aria-label="Muzikinė kompozicija">
            <div className="staff" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (
                <i key={i} style={{ "--i": i }} />
              ))}
              <span className="note note-one">♪</span>
              <span className="note note-two">♫</span>
              <span className="note note-three">♪</span>
            </div>
            <span className="panel-caption">
              KAI BALSŲ DAUG, O JAUSMAS VIENAS.
            </span>
            <p>
              Dainuoti.
              <br />
              Jausti.
              <br />
              <em>Būti kartu.</em>
            </p>
            <span className="panel-number" aria-hidden="true">
              01 — ∞
            </span>
          </div>
        </section>
        {sections.map(({ id, label }, i) => (
          <section
            id={id}
            key={label}
            className={`content-section ${i % 2 === 0 ? "light" : "dark"}`}
            aria-labelledby={`heading-${i + 2}`}
            tabIndex={-1}
          >
            <div className="section-inner">
              <div className="section-meta">
                <span className="eyebrow">SANDORA / {label}</span>
                <span className="large-number" aria-hidden="true">
                  0{i + 2}
                </span>
              </div>
              <div className="section-copy">
                <span className="eyebrow">SKIRTINGI BALSAI. VIENA MUZIKA.</span>
                <h2 id={`heading-${i + 2}`}>
                  {label}
                  <span>.</span>
                </h2>
                <div className="gold-rule" />
                <p>{lorem}</p>
                <p>{lorem}</p>
                <span className="section-end">
                  CHORAS „SANDORA“ <span aria-hidden="true">✦</span>
                </span>
              </div>
            </div>
          </section>
        ))}
      </main>
      <footer>
        <span className="footer-name">Sandora.</span>
        <span>Skambame kartu.</span>
        <small>© {new Date().getFullYear()} Choras „Sandora“</small>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
