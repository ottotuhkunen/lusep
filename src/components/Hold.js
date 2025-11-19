import '../Styles/ContentPage.css';
import '../Styles/Pilots.css';
import holdSvg from '../images/hold.svg';
import { useTranslation } from 'react-i18next';

const Hold = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="ContentPage hold-page">
      <p className='description' style={{maxWidth: '400px'}}>
        {t('lusep_1')}<br/><br/>{t('lusep_2')}<br/><br/>{t('lusep_3')}<br/><br/>{t('lusep_4')}
        <a href='https://vatsim-scandinavia.org/' target="_blank" rel="noopener noreferrer">
          <img src='./images/vatsca.svg' style={{width: '120px', marginTop: '30px'}}/>
        </a>
        <a href='https://core.vateud.net/' target="_blank" rel="noopener noreferrer">
          <img src='./images/vateud.png' style={{width: '120px', margin: '8px 30px'}}/>
        </a>
      </p>
      <img src={holdSvg} alt="Hold" className="hold-image" />
    </div>
  );
};

export default Hold;
