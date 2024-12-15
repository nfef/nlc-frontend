import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCandidatesByCategory, API } from '../utils/api';
import CandidateCard from '../components/CandidateCard';
import './CategoryPage.scss';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await API.get(`categories/${categoryId}/candidates`);
        setCandidates(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="candidat-list">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Chargement en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="candidat-list">
      <div className="category-header">
        <button className="back-button" onClick={() => navigate('/')}>
          Retour à l'accueil
        </button>
        <h2>{candidates[0]?.categorie_libelle || 'Catégorie'}</h2>
      </div>

      {candidates.length > 0 ? (
        <div className="row">
          {candidates.map((candidate) => (
            <div key={candidate.id} className="col-md-4 col-sm-6 col-xs-12" style={{marginTop: 30}}>
              <CandidateCard candidate={candidate} />
            </div>
          ))}
        </div>
      ) : (
        <div className="no-candidates-container">
          <div className="no-candidates">
            <div className="no-candidates-icon">👑</div>
            <h3>Aucun candidat pour le moment</h3>
            <p>Les inscriptions pour cette catégorie sont en cours.</p>
            <p>Revenez bientôt pour découvrir nos magnifiques candidats !</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
