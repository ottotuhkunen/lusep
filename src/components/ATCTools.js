import React from 'react';
import Button from './Button';
import '../styles.css';
import { useTranslation } from 'react-i18next';

import icon1 from '../images/icon1.svg';
import icon2 from '../images/icon2.svg';
import icon3 from '../images/icon-lara.png';
import icon4 from '../images/icon4.svg';
import icon5 from '../images/icon5.svg';
import icon6 from '../images/icon6.svg';
import icon7 from '../images/icon7.svg';
import icon8 from '../images/icon8.svg';

const ATCTools = () => {
  const { t, i18n } = useTranslation();
  
  const buttons = [
    { icon: icon1, url: 'https://wx.lusep.fi/', text: t('atclinks_awos') },
    { icon: icon2, url: 'https://rcr.lusep.fi/', text: t('atclinks_rcr') },
    { icon: icon3, url: 'https://lara.lusep.fi/', text: t('atclinks_lara') },
    { icon: icon4, url: 'https://ice.lusep.fi/', text: t('atclinks_ice') },
    { icon: icon5, url: 'https://sectors.lusep.fi/', text: t('atclinks_sectors') },
    { icon: icon6, url: 'https://wth.lusep.fi/', text: t('atclinks_wthstats') },
    { icon: icon7, url: 'http://gid.lusep.fi/', text: t('atclinks_gid') },
    { icon: icon8, url: '#/privacy-policy', text: t('atclinks_policy') }
  ];

  return (
    <div className="home" style={{background: 'white'}}>
      <p style={{marginBottom: '40px'}}>{t('atc_doc_available_at')} <a target="_blank" rel="noopener noreferrer" href='https://wiki.vatsim-scandinavia.org/shelves/atc-finland'>wiki.vatsim-scandinavia.org</a>.</p>
      <div className="button-container">
        {buttons.map((button, index) => (
          <Button key={index} icon={button.icon} url={button.url} text={button.text} />
        ))}
      </div>
      <p>{t('atc_doc_authentication')}</p>
    </div>
  );
};

export default ATCTools;
