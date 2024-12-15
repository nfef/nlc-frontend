 import axios from "axios";

export const API = axios.create({
   baseURL: 'https://api.newlevelcorporation.org/api'
});

// Ajouter cette fonction pour récupérer les candidats par catégorie
export const getCandidatesByCategory = (categoryId) => {
   return API.get(`categories/except/${categoryId}`);
};