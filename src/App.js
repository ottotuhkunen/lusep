import React, { useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import ATCTools from './components/ATCTools';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Footer from './components/Footer';
import Header from './components/Header';
import TopPage from './components/TopPage';
import ContentPage from './components/ContentPage';
import Events from './components/Events';
import Pilots from './components/Pilots';
import Links from './components/Links';
import Hold from './components/Hold';
import './styles.css';
import './fonts.css';
import './i18n';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="app">
      <div id="top-page">
        <TopPage />
      </div>

      <Header />
      
      <ContentPage id="welcome" />

      <h3 className="title" id="events">{t('title_events')}</h3>
      <Events />

      <h3 className="title title-2" style={{ paddingBottom: "20px" }} id="pilots">{t('title_airports')}</h3>
      <Pilots />

      <h3 className="title" id="useful-links" style={{ paddingTop: "60px" }}>{t('title_links')}</h3>
      <Links />

      <h3 className="title title-2" style={{ color: "white", background: "linear-gradient(90deg, #00154b, #002ea2)" }}>{t('title_lusep')}</h3>
      <Hold />

      <h3 className="title title-2" id="atc-tools">{t('title_atctools')}</h3>
      <ATCTools />

      <Footer />
    </div>
  );
};


const App = () => { 
  const { i18n } = useTranslation();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(savedLanguage);
  }, [i18n]);
   
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </Router>
  );
};

export default App;
