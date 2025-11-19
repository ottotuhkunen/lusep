import React from 'react';
import '../styles.css';

const Button = ({ icon, url, text }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="button">
      <div style={{ height: '50px' }}>
        <img src={icon} alt={text} className="button-icon" />
      </div>
      <span>{text}</span>
    </a>
  );
};

export default Button;
