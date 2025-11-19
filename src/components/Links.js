import React from 'react';
import Button from './Button';
import '../styles.css';
import { useTranslation } from 'react-i18next';

import icon1 from '../images/discord.svg';
import icon2 from '../images/charts.svg';
import icon3 from '../images/books.svg';
import icon4 from '../images/icon-aip.svg';
import icon5 from '../images/charts.svg';
import icon6 from '../images/mic.svg';
import icon7 from '../images/study.svg';
import icon9 from '../images/icon9.svg';

const Links = () => {
  const { t, i18n } = useTranslation();

  const buttons = [
    { icon: icon1, url: 'http://discord.vatsim-scandinavia.org/', text: t('pilot_links_discord') },
    { icon: icon2, url: 'https://vatsim-radar.com/', text: t('pilot_links_vatsimmap') },
    { icon: icon5, url: 'https://flyk.com/', text: t('pilot_links_flyk') },
    { icon: icon3, url: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts', text: t('pilot_links_documents') },
    { icon: icon6, url: 'https://wiki.vatsim-scandinavia.org/books/lop-amY/page/ifr-flight-from-a-to-b', text: t('pilot_links_phraseology') },
    { icon: icon4, url: 'https://www.ais.fi/eaip/', text: t('pilot_links_aip') },
    { icon: icon9, url: 'https://www.ais.fi/sites/default/files/2023-11/Instructions%20for%20completing%20the%20FPL%2005NOV20_1.pdf', text: t('pilot_links_fplguide') },
    { icon: icon7, url: 'https://www.easa.europa.eu/en/document-library/easy-access-rules/easy-access-rules-standardised-european-rules-air-sera', text: t('pilot_links_sera') },
  ];

  return (
    <div className="home">
      <p style={{marginBottom: '40px', maxWidth: '800px'}}>
        {t('pilot_links_desc1')}<br/><br/>{t('pilot_links_desc2')} 
      </p>

      <div className="button-container" style={{paddingBottom: '40px'}}>
        {buttons.map((button, index) => (
          <Button key={index} icon={button.icon} url={button.url} text={button.text} />
        ))}
      </div>
    </div>
  );
};

export default Links;
