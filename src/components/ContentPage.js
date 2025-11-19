import React, { useEffect, useState } from 'react';
import '../Styles/ContentPage.css';
import '../Styles/Pilots.css';
import { useTranslation } from 'react-i18next';
import atcData from '../pages/atc.json';

const ContentPage = () => {
  const { t, i18n } = useTranslation();
  const [controllers, setControllers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchControllers = async () => {
      try {
        const response = await fetch('https://data.vatsim.net/v3/vatsim-data.json');
        const data = await response.json();
        
        const onlineControllers = data.controllers
          .filter(controller => controller.callsign.startsWith('EF'))
          .map(controller => {
            const parts = controller.callsign.split('_');
            const ad = parts[0];
            const type = parts[parts.length - 1];
            const suffix = parts.length > 2 ? parts.slice(1, -1).join('_') : "";
            
            const match = atcData.find(entry => 
              
              entry.ad === ad &&
              entry.type === type &&
              (entry.suffix ? suffix.includes(entry.suffix) : suffix === "")
            );
            
            if (match) {
              return {
                ...match,
                login: controller.callsign.replace(/_/g, ' '),
              };
            }
            return null;
          })
          .filter(Boolean);
        
        setControllers(onlineControllers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching controllers:', error);
        setLoading(false);
      }
    };

    fetchControllers();
  }, []);

  return (
    <div id={'welcome'} className="ContentPage">
      <div className="content-main">
        <div className="text-content">
          <p className='description-title'>{t('intro_heading')}</p>
          <p className='description'>{t('intro_content')}</p>
          <p className='description-title'>68 {t('xx_active_controllers')}</p>
          <p className='description' style={{marginBottom: '10px'}}>
            {t('join_atc_team')} <a href='https://cc.vatsim-scandinavia.org/'>cc.vatsim-scandinavia.org</a>.
          </p>
          <div style={{ textAlign: 'left' }}>
            <a href='https://wiki.vatsim-scandinavia.org/books/getting-started' target="_blank" rel="noopener noreferrer">
              <button className='button-26'>{t('ATC_Training_Program')}</button>
            </a>
            <a href='https://wiki.vatsim-scandinavia.org/books/getting-started-AVr/chapter/joining-vatsim-scandinavia' target="_blank" rel="noopener noreferrer">
              <button className='button-26'>{t('Join_VATSIM_Scandinavia')}</button>
            </a>
          </div>

          <p className='description-title' style={{color: '#002ea2', marginTop: '10px'}}>
            <img src='images/online.svg' style={{verticalAlign: 'bottom', paddingRight: '10px'}}/>
            {t('Currently_Online')}
          </p>
          {loading ? (
            <p className='description'>{t('loading')}</p>
          ) : controllers.length > 0 ? (
            <div className="controller-table-container">
              <table className="controller-table">
                <thead>
                  <tr>
                    <th>{t('Position')}</th>
                    <th>{t('Call sign')}</th>
                    <th>{t('Type of Service')}</th>
                  </tr>
                </thead>
                <tbody>
                  {controllers.map((controller, index) => (
                    <tr key={index} className="controller-row">
                      <td>{controller.ad}{controller.suffix ? ` ${controller.suffix}` : ''} {controller.type}</td>
                      <td>
                        {controller.cs}
                      </td>
                      <td>{controller.service}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='description'>{t('none_online')} <a href='https://cc.vatsim-scandinavia.org/booking' target="_blank" rel="noopener noreferrer">{t('here')}</a>!</p>
          )}
        </div>
      </div>
      <div className='clouds'></div>
      <div className='airplane'>
        <img src='./images/airplane.png' alt="Airplane" />
      </div>
    </div>
  );
};

export default ContentPage;