import React from 'react';
import Header from './components/Header.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import {
  Hero,
  RoadlineNavigator,
  TheoryLounge,
  Simulator,
  TeamIntro,
  Location,
  FAQSection,
  FinalCTA,
  TrainingOverview,
  TheoryDetail,
  SimulatorDetail,
  TeamGrid,
  LocationDetail,
  ContactSignup
} from './components/Sections.jsx';

export default function App() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <Header />
      <CustomCursor />
      <main id="main-content">
        <Hero />
        <RoadlineNavigator />
        <TheoryLounge />
        <Simulator />
        <TeamIntro />
        <Location />
        <FAQSection id="start-faq" compact />
        <FinalCTA />
        <TrainingOverview />
        <TheoryDetail />
        <SimulatorDetail />
        <TeamGrid />
        <LocationDetail />
        <FAQSection id="faq-page" />
        <ContactSignup />
      </main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <a className="brand brand-footer" href="#start-hero" aria-label="Julians Fahrschule Startseite">
              <span className="brand-mark">J</span>
              <span>Julians Fahrschule</span>
            </a>
            <p>Deine Fahrschule in Kleve.</p>
          </div>
          <address>
            <strong>Julians Fahrschule</strong><br />
            Inhaber: Julian Kamzol<br />
            Ringstraße 35<br />
            47533 Kleve
          </address>
          <div>
            <a href="mailto:info@julians-fahrschule.de">info@julians-fahrschule.de</a><br />
            <a href="tel:+4915125231761">0151 25231761</a><br />
            <a href="https://julians-fahrschule.de/impressum/">Impressum</a><br />
            <a href="https://julians-fahrschule.de/datenschutz/">Datenschutz</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
