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

export const fetchFirstQuestion = (category: string) =>
  api.get(`/questions/first/${category}`);

export const fetchQuestionById = (id: number) => api.get(`/questions/${id}`);

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

export const createUserAnswers = (payload: {
  userId: number;
  answers: { answerId: number }[];
}) => api.post("/user-answers", payload);

export const fetchUserWithAnswers = (userId: number) =>
  api.get(`/user/${userId}`);

export default api;
