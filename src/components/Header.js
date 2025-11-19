import React, { useEffect, useState, useRef } from 'react';
import '../styles.css';
import { scrollToSection } from '../pages/scrollUtils';
import menuIcon from '../images/menu.svg';
import upIcon from '../images/up.svg';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isSticky, setIsSticky] = useState(false);
  const [showUpArrow, setShowUpArrow] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const topPage = document.querySelector('.TopPage');
      if (topPage) {
        const topPageBottom = topPage.getBoundingClientRect().bottom;
        const scrolledPastTop = topPageBottom <= 0;

        setIsSticky(scrolledPastTop);
        setShowUpArrow(scrolledPastTop);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Make sure clicking the menu button itself doesn't trigger closing
      if (menuRef.current && !menuRef.current.contains(event.target) && event.target !== document.querySelector('.menu-btn img')) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen && window.scrollY < 200) {
      window.scrollTo({ top: 700, behavior: 'smooth' });
    }
    setMenuOpen(!menuOpen);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <header className={`header ${isSticky ? 'sticky' : ''}`}>

      {/* Hamburger Menu Button */}
      <button className="menu-btn" onClick={toggleMenu}>
        <img src={menuIcon} alt="Menu" />
      </button>

      {/* Navigation Links (Dropdown Menu) */}
      <nav ref={menuRef} className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <h4 onClick={() => { scrollToSection('events'); setMenuOpen(false); }}>{t('header_events')}</h4>
        <h4 onClick={() => { scrollToSection('pilots'); setMenuOpen(false); }}>{t('header_airports')}</h4>
        <h4 onClick={() => { scrollToSection('useful-links'); setMenuOpen(false); }}>{t('header_links')}</h4>
        <h4 onClick={() => { scrollToSection('atc-tools'); setMenuOpen(false); }}>{t('header_atctools')}</h4>
      </nav>

      {/* Language selectors */}
      <div className='language-selectors'>
        <img src='images/en.svg' onClick={() => changeLanguage('en')} />
        <img src='images/fi.svg' onClick={() => changeLanguage('fi')} />
        <img src='images/se.svg' onClick={() => changeLanguage('se')} />
      </div>

      {/* Up Arrow Button (Only Visible When Scrolled Down) */}
      {showUpArrow && (
        <img className="up-arrow" onClick={() => scrollToSection('top-page')} src={upIcon} alt="Up" />
      )}
    </header>
  );
};

export default Header;
