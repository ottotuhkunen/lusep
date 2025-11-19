import React from 'react';
import '../Styles/TopPage.css';
import { scrollToSection } from '../pages/scrollUtils';
import { useTranslation } from 'react-i18next';

const TopPage = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="TopPage">
      <div className="content">
        <div>
            <p>Suomi<br/>Finland</p>
            <p className='description'>{t('vatsca')}</p>
            <img onClick={() => scrollToSection('welcome')} className='TopPage-arrow' src='images/down.svg' />
        </div>
        <img src={'images/Finland.svg'} alt="Finland Map" className="finland-map" />
      </div>
    </footer>
  );
};

export default TopPage;
