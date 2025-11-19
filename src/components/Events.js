import React from 'react';
import '../Styles/Events.css';
import { useTranslation } from 'react-i18next';

const Events = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className="EventsPage">
        <div className="EventsPage-main">
          <img src={'images/wth-general.jpg'} alt="Welcome to HEL" className="wth-image" />
          <div className="text-content">
            <p style={{color:'#002ea2'}}>Welcome to HEL</p>
            <p className='description-title'>{t('wth_subtitle')}</p>
            <p className='description'>{t('wth_desc')}</p>
            <p className='description'>{t('wth_desc2')}</p>
            <p className='description-title'>
            {t('wth_desc3')} <a href='https://wth.lusep.fi/'>wth.lusep.fi</a>
            </p>
          </div>
        </div>
      </div>

      <div className="EventsPage">
        <div className="EventsPage-main">
          <img src={'images/lapland.jpg'} alt="Lapland Tuesdays" className="wth-image" />
          <div className="text-content">
            <p style={{color:'#002ea2'}}>Lapland Tuesdays</p>
            <p className='description-title'>{t('lapland_subtitle')}</p>
            <p className='description'>{t('lapland_desc')}</p>
            <p className='description'>{t('lapland_desc2')}</p>
          </div>
        </div>
      </div>

      <div className="EventsPage">
        <div className="EventsPage-main">
          <img src={'images/santa.png'} alt="Fly and See Santa" className="wth-image" />
          <div className="text-content">
            <p style={{color:'#002ea2'}}>Fly and See Santa</p>
            <p className='description-title'>{t('fss_subtitle')}</p>
            <p className='description'>{t('fss_desc')}</p>
          </div>
        </div>
      </div>

      <p className='other-events'>{t('other_events')} <a href='https://events.vatsim-scandinavia.org/'>events.vatsim-scandinavia.org</a>.</p>
    </>
  );
};

export default Events;
