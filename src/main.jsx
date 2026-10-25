import React, { useState, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

const sections = [
  { id: "apie-mus", label: "Apie mus" },
  { id: "galerija", label: "Galerija" },
  { id: "kontaktai", label: "Kontaktai" },
  { id: "renginiai", label: "Renginiai" },
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
          <div className="hero-introduction">
            <p>
              Esame „Sandora“ — žmonės, kuriuos sujungia daina.
              <br className="desktop" /> Kuriame skambesį, kuriame kiekvienas
              balsas svarbus.
            </p>
            <a className="event-link" href="./renginiai.html">
              Artimiausi renginiai
              <span aria-hidden="true">↗</span>
            </a>
          </div>
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
    href: "https://www.instagram.com/chorassandora/",
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
  },
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

const galleryVideos = ["zFxXZjmz-Ms", "-_OcyCtc5D4", "9i5UbPBU5ZQ"];

function Gallery() {
  return (
    <div className="gallery">
      <section className="gallery-section" aria-labelledby="videos-title">
        <h2 id="videos-title">Vaizdo įrašai</h2>
        <div className="video-grid">
          {galleryVideos.map((id, index) => (
            <figure className="video-card" key={id}>
              <iframe
                className="video-player"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${id}`}
                title={`Choro „Sandora“ vaizdo įrašas ${index + 1}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <figcaption>
                <a
                  href={`https://www.youtube.com/watch?v=${id}`}
                  aria-label={`Žiūrėti vaizdo įrašą ${index + 1} per YouTube`}
                ></a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className="gallery-section" aria-labelledby="photos-title">
        <h2 id="photos-title">Nuotraukos</h2>
        <p className="gallery-empty">Šiuo metu nuotraukų nėra</p>
      </section>
    </div>
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
          <p>
            Kamerinio choro „Sandora“ atliekamos pirmosios giesmės nuskambėjo
            Mažeikiuose, Šv. Pranciškaus Asyžiečio parapijoje. Choro pradžia
            siekia 2005 metus, kai atsikūrusioje parapijoje susibūrė Sumos
            choras. Nuo 2016 metų, vadovaujant Pauliui Poškui, kolektyvas
            kryptingai puoselėja chorinio giedojimo tradiciją – atlieka
            keturbalses lietuviškas ir lotyniškas sakralines giesmes. Daug laiko
            ir pastangų skiriama tam, kad kiekvienas kūrinys skambėtų darniai,
            būtų meniškai išpildytas ir klausytojui perteiktų muzikos prasmę bei
            emociją. Šiandien „Sandorą“ vienija 17 choristų. Greta sakralinės
            muzikos choras vis drąsiau plečia savo repertuarą ir pasaulietinės
            muzikos kūriniais, atrasdamas naujas skambesio spalvas ir atverdamas
            galimybes pasirodyti įvairesniuose kultūriniuose renginiuose bei
            koncertinėse erdvėse. Choras gieda atlaidų ir sakralinės muzikos
            festivalių metu, dalyvauja kultūriniuose renginiuose. 2025 metų
            vasarą „Sandora“ dalyvavo Plungės Šv. Jono Krikštytojo parapijos
            sakralinės muzikos festivalyje „Ave Maria Plungensis“, skirtame
            pagerbti iškilų vargonininką ir kompozitorių Juozą Žilevičių.
            „Sandora“ – tai bendrystėje gimstanti muzika, jungianti tradiciją ir
            naujus skambesius, sakralumą ir pasaulietinę muziką, o svarbiausia –
            žmones, kuriems dainavimas kartu yra daugiau nei muzika.
          </p>
          <p>Dainuoti. Jausti. Būti kartu.</p>
        </div>
      )}
      {page.id === "galerija" && <Gallery />}
      {page.id === "renginiai" && <Events />}
      {page.id === "kontaktai" && (
        <div className="page-copy">
          <h2>Susitikime muzikoje.</h2>
          <p>Paulius Poškus - Choro vadovas</p>
          <p>chorassandora@gmail.com</p>
          <p>+370 664 23223</p>
        </div>
      )}
    </article>
  );
}

function Events() {
  return (
    <section className="event" aria-labelledby="event-title">
      <figure className="event-poster">
        <img
          src="./albino-jasenausko-festivalis.jpg"
          alt="Albino Jasenausko sakralinės muzikos festivalio plakatas"
          width="1206"
          height="1707"
        />
      </figure>
      <div className="event-copy">
        <h2 id="event-title">🎶 Sakralinė muzika, kuri paliečia širdį...</h2>
        <p>
          Lapkričio 8 d. kviečiame į ypatingą muzikinę patirtį –{" "}
          <em>Albino Jasenausko sakralinės muzikos festivalį</em>, kuriame
          skambės ir Mažeikių kultūros centro kamerinio choro <em>„Sandora“</em>{" "}
          balsai.
        </p>
        <p>
          Džiaugiamės galėdami būti šio prasmingo muzikinio susitikimo dalimi ir
          dalintis tuo, kas mus vienija – meile muzikai, jos grožiui ir dvasinei
          gelmei.
        </p>
        <div className="event-participants">
          <p>✨ Festivalyje taip pat dalyvaus:</p>
          <p>🎼 Eglė Šeduikytė-Korienė – vargonininkė, muzikologė, pedagogė</p>
          <p>🎼 Jurga Šeduikytė – dainininkė, muzikos kūrėja</p>
        </div>
        <div className="event-details">
          <p>📍 Šv. Antano Paduviečio katedra, Telšiai</p>
          <p>📅 Lapkričio 8 d.</p>
          <p>🕐 13.00 val.</p>
        </div>
        <p className="event-invitation">
          <em>
            Kviečiame sustoti kasdienybės skuboje ir leisti muzikai prabilti į
            širdį.
          </em>{" "}
          🤍
        </p>
        <p>
          Su meile muzikai –
          <br />
          Mažeikių kultūros centro kamerinis choras „Sandora“
        </p>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")).render(<App />);
