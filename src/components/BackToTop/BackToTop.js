import React, { useState, useEffect } from 'react';
import './BackToTop.scss';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Fonction pour vérifier la position de défilement
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <div className="back-to-top" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-8 8h6v8h4v-8h6z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default BackToTop;
