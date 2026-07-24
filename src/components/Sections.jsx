import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import ActionLink from './ActionLink.jsx';
import ImageWithFallback from './ImageWithFallback.jsx';

const exterior = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/fahrschule-kleve-gebaeude-ansicht-julians.jpg';
const theory = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/theorie-lounge-fahrschule-kleve-smartboard_2.jpg';
const simulator = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/fahrschule-kleve-lounge-simulator-training-1.jpg';
const reception = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/fahrschule-kleve-lounge-simulator-training_empfang.jpg';
const team = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/Team01.jpg';
const tabea = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/Personal_02.jpg';
const dreamy = 'https://julians-fahrschule.de/wp-content/uploads/2026/05/team-fahrschule-kleve-putzroboter-2.jpg';

const reveal = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

function Reveal({ children, className = '', delay = 0 }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22, margin: '0px 0px -8% 0px' }}
      transition={{ duration: reduced ? 0.2 : 0.65, delay: reduced ? 0 : delay, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ eyebrow, title, copy, icon = 'bi-signpost-2' }) {
  return (
    <div className="section-heading">
      <span className="eyebrow"><i className={`bi ${icon}`} aria-hidden="true" />{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  );
}

export function Hero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 160], [0, reduced ? 0 : 12]);
  const imageScale = useTransform(scrollY, [0, 160], [reduced ? 1 : 1.03, reduced ? 1 : 1.055]);
  const contentY = useTransform(scrollY, [0, 160], [0, reduced ? 0 : -8]);
  const bandY = useTransform(scrollY, [0, 160], [0, reduced ? 0 : -16]);
  const bandOpacity = useTransform(scrollY, [0, 160], [0.72, reduced ? 0.72 : 0.62]);
  const words = ['Deine', 'Fahrschule', 'in', 'Kleve!'];

  return (
    <motion.section id="start-hero" className="hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2, ease: 'linear' }}>
      <div className="hero-media">
        <div className="image-fallback hero-fallback"><i className="bi bi-speedometer" aria-hidden="true" /><span>Losfahren in Kleve</span></div>
        <motion.img
          src={exterior}
          alt="Gebäude von Julians Fahrschule in Kleve"
          style={{ y: imageY, scale: imageScale }}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.08, y: 10, filter: 'saturate(0.88) brightness(0.86)' }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1.03, y: 0, filter: 'saturate(1) brightness(0.92)' }}
          transition={{ duration: reduced ? 0.2 : 1.1, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
      </div>
      <div className="hero-vignette" />
      <motion.div className="hero-band" style={{ y: bandY, opacity: bandOpacity }} />
      <motion.div className="container hero-content" style={{ y: contentY }}>
        <div className="hero-copy">
          <motion.span className="hero-kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: reduced ? 0 : 0.16, duration: reduced ? 0.2 : 0.72 }}>
            <i className="bi bi-geo-alt" aria-hidden="true" /> Kleve · Ringstraße 35
          </motion.span>
          <h1 aria-label="Deine Fahrschule in Kleve!">
            {words.map((word, index) => (
              <span className="word-wrap" key={word}>
                <motion.span
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: '110%', rotate: 1 }}
                  animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, rotate: 0 }}
                  transition={{ duration: reduced ? 0.2 : 0.58, delay: reduced ? 0 : 0.18 + index * 0.07, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
                >{word}</motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0, y: reduced ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : 0.42, ease: reduced ? 'linear' : 'easeOut' }}>
            Dein Weg zum Führerschein beginnt hier – wir begleiten dich Schritt für Schritt bis zur bestandenen Prüfung.
          </motion.p>
          <motion.svg className="hero-roadline" viewBox="0 0 500 28" role="img" aria-label="Dekorative Fahrbahnlinie">
            <motion.path
              d="M4 14 C120 14 170 6 270 14 S410 22 496 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="12 10"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.46, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </motion.svg>
          <ActionLink href="https://fs1104.fso360-svc.de/" external icon="bi-pen">Direkt online anmelden</ActionLink>
        </div>
        <motion.aside
          className="hero-dashboard interactive"
          initial={{ opacity: 0, x: reduced ? 0 : 32, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.96 }}
          animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          transition={{ duration: reduced ? 0.2 : 0.72, delay: reduced ? 0 : 0.42, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
          whileHover={reduced ? {} : { y: -6, scale: 1.015, boxShadow: '0 26px 64px rgba(224,38,38,0.25)', borderColor: 'rgba(255,210,63,0.85)', backgroundColor: 'rgba(255,255,255,0.92)' }}
        >
          <span className="dashboard-icon"><i className="bi bi-speedometer" aria-hidden="true" /></span>
          <div><span>Dein nächster Schritt</span><strong>Ausbildung entdecken</strong></div>
          <a href="#ausbildung-overview" aria-label="Ausbildung entdecken"><i className="bi bi-chevron-right" aria-hidden="true" /></a>
        </motion.aside>
      </motion.div>
    </motion.section>
  );
}

export function RoadlineNavigator() {
  const reduced = useReducedMotion();
  const steps = [
    ['Anmeldung', 'Wir starten deinen Weg gemeinsam.', 'bi-person-check', '#contact-signup'],
    ['Theorie', 'Lernen in entspannter Lounge-Atmosphäre.', 'bi-journal-text', '#start-theorie-lounge'],
    ['Simulator', 'Schalten und Anfahren stressfrei üben.', 'bi-display', '#start-simulator'],
    ['Praxis', 'Sicher unterwegs auf zwei oder vier Rädern.', 'bi-car-front', '#ausbildung-overview'],
    ['Prüfung', 'Gut vorbereitet bis zum TÜV.', 'bi-award', '#faq-page']
  ];
  return (
    <section id="start-roadline-navigator" className="section road-section">
      <div className="mesh mesh-road" />
      <div className="container">
        <Reveal><SectionHeading eyebrow="Dein Weg" title="Schritt für Schritt zum Führerschein" copy="Von der Anmeldung bis zur Prüfung: Dein Weg bleibt klar und transparent." icon="bi-signpost-2" /></Reveal>
        <motion.div className="road-track interactive" drag={reduced ? false : 'x'} dragConstraints={{ left: -640, right: 0 }} dragElastic={0.08} whileTap={reduced ? {} : { scale: 0.99 }}>
          <motion.div className="road-connector" initial={{ scaleX: reduced ? 1 : 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: reduced ? 0 : 0.9, ease: 'easeOut' }} />
          {steps.map(([title, copy, icon, href], index) => (
            <motion.article
              className="road-card"
              key={title}
              initial={{ opacity: 0, x: reduced ? 0 : 30, y: reduced ? 0 : 16, scale: reduced ? 1 : 0.92 }}
              whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: reduced ? 0.2 : 0.58, delay: reduced ? 0 : index * 0.09, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }}
              whileHover={reduced ? {} : { y: -6, scale: 1.025, boxShadow: '0 18px 38px rgba(224,38,38,0.18)', borderColor: 'rgba(224,38,38,0.55)', backgroundColor: '#FFFDFC' }}
            >
              <span className="step-number">0{index + 1}</span>
              <motion.span className="card-icon" whileHover={reduced ? {} : { y: -3, rotate: -4, scale: 1.14, backgroundColor: 'rgba(255,210,63,0.28)' }}><i className={`bi ${icon}`} aria-hidden="true" /></motion.span>
              <h3>{title}</h3><p>{copy}</p><a className="text-link" href={href}>Mehr erfahren <i className="bi bi-arrow-right" aria-hidden="true" /></a>
              <span className="card-notch" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export function TheoryLounge() {
  return (
    <section id="start-theorie-lounge" className="section surface-section">
      <div className="surface-glow" />
      <div className="container split-grid">
        <div className="labeled-image">
          <ImageWithFallback src={theory} alt="Theorie-Lounge mit Smartboard" reveal="left" />
          <span className="corner-label">Theorie</span>
        </div>
        <Reveal className="content-surface" delay={0.14}>
          <SectionHeading eyebrow="Theorie & Lounge" title="Wohlfühlen statt Schulbank." icon="bi-journal-text" />
          <p>Unterricht mit bequemen Sesseln, 86″ Smartboard, WLAN und Powerbanks – modern, klar und ohne Theorie-Frust.</p>
          <blockquote>„Wir möchten, dass du gerne zu uns kommst – denn deine Motivation ist der halbe Führerschein.“</blockquote>
          <ActionLink href="#contact-signup" icon="bi-calendar-check">Termine & Anmeldung</ActionLink>
        </Reveal>
      </div>
    </section>
  );
}

export function Simulator() {
  const bullets = ['Stressfreier Einstieg', 'Schalten und Anfahren in Ruhe lernen', '100% optional, 100% effektiv'];
  return (
    <section id="start-simulator" className="section tech-section">
      <div className="tech-grid" />
      <div className="container split-grid split-reverse-mobile">
        <Reveal className="sim-copy">
          <SectionHeading eyebrow="High-Tech Simulator" title="Routine, bevor es auf die Straße geht." copy="Unser Motion-Simulator macht den Einstieg entspannt und verständlich." icon="bi-display" />
          <ul className="feature-list">
            {bullets.map((item) => <li key={item}><i className="bi bi-lightning-charge" aria-hidden="true" /><span>{item}</span></li>)}
          </ul>
          <ActionLink href="#ausbildung-simulator-detail" variant="secondary">Simulator entdecken</ActionLink>
        </Reveal>
        <div className="sim-visual">
          <ImageWithFallback src={simulator} alt="Lounge und Simulator bei Julians Fahrschule" />
          <div className="sim-inset gradient-inset"><i className="bi bi-display" aria-hidden="true" /><span>Motion-Simulator</span></div>
        </div>
      </div>
    </section>
  );
}

export function TeamIntro() {
  return (
    <section id="start-team" className="section team-intro-section">
      <div className="team-blob" />
      <div className="container">
        <Reveal><SectionHeading eyebrow="Lounge Feeling & Team" title="Fahrlehrer aus Leidenschaft." copy="Ein junges, motiviertes Team, moderne Technik und Lernen ohne Druck – aber mit viel Fahrfreude." icon="bi-people" /></Reveal>
        <div className="team-mosaic">
          <ImageWithFallback src={team} alt="Julian von Julians Fahrschule" className="mosaic-main" />
          <Reveal className="mosaic-copy" delay={0.1}>
            <i className="bi bi-emoji-smile" aria-hidden="true" />
            <h3>Persönlich statt unpersönlich.</h3>
            <p>Menschen, die ihren Job lieben, begleiten dich mit Geduld, Humor und Fachwissen.</p>
            <ActionLink href="#team-grid" variant="outline" icon="bi-people">Ganzes Team ansehen</ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MapCard() {
  return (
    <motion.div className="map-card interactive" whileHover={{ y: -5, scale: 1.012, borderColor: 'rgba(224,38,38,0.50)', boxShadow: '0 18px 42px rgba(224,38,38,0.16)' }} transition={{ duration: 0.26, ease: 'easeOut' }}>
      <div className="map-grid" aria-hidden="true"><span className="route route-one" /><span className="route route-two" /></div>
      <span className="pin-pulse" /><span className="map-pin"><i className="bi bi-geo-alt-fill" aria-hidden="true" /></span>
      <div className="map-label"><strong>Julians Fahrschule</strong><span>Ringstraße 35 · 47533 Kleve</span></div>
    </motion.div>
  );
}

export function Location() {
  return (
    <section id="start-location" className="section location-section">
      <div className="container">
        <Reveal><SectionHeading eyebrow="Standort" title="Schau gerne unverbindlich vorbei." icon="bi-geo-alt" /></Reveal>
        <div className="location-grid">
          <div className="location-photo-card">
            <ImageWithFallback src={exterior} alt="Außenansicht von Julians Fahrschule" />
            <div className="location-details"><i className="bi bi-clock" aria-hidden="true" /><span>Ringstraße 35<br />47533 Kleve</span></div>
          </div>
          <Reveal delay={0.12}><MapCard /><ActionLink href="https://www.google.com/maps/search/?api=1&query=Ringstra%C3%9Fe+35%2C+47533+Kleve" external icon="bi-compass">Route planen</ActionLink></Reveal>
        </div>
      </div>
    </section>
  );
}

const faqItems = [
  ['Welche Ausbildung bietet ihr an?', 'Bei uns findest du Ausbildung für Auto, Motorrad und begleitetes Fahren ab 17 Jahren.'],
  ['Wie läuft die Theorie ab?', 'Der Unterricht findet in entspannter Lounge-Atmosphäre mit 86″ Smartboard, WLAN und modernen Lernmaterialien statt.'],
  ['Ist der Simulator verpflichtend?', 'Nein. Das Simulator-Training ist 100% optional und ermöglicht einen stressfreien Einstieg in Schalten und Anfahren.'],
  ['Wie behalte ich den Überblick?', 'Termine, Lernstand und Zahlungen kannst du in Echtzeit über die App verfolgen.'],
  ['Bietet ihr klassische Intensivkurse an?', 'Nein. Statt starrer Blockkurse setzt Julians Fahrschule auf eine flexible, individuell passende und transparente Ausbildung.']
];

export function FAQSection({ id, compact = false }) {
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotion();
  const items = compact ? faqItems.slice(0, 3) : faqItems;
  return (
    <section id={id} className="section faq-section">
      <div className="faq-glow" />
      <div className="container narrow-container">
        <Reveal><SectionHeading eyebrow="FAQ" title={compact ? 'Was du vorab wissen willst' : 'Häufige Fragen'} copy="Kurz, klar und in Ruhe nachlesen." icon="bi-question-circle" /></Reveal>
        <div className="accordion">
          {items.map(([question, answer], index) => {
            const active = open === index;
            return (
              <motion.article className={`accordion-item ${active ? 'is-open' : ''}`} key={question} initial={{ opacity: 0, y: reduced ? 0 : compact ? -14 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: reduced ? 0.2 : 0.5, delay: reduced ? 0 : index * 0.06 }}>
                <button type="button" aria-expanded={active} onClick={() => setOpen(active ? -1 : index)}>
                  <span>{question}</span><motion.i className="bi bi-chevron-down" aria-hidden="true" animate={{ rotate: active && !reduced ? 180 : 0 }} transition={{ duration: reduced ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }} />
                </button>
                <AnimatePresence initial={false}>
                  {active ? <motion.div className="accordion-panel" initial={{ height: reduced ? 'auto' : 0, opacity: reduced ? 1 : 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: reduced ? 'auto' : 0, opacity: reduced ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}><p>{answer}</p></motion.div> : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
        <a className="text-link faq-contact" href="#contact-signup">Noch eine Frage? Kontakt aufnehmen <i className="bi bi-arrow-right" aria-hidden="true" /></a>
      </div>
    </section>
  );
}

export function FinalCTA() {
  const reduced = useReducedMotion();
  return (
    <section id="start-final-cta" className="section final-cta-section">
      <motion.div className="container final-band interactive" initial={{ opacity: 0, y: reduced ? 0 : 44, scale: reduced ? 1 : 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: reduced ? 0.2 : 0.68, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }} whileHover={reduced ? {} : { y: -3, scale: 1.008, boxShadow: '0 26px 58px rgba(224,38,38,0.22)', borderColor: 'rgba(255,210,63,0.45)' }}>
        <div className="cta-icon"><i className="bi bi-pen" aria-hidden="true" /></div>
        <div><span className="eyebrow inverted">Bereit für deinen nächsten Meilenstein?</span><h2>Dein Weg zum Führerschein beginnt hier.</h2></div>
        <ActionLink href="https://fs1104.fso360-svc.de/" external variant="accent">Anmeldung starten</ActionLink>
      </motion.div>
    </section>
  );
}

export function TrainingOverview() {
  const cards = [
    ['Theorie', 'Wohlfühlen statt Schulbank – modern lernen mit Smartboard.', 'bi-journal-text', '#ausbildung-theorie-detail'],
    ['Simulator', 'Schalten und Anfahren optional und stressfrei trainieren.', 'bi-display', '#ausbildung-simulator-detail'],
    ['Praxis', 'Mit Struktur und echter Planbarkeit sicher unterwegs.', 'bi-car-front', '#contact-signup']
  ];
  return (
    <section id="ausbildung-overview" className="section overview-section">
      <div className="direction-lines" />
      <div className="container">
        <Reveal><SectionHeading eyebrow="Deine Ausbildung" title="Deine Freiheit. Dein Weg." copy="Fundierte Ausbildung, moderne Technik und keine Massenabfertigung." icon="bi-signpost-2" /></Reveal>
        <div className="three-grid">
          {cards.map(([title, copy, icon, href], index) => <Reveal key={title} delay={index * 0.1}><motion.article className="sign-card interactive" whileHover={{ y: -7, rotate: -0.5, scale: 1.02, borderColor: 'rgba(224,38,38,0.55)', backgroundColor: '#FFFDF9', boxShadow: '0 20px 42px rgba(224,38,38,0.18)' }}><span className="card-icon"><i className={`bi ${icon}`} aria-hidden="true" /></span><h3>{title}</h3><p>{copy}</p><a className="text-link" href={href}>Zur Detailsektion <i className="bi bi-arrow-right" aria-hidden="true" /></a><span className="card-notch" /></motion.article></Reveal>)}
        </div>
      </div>
    </section>
  );
}

export function TheoryDetail() {
  const points = ['Theorieunterricht in entspannter Lounge-Atmosphäre', 'Unterricht mit 86″ Smartboard', 'WLAN und Powerbanks vor Ort', 'Lernstand und Termine digital im Blick'];
  return (
    <section id="ausbildung-theorie-detail" className="section detail-section">
      <div className="green-glow" />
      <div className="container split-grid">
        <div className="captioned-image"><ImageWithFallback src={theory} alt="Moderner Theorieraum mit Smartboard" reveal="left" /><span>Moderne Theorie in Kleve</span></div>
        <Reveal delay={0.12}>
          <SectionHeading eyebrow="Theorie im Detail" title="Klar lernen, entspannt ankommen." icon="bi-calendar-check" />
          <ul className="check-list">{points.map((point) => <motion.li key={point} whileHover={{ x: 5, scale: 1.01, backgroundColor: 'rgba(46,125,50,0.07)', borderColor: 'rgba(46,125,50,0.28)', boxShadow: '0 6px 16px rgba(46,125,50,0.08)' }}><i className="bi bi-check2-circle" aria-hidden="true" /><span>{point}</span></motion.li>)}</ul>
          <ActionLink href="#faq-page" variant="outline" icon="bi-question-circle">Fragen zur Ausbildung</ActionLink>
        </Reveal>
      </div>
    </section>
  );
}

export function SimulatorDetail() {
  return (
    <section id="ausbildung-simulator-detail" className="section simulator-detail-section">
      <div className="tech-glow" />
      <div className="container split-grid split-reverse-mobile">
        <Reveal>
          <SectionHeading eyebrow="Deine sichere Generalprobe" title="High-Tech, die dir Sicherheit gibt." copy="Lerne Schalten und Anfahren in Ruhe an unserem Motion-Simulator – optional und effektiv." icon="bi-shield-check" />
          <div className="label-grid"><motion.div className="label-card" whileHover={{ y: -5, scale: 1.025, borderColor: 'rgba(255,210,63,0.90)', backgroundColor: '#FFFCED', boxShadow: '0 16px 34px rgba(255,210,63,0.24)' }}><i className="bi bi-display" aria-hidden="true" /><strong>Simulator</strong><span>Moderner Einstieg</span></motion.div><motion.div className="label-card" whileHover={{ y: -5, scale: 1.025, borderColor: 'rgba(255,210,63,0.90)', backgroundColor: '#FFFCED', boxShadow: '0 16px 34px rgba(255,210,63,0.24)' }}><i className="bi bi-shield-check" aria-hidden="true" /><strong>Sicherheit</strong><span>Stressfrei üben</span></motion.div></div>
          <ActionLink href="#contact-signup">Zur Anmeldung</ActionLink>
        </Reveal>
        <div className="underlined-image"><ImageWithFallback src={reception} alt="Empfang und Simulatorbereich der Fahrschule" /><span /></div>
      </div>
    </section>
  );
}

export function TeamGrid() {
  const members = [
    ['Julian', 'Inhaber & Fahrlehrer', 'Seit 2018 Fahrlehrer in zweiter Generation. Mit ruhiger Art, Geduld und fundiertem Fachwissen.', team],
    ['Tabea', 'Organisation & Anmeldung', 'Deine erste Anlaufstelle für Fragen rund um Anmeldung und Behördengänge.', tabea],
    ['Dreamy', 'Putzroboter & Hygiene', 'Spezialisiert auf saubere Böden – nass und trocken.', dreamy]
  ];
  return (
    <section id="team-grid" className="section team-grid-section">
      <div className="red-blob" />
      <div className="container">
        <Reveal><SectionHeading eyebrow="Die Gesichter dahinter" title="Das Team hinter Julians Fahrschule" copy="Menschen, die ihren Job lieben – mit Geduld, Humor und Fachwissen." icon="bi-people" /></Reveal>
        <div className="three-grid team-cards">
          {members.map(([name, role, bio, image], index) => (
            <motion.article className="team-card interactive" key={name} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.6, delay: index * 0.085, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -7, rotate: -0.5, scale: 1.02, borderColor: 'rgba(224,38,38,0.50)', boxShadow: '0 20px 44px rgba(224,38,38,0.17)' }}>
              <ImageWithFallback src={image} alt={`${name} – ${role}`} />
              <div className="team-card-copy"><span>{role}</span><h3>{name}</h3><p>{bio}</p><a className="text-link" href="#contact-signup">Kontakt <i className="bi bi-chat-dots" aria-hidden="true" /></a></div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function LocationDetail() {
  return (
    <section id="standort-detail" className="section location-detail-section">
      <div className="container">
        <Reveal><SectionHeading eyebrow="Hier findest du uns" title="Mitten in Kleve, klar zu finden." copy="Besuche uns gerne unverbindlich in der Ringstraße 35." icon="bi-compass" /></Reveal>
        <div className="location-detail-grid">
          <div><ImageWithFallback src={exterior} alt="Julians Fahrschule an der Ringstraße in Kleve" reveal="left" /><span className="transport-chip"><i className="bi bi-geo-alt" aria-hidden="true" /> Ringstraße 35 · 47533 Kleve</span></div>
          <div className="sticky-map"><MapCard /><div className="waypoints"><div><i className="bi bi-geo-alt" aria-hidden="true" /><span><strong>Ziel</strong>Julians Fahrschule</span></div><div><i className="bi bi-compass" aria-hidden="true" /><span><strong>Adresse</strong>Ringstraße 35, Kleve</span></div></div><ActionLink href="https://www.google.com/maps/search/?api=1&query=Ringstra%C3%9Fe+35%2C+47533+Kleve" external icon="bi-compass">Route planen</ActionLink></div>
        </div>
      </div>
    </section>
  );
}

export function ContactSignup() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 18]);
  const [message, setMessage] = useState('');
  const submit = (event) => {
    event.preventDefault();
    setMessage('Bitte nutze die Online-Anmeldung oder sende deine Anfrage an info@julians-fahrschule.de.');
  };
  return (
    <section id="contact-signup" className="section signup-section">
      <div className="signup-background">
        <div className="image-fallback signup-fallback"><i className="bi bi-envelope" aria-hidden="true" /></div>
        <motion.img src={reception} alt="Empfang von Julians Fahrschule" style={{ y: photoY }} initial={{ opacity: 0, scale: reduced ? 1 : 1.08, filter: reduced ? 'blur(8px) saturate(0.9)' : 'blur(12px) saturate(0.8)' }} whileInView={{ opacity: 0.18, scale: reduced ? 1 : 1.03, filter: 'blur(8px) saturate(0.9)' }} viewport={{ once: true }} transition={{ duration: reduced ? 0.2 : 1, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }} onError={(event) => { event.currentTarget.style.display = 'none'; }} />
      </div>
      <div className="signup-overlay" />
      <div className="warm-glow" />
      <motion.div className="container signup-card interactive" initial={{ opacity: 0, y: reduced ? 0 : 34, scale: reduced ? 1 : 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.18 }} transition={{ duration: reduced ? 0.2 : 0.68, ease: reduced ? 'linear' : [0.16, 1, 0.3, 1] }} whileHover={reduced ? {} : { y: -4, scale: 1.008, borderColor: 'rgba(224,38,38,0.42)', boxShadow: '0 26px 58px rgba(224,38,38,0.17)', backgroundColor: 'rgba(255,255,255,0.97)' }}>
        <SectionHeading eyebrow="Anmeldung starten" title="Dein Führerschein beginnt mit dem ersten Schritt." copy="Melde dich direkt online an oder schick uns eine kurze Nachricht." icon="bi-pen" />
        <form onSubmit={submit}>
          <label><span>Name</span><input type="text" name="name" autoComplete="name" required /></label>
          <label><span>E-Mail</span><input type="email" name="email" autoComplete="email" required /></label>
          <label><span>Deine Nachricht</span><textarea name="message" rows="4" required /></label>
          <motion.button className="button button-primary form-submit" type="submit" whileHover={reduced ? {} : { y: -2, scale: 1.03, boxShadow: '0 14px 32px rgba(224,38,38,0.38)', backgroundColor: '#C91F1F' }} whileTap={reduced ? {} : { scale: 0.97 }}><span>Nachricht vorbereiten</span><i className="bi bi-envelope" aria-hidden="true" /></motion.button>
          {message ? <p className="form-message" role="status">{message}</p> : null}
          <p className="privacy-note">Für die direkte Anmeldung wirst du zum Online-Anmeldedienst weitergeleitet. Hinweise zur Verarbeitung findest du im Datenschutz.</p>
          <ActionLink href="https://fs1104.fso360-svc.de/" external icon="bi-arrow-right">Direkt online anmelden</ActionLink>
        </form>
      </motion.div>
    </section>
  );
}
