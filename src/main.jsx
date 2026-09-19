import React, {useState, useRef, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

const sections = ['TBD1', 'TBD2', 'TBD3', 'TBD4', 'TBD5'];
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

function App() {
  const [active, setActive] = useState(0);
  const header = useRef(null);
  useEffect(() => {
    let frame;
    const update = () => {
      const height = header.current.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-height', `${height}px`);
      const marker = height + Math.min(160, window.innerHeight * .2);
      let current = 0;
      sections.forEach((_, i) => {
        if (document.getElementById(`tbd${i + 1}`).getBoundingClientRect().top <= marker) current = i;
      });
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) current = 4;
      setActive(current);
    };
    const schedule = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(header.current);
    window.addEventListener('scroll', schedule, {passive: true});
    window.addEventListener('resize', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return <>
    <a className="skip-link" href="#tbd1">Pereiti prie turinio</a>
    <header ref={header} className="header"><div className="header-inner">
      <a className="brand" href="#tbd1" aria-label="Sandora — pradžia"><span className="brand-mark">s</span><span>SANDORA<small>CHORAS</small></span></a>
      <nav aria-label="Pagrindinė navigacija">
        {sections.map((label, i) => <a key={label} href={`#tbd${i + 1}`} className={active === i ? 'active' : ''} aria-current={active === i ? 'location' : undefined}>{label}</a>)}
        <span className="nav-indicator" aria-hidden="true" style={{transform: `translateX(${active * 100}%)`}} />
      </nav>
    </div></header>
    <main>
      <section id="tbd1" className="opening" aria-labelledby="title" tabIndex={-1}>
        <div className="hero">
          <div className="eyebrow"><span /> SUSITIKIME MUZIKOJE <span className="section-index">01 / 05</span></div>
          <div className="title-row"><h1 id="title">Skirtingi balsai.<br /><em>Viena muzika.</em></h1><div className="seal" aria-hidden="true"><span>CHORAS</span><b>S</b><span>SANDORA</span></div></div>
          <div className="hero-bottom"><p>Esame „Sandora“ — žmonės, kuriuos sujungia daina.<br className="desktop" /> Kuriame skambesį, kuriame kiekvienas balsas svarbus.</p><a className="scroll-cue" href="#tbd2">ATRASKITE DAUGIAU <span aria-hidden="true">↓</span></a></div>
        </div>
        <div className="music-panel" aria-label="Muzikinė kompozicija">
          <div className="staff" aria-hidden="true">{[0,1,2,3,4].map(i => <i key={i} style={{'--i': i}} />)}<span className="note note-one">♪</span><span className="note note-two">♫</span><span className="note note-three">♪</span></div>
          <span className="panel-caption">KAI BALSŲ DAUG, O JAUSMAS VIENAS.</span><p>Dainuoti.<br />Jausti.<br /><em>Būti kartu.</em></p><span className="panel-number" aria-hidden="true">01 — ∞</span>
        </div>
      </section>
      {sections.slice(1).map((label, i) => <section id={`tbd${i + 2}`} key={label} className={`content-section ${i % 2 === 0 ? 'light' : 'dark'}`} aria-labelledby={`heading-${i + 2}`} tabIndex={-1}>
        <div className="section-inner"><div className="section-meta"><span className="eyebrow">SANDORA / {label}</span><span className="large-number" aria-hidden="true">0{i + 2}</span></div>
          <div className="section-copy"><span className="eyebrow">SKIRTINGI BALSAI. VIENA MUZIKA.</span><h2 id={`heading-${i + 2}`}>{label}<span>.</span></h2><div className="gold-rule" /><p>{lorem}</p><p>{lorem}</p><span className="section-end">CHORAS „SANDORA“ <span aria-hidden="true">✦</span></span></div>
        </div>
      </section>)}
    </main>
    <footer><span className="footer-name">Sandora.</span><span>Skambame kartu.</span><small>© {new Date().getFullYear()} Choras „Sandora“</small></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App />);
