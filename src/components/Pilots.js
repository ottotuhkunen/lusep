import React, { useState, useEffect } from 'react';
import '../Styles/Pilots.css';
import { useTranslation } from 'react-i18next';

const Airports = () => {
  const { t, i18n } = useTranslation();
  const [selectedIcao, setSelectedIcao] = useState('EFHK');
  const [notams, setNotams] = useState([]);
  const [metar, setMetar] = useState([]);

  const handleButtonClick = (icaoCode) => {
    setSelectedIcao(icaoCode);
    fetchNotams(icaoCode.split(' - ')[0]);
    fetchMetars(icaoCode.split(' - ')[0]);
  };

  useEffect(() => {
    fetchNotams('EFHK');
    fetchMetars('EFHK');
  }, []);

  const fetchNotams = async (icao) => {
    try {
      const response = await fetch('https://flyk.com/api/notams.json');
      const data = await response.json();
      const notamsForIcao = data.notams[icao] || [];
      const notamTexts = notamsForIcao.map(notam => notam.text);
      setNotams(notamTexts.length > 0 ? notamTexts : [(t('no_notams_found'))]);
    } catch (error) {
      console.error('Error fetching NOTAMs:', error);
      setNotams(["Error fetching NOTAMs"]);
    }
  };

  const fetchMetars = async (icao) => {
    try {
      const response = await fetch('https://flyk.com/api/metars.geojson');
      const data = await response.json();
      const metarsForIcao = data.features.filter(feature => feature.properties.code === icao);
      const metarTexts = metarsForIcao.map(metar => metar.properties.text);
      setMetar(metarTexts.length > 0 ? metarTexts : [""]);
    } catch (error) {
      console.error('Error fetching METARs:', error);
      setMetar(["Error fetching METARs"]);
    }
  };
  

  const getChartsUrl = (icao) => {
    return `https://aip.intor.fi/ad/${icao}.html` || '#';
  };

  const getBriefingUrl = (icao) => {
    const briefingUrls = {
      EFIV: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efiv-ivalo',
      EFJY: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efjy-jyvaskyla',
      EFKT: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efkt-kittila',
      EFHK: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/chapter/efhk-helsinki',
      EFKU: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efku-kuopio',
      EFOU: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efou-oulu',
      EFRO: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/efro-rovaniemi',
      EFTP: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/eftp-tampere-pirkkala',
      EFTU: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/eftu-turku',
      
      // AFIS
      EFET: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/aerodromes-with-afis',
      EFKI: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/aerodromes-with-afis',
      EFMI: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/aerodromes-with-afis',
      EFSA: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/aerodromes-with-afis',
      EFSI: 'https://wiki.vatsim-scandinavia.org/books/finnish-airports-charts/page/aerodromes-with-afis'
    };
    return briefingUrls[icao.split(' - ')[0]] || '#';
  };

  const getServiceType = (icao) => {

    const type1 = t('service_type1');
    const type2 = t('service_type2');
    const type3 = t('service_type3');
    const type4 = t('service_type4');
    const type5 = t('service_type5');

    const serviceTypes = {
      [type1]: 
        ['EFHA', 'EFJY', 'EFKU', 'EFOU', 'EFPO', 'EFRO', 'EFTP', 'EFTU', 'EFVA'],
      [type2]: 
        ['EFHK', 'EFKU'],
      [type3]:
        ['EFIV', 'EFMA', 'EFKE', 'EFKT', 'EFKS', 'EFJO', 'EFKK'],
      [type4]:
        ['EFLP', 'EFUT'],
      [type5]:
        ['EFET', 'EFKI', 'EFMI', 'EFSA', 'EFSI'],

    };
  
    const icaoCode = icao.split(' - ')[0];
  
    for (const [service, icaos] of Object.entries(serviceTypes)) {
      if (icaos.includes(icaoCode)) {
        return service;
      }
    }
  
    return '#';
  };
  
  const hasBriefing = (icao) => {
    const icaoWithBriefings = [
      'EFIV', 'EFJY', 'EFKT', 'EFHK', 'EFKU',
      'EFOU', 'EFRO', 'EFTP', 'EFTU', 'EFET',
      'EFKI', 'EFMI', 'EFSA', 'EFSI'
    ];
    return icaoWithBriefings.includes(icao.split(' - ')[0]);
  };  

  return (
    <div className="container">
      <div className="svg-container">
        <object type="image/svg+xml" data="images/finlandPilots.svg" width="100%" height="100%">
          Your browser does not support SVG
        </object>

        {/* EFHK */}
        <div className={`button-pilots ${selectedIcao.includes('EFHK') ? 'pulsing' : ''}`} style={{ bottom: '14%', left: '47%' }} onClick={() => handleButtonClick('EFHK')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFHK</span>
        </div>

        {/* EFTU */}
        <div className={`button-pilots ${selectedIcao.includes('EFTU') ? 'pulsing' : ''}`} style={{ bottom: '14%', left: '30.5%' }} onClick={() => handleButtonClick('EFTU')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFTU</span>
        </div>

        {/* EFMA */}
        <div className={`button-pilots ${selectedIcao.includes('EFMA') ? 'pulsing' : ''}`} style={{ bottom: '12%', left: '12%' }} onClick={() => handleButtonClick('EFMA')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFMA</span>
        </div>

        {/* EFPO */}
        <div className={`button-pilots ${selectedIcao.includes('EFPO') ? 'pulsing' : ''}`} style={{ bottom: '20%', left: '25%' }} onClick={() => handleButtonClick('EFPO')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFPO</span>
        </div>

        {/* EFTP */}
        <div className={`button-pilots ${selectedIcao.includes('EFTP') ? 'pulsing' : ''}`} style={{ bottom: '19.2%', left: '39%' }} onClick={() => handleButtonClick('EFTP')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFTP</span>
        </div>

        {/* EFUT */}
        <div className={`button-pilots ${selectedIcao.includes('EFUT') ? 'pulsing' : ''}`} style={{ bottom: '15.6%', left: '58%' }} onClick={() => handleButtonClick('EFUT')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFUT</span>
        </div>

        {/* EFLP */}
        <div className={`button-pilots ${selectedIcao.includes('EFLP') ? 'pulsing' : ''}`} style={{ bottom: '17.4%', left: '65%' }} onClick={() => handleButtonClick('EFLP')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFLP</span>
        </div>

        {/* EFMI */}
        <div className={`button-pilots ${selectedIcao.includes('EFMI') ? 'pulsing' : ''}`} style={{ bottom: '21%', left: '58%' }} onClick={() => handleButtonClick('EFMI')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFMI</span>
        </div>

        {/* EFSA */}
        <div className={`button-pilots ${selectedIcao.includes('EFSA') ? 'pulsing' : ''}`} style={{ bottom: '24%', left: '70%' }} onClick={() => handleButtonClick('EFSA')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFSA</span>
        </div>

        {/* EFJO */}
        <div className={`button-pilots ${selectedIcao.includes('EFJO') ? 'pulsing' : ''}`} style={{ bottom: '30%', left: '75%' }} onClick={() => handleButtonClick('EFJO')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFJO</span>
        </div>

        {/* EFKU */}
        <div className={`button-pilots ${selectedIcao.includes('EFKU') ? 'pulsing' : ''}`} style={{ bottom: '33%', left: '65%' }} onClick={() => handleButtonClick('EFKU')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKU</span>
        </div>

        {/* EFHA */}
        <div className={`button-pilots ${selectedIcao.includes('EFHA') ? 'pulsing' : ''}`} style={{ bottom: '24%', left: '46%' }} onClick={() => handleButtonClick('EFHA')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFHA</span>
        </div>

        {/* EFJY */}
        <div className={`button-pilots ${selectedIcao.includes('EFJY') ? 'pulsing' : ''}`} style={{ bottom: '28%', left: '52%' }} onClick={() => handleButtonClick('EFJY')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFJY</span>
        </div>

        {/* EFVA */}
        <div className={`button-pilots ${selectedIcao.includes('EFVA') ? 'pulsing' : ''}`} style={{ bottom: '32%', left: '26%' }} onClick={() => handleButtonClick('EFVA')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFVA</span>
        </div>

        {/* EFSI */}
        <div className={`button-pilots ${selectedIcao.includes('EFSI') ? 'pulsing' : ''}`} style={{ bottom: '29%', left: '32.4%' }} onClick={() => handleButtonClick('EFSI')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFSI</span>
        </div>

        {/* EFKK */}
        <div className={`button-pilots ${selectedIcao.includes('EFKK') ? 'pulsing' : ''}`} style={{ bottom: '37.6%', left: '34%' }} onClick={() => handleButtonClick('EFKK')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKK</span>
        </div>

        {/* EFOU */}
        <div className={`button-pilots ${selectedIcao.includes('EFOU') ? 'pulsing' : ''}`} style={{ top: '50.5%', left: '49%' }} onClick={() => handleButtonClick('EFOU')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFOU</span>
        </div>

        {/* EFKI */}
        <div className={`button-pilots ${selectedIcao.includes('EFKI') ? 'pulsing' : ''}`} style={{ top: '56.4%', left: '65%' }} onClick={() => handleButtonClick('EFKI')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKI</span>
        </div>

        {/* EFKS */}
        <div className={`button-pilots ${selectedIcao.includes('EFKS') ? 'pulsing' : ''}`} style={{ top: '41%', left: '72%' }} onClick={() => handleButtonClick('EFKS')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKS</span>
        </div>

        {/* EFKE */}
        <div className={`button-pilots ${selectedIcao.includes('EFKE') ? 'pulsing' : ''}`} style={{ top: '42.6%', left: '43.4%' }} onClick={() => handleButtonClick('EFKE')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKE</span>
        </div>

        {/* EFRO */}
        <div className={`button-pilots ${selectedIcao.includes('EFRO') ? 'pulsing' : ''}`} style={{ top: '35%', left: '53.4%' }} onClick={() => handleButtonClick('EFRO')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFRO</span>
        </div>

        {/* EFKT */}
        <div className={`button-pilots ${selectedIcao.includes('EFKT') ? 'pulsing' : ''}`} style={{ top: '25.8%', left: '43.5%' }} onClick={() => handleButtonClick('EFKT')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFKT</span>
        </div>

        {/* EFET */}
        <div className={`button-pilots ${selectedIcao.includes('EFET') ? 'pulsing' : ''}`} style={{ top: '19.4%', left: '35%' }} onClick={() => handleButtonClick('EFET')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFET</span>
        </div>

        {/* EFIV */}
        <div className={`button-pilots ${selectedIcao.includes('EFIV') ? 'pulsing' : ''}`} style={{ top: '15.5%', left: '61%' }} onClick={() => handleButtonClick('EFIV')}>
          <div className="dot-pilots"></div>
          <span className="icao-text">EFIV</span>
        </div>
        
      </div>
      <div className="text-container">
        {selectedIcao && (
          <>
            <p style={{color: "#002ea2", display: "inline-block"}}>{t(selectedIcao)}</p>
            {i18n.language === 'en' && (
              <img src='images/speaker.svg' alt='Speaker' className='speaker'
                onClick={() => {
                  const audio = new Audio(`./audio/${selectedIcao}.mp3`);
                  audio.play();
                }}
              />
            )}

            <div>
              <a href={getChartsUrl(selectedIcao)} target="_blank" rel="noopener noreferrer">
                <button className='button-26'>
                  {t('button_charts')}
                  <img src='images/charts.svg'></img>
                </button>
              </a>
              {hasBriefing(selectedIcao) && (
                <a href={getBriefingUrl(selectedIcao)} target="_blank" rel="noopener noreferrer">
                  <button className='button-26'>
                    {t('button_briefing')}
                    <img src='images/briefing.svg'></img>
                  </button>
                </a>            
              )}
            </div>

            <p className='normal-text'>{metar}</p>

            <p className='description-title' style={{marginTop: '0'}}>{t('service_type')}</p>
            <p className='normal-text'>{getServiceType(selectedIcao)}</p>
            <p className='description-title' style={{marginTop: '0'}}>NOTAM</p>
            <ul>
                {notams.map((notam, index) => (
                  <li key={index}>{notam}</li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Airports;
