import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../utils/api';
import './HomePage.scss';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await API.get('/categories/except/21');
        setCategories(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="home-page">
      <div className="title-container">
        <h1 className="sliding-title"></h1>
      </div>
      <div className="subtitle">
        <div className="crown">👑</div>
        <h2>AWARDS DES CONCOURS DE BEAUTÉ, MISS, MISTERS, MANNEQUINS INTERNATIONAL, PHOTOGRAPHES, STYLISTES-MODELISTES, AGENCES DE MANNEQUINAT ET ENTREPRENEURS</h2>
        <br/><br/>
        <p>Découvrez nos magnifiques nominés et votez pour votre favori !</p>
      </div>
      <div className="view-all-link">
        {/* <button onClick={() => navigate('/all-candidates')}>
          Voir toutes les candidats
        </button> */}
      </div>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="category-content">
              <h3>{category.libelle}</h3>
              <p>{category.description}</p>
              <span className="view-candidates">Voir les nominés →</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
