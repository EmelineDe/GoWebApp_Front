import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // Remplacez par votre URL d'API
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Vous pouvez ajouter des tokens d'authentification ici
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Gestion des erreurs
    if (error.response) {
      // Le serveur a répondu avec un code d'état d'erreur
      console.error("Erreur de réponse:", error.response.data);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error("Pas de réponse reçue:", error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error("Erreur de configuration:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
