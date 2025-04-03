import { defineStore } from "pinia";
import {
  createUser,
  createUserAnswers,
  fetchUserWithAnswers,
} from "@/utils/api";
import type { User } from "@/interfaces/questionsAnswersInterface";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {} as Partial<User>,
  }),

  actions: {
    /**
     * Définit l'utilisateur.
     * @param {Partial<User>} userData - Les données de l'utilisateur.
     */

    setUser(userData: Partial<User>) {
      this.user = { ...userData };
    },

    /**
     * Réinitialise l'utilisateur.
     */

    resetUser() {
      this.user = {};
    },

    /**
     * Crée un utilisateur.
     * @param {Omit<User, "id" | "answers">} userPayload - Les données de l'utilisateur.
     * @returns {Promise<User>} L'utilisateur créé.
     */

    async createUser(userPayload: Omit<User, "id" | "answers">) {
      const response = await createUser(userPayload);
      this.setUser(response.data);
      return response.data;
    },

    /**
     * Crée les réponses d'un utilisateur.
     * @param {Object} payload - Les données des réponses.
     */

    async submitUserAnswers(payload: {
      userId: number;
      answers: { answerId: number }[];
    }) {
      await createUserAnswers(payload);
    },

    /**
     * Récupère un utilisateur avec ses réponses.
     * @param {number} userId - L'identifiant de l'utilisateur.
     * @returns {Promise<User>} L'utilisateur avec ses réponses.
     */

    async fetchUserWithAnswers(userId: number) {
      const response = await fetchUserWithAnswers(userId);
      console.log("✔️ Utilisateur récupéré :", response.data);
      return response.data;
    },
  },
});
