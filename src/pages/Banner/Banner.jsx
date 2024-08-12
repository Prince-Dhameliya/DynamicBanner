import React, { useEffect, useState } from 'react';
import './Banner.css'
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/pen.svg'

export const Banner = ({ banner, isAdmin, user }) => {
  const [remainingTime, setRemainingTime] = useState(banner?.remainingTime ? banner.remainingTime : 0);
  const navigate = useNavigate();

  useEffect(() => {
      const interval = setInterval(() => {
        setRemainingTime(prev => Math.max(0, prev - 1000));
      }, 1000);
  
      return () => clearInterval(interval);
  }, [banner?.remainingTime]);

  if (!banner || remainingTime <= 0 || (!isAdmin && !banner.isVisible)) return null;

  function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function formatTime(milliseconds) {
      const totalSeconds = Math.floor(milliseconds / 1000);
      
      let year = new Date().getFullYear(); // Start from the current year
      let years = 0;
      let remainingSeconds = totalSeconds;

      while (remainingSeconds >= 0) {
          const daysInYear = isLeapYear(year) ? 366 : 365;
          const secondsInYear = daysInYear * 86400;
          
          if (remainingSeconds >= secondsInYear) {
              years++;
              remainingSeconds -= secondsInYear;
              year++;
          } else {
              break;
          }
      }

      const days = Math.floor(remainingSeconds / 86400);
      const hours = Math.floor((remainingSeconds % 86400) / 3600);
      const minutes = Math.floor((remainingSeconds % 3600) / 60);
      const seconds = remainingSeconds % 60;

      if (years > 0) {
          return `${years}y ${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
      } else if (days > 0) {
          return `${days}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
      } else {
          return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      }
  }

  return (
    <div key={banner.id} className="banner" style={{ backgroundImage: `url(${banner.link})` }}>
        {isAdmin && <img className="edit-banner-icon" src={EditIcon} alt='edit-banner' onClick={() => navigate(`/banner/${banner.id}`)} />}
        <div className="banner-content">
            <h2>{banner.description}</h2>
            <p>Time Remaining: {formatTime(remainingTime)}</p>
            <a href={banner.link} className="banner-link">Visit Link</a>
        </div>
    </div>
  );
};
