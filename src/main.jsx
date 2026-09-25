import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const sections = [
  { id: "apie-mus", label: "Apie mus" },
  { id: "galerija", label: "Galerija" },
  { id: "kontaktai", label: "Kontaktai" },
];
const currentPage = sections.find(({ id }) =>
  window.location.pathname.endsWith("/" + id + ".html"),
);

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
      <a className="skip-link" href="#turinys">
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
            href="./index.html"
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
          data-open={menuOpen}
          inert={!menuOpen}
          aria-hidden={!menuOpen}
        >
          <div className="menu-inner">
            {sections.map(({ id, label }) => (
              <a
                key={id}
                href={"./" + id + ".html"}
                aria-current={currentPage?.id === id ? "page" : undefined}
              >
                {label}
                <span className="menu-arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </nav>
      </header>
      <main id="turinys" tabIndex={-1}>
        {currentPage ? <ContentPage page={currentPage} /> : <HomePage />}
      </main>
      <footer>
        <span className="footer-name">Sandora.</span>
        <span>Skambame kartu.</span>
        <SocialLinks />
        <small>© {new Date().getFullYear()} Choras „Sandora“</small>
      </footer>
    </>
  );
}

function HomePage() {
  return (
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
        </div>
      </div>
      <ChoirPhoto />
    </section>
  );
}

function ChoirPhoto() {
  return (
    <figure className="choir-photo">
      <img
        src="./choras.jpg"
        alt="Choro „Sandora“ nariai kartu bažnyčioje"
        width="2048"
        height="2048"
      />
      <figcaption>
        <span>CHORAS „SANDORA“</span>
        <span>Skambame kartu.</span>
      </figcaption>
    </figure>
  );
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61594672354888",
    icon: (
      <path
        fill="currentColor"
        d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.3 1.2 16.2 1 15 1c-3 0-5 1.8-5 5v3H7v4h3v9Z"
      />
    ),
  },
  {
    name: "Instagram",
    href: "https://google.com",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </g>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/channel/UCV47HeuX8QplTtsz7Bs9IrQ",
    icon: (
      <>
        <rect x="2" y="5" width="20" height="14" rx="5" fill="currentColor" />
        <path d="m10 9 6 3-6 3Z" fill="var(--social-icon-background)" />
      </>
    ),
  }
];

function SocialLinks() {
  return (
    <nav className="social-links" aria-label="Socialiniai tinklai">
      {socialLinks.map(({ name, href, icon }) => (
        <a key={name} href={href} aria-label={name} title={name}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            {icon}
          </svg>
        </a>
      ))}
    </nav>
  );
}

function ContentPage({ page }) {
  return (
    <article className="page-content" aria-labelledby="page-title">
      <div className="page-heading">
        <a className="back-link" href="./index.html">
          ← Pradžia
        </a>
        <p className="eyebrow">CHORAS „SANDORA“</p>
        <h1 id="page-title">
          {page.label}
          <em>.</em>
        </h1>
        <div className="gold-rule" />
      </div>
      {page.id === "apie-mus" && (
        <div className="page-copy">
          <h2>Skirtingi balsai. Viena muzika.</h2>
          <p>
            Esame „Sandora“ — žmonės, kuriuos sujungia daina. Kuriame skambesį,
            kuriame kiekvienas balsas svarbus.
          </p>
          <p>Dainuoti. Jausti. Būti kartu.</p>
        </div>
      )}
      {page.id === "galerija" && 
      (
        <div className="page-copy">
          <p>Galerija bus paskelbta netrukus.</p>
        </div>
      )}
      {page.id === "kontaktai" && (
        <div className="page-copy">
          <h2>Susitikime muzikoje.</h2>
          <p>Gerb. Ponas Vardenis Pavardenis</p>
          <p>Choro vadovas</p>
          <p>+37061234567</p>
          <p>ChoroPonas@gmail.com</p>
        </div>
      )}
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
