import React from 'react';
import '../Styles/Footer.css';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="footer">
      <p>{t('footer_sim_use_only')}</p>
      <div className="footer-content">
        <div className="footer-section">
          <h4>{t('footer_quick_links')}</h4>
          <ul>
            <li><a href="https://vatsim-scandinavia.org/">VATSIM Scandinavia</a></li>
            <li><a href="#/privacy-policy">{t('atclinks_policy')}</a></li>
            <li><a href="https://vatsim-scandinavia.org/about/contact/">{t('footer_contact_us')}</a></li>
            <li><a href="https://wiki.vatsim-scandinavia.org/books/training-documents/page/faq">FAQ</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t('footer_join_us')}</h4>
          <ul className="social-media">
            <li><a href="http://discord.vatsim-scandinavia.org/" target="_blank" rel="noopener noreferrer">Discord</a></li>
            <li><a href="https://events.vatsim-scandinavia.org/" target="_blank" rel="noopener noreferrer">{t('header_events')}</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>{t('footer_newsletter')}</h4>
          <p>{t('footer_newsletter_desc')}</p>
          <form>
            <input type="email" placeholder={t('footer_newsletter_disclamer')} id="email" autoComplete='on' />
            <button type="submit">{t('footer_newsletter_subscribe')}</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 Otto Tuhkunen. {t('footer_all_rights_reserved')}.</p>
      </div>
    </footer>
  );
};

export default Footer;
