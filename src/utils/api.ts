/**
 * @fileoverview API centralisée pour communiquer avec le backend
 * @module api
 */

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Récupère la première question d'une catégorie donnée.
 * @param {string} category - La catégorie de la question.
 * @returns {Promise} Promise résolue avec la première question.
 */

export const fetchFirstQuestion = (category: string) =>
  api.get(`/questions/first/${category}`);

/**
 * Récupère une question par son identifiant.
 * @param {number} id - L'identifiant de la question.
 * @returns {Promise} Promise résolue avec la question.
 */

export const fetchQuestionById = (id: number) => api.get(`/questions/${id}`);

/**
 * Récupère la prochaine question d'une réponse donnée.
 * @param {number} answerId - L'identifiant de la réponse.
 * @returns {Promise} Promise résolue avec la prochaine question.
 */

export const fetchNextQuestionFromAnswer = (answerId: number) =>
  api.get(`/answers/${answerId}/next`);

export const createUser = (userData: {
  firstName: string;
  lastName: string;
  address: string;
  zipCode: string;
  phoneNumber: string;
  email: string;
  paymentMethod: "online" | "in-person";
}) => api.post("/user", userData);

/**
 * Crée un utilisateur et ses réponses.
 * @param {Object} payload - Les données de l'utilisateur et ses réponses.
 * @param {number} payload.userId - L'identifiant de l'utilisateur.
 * @param {Object[]} payload.answers - Les réponses de l'utilisateur.
 */

export const createUserAnswers = (payload: {
  userId: number;
  answers: { answerId: number }[];
}) => api.post("/user-answers", payload);

/**
 * Récupère un utilisateur avec ses réponses.
 * @param {number} userId - L'identifiant de l'utilisateur.
 * @returns {Promise} Promise résolue avec l'utilisateur et ses réponses.
 */

export const fetchUserWithAnswers = (userId: number) =>
  api.get(`/user/${userId}`);

export default api;
