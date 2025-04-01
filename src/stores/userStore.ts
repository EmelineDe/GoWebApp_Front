// src/stores/userStore.ts
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
    setUser(userData: Partial<User>) {
      this.user = { ...userData };
    },

    resetUser() {
      this.user = {};
    },

    async createUser(userPayload: Omit<User, "id" | "answers">) {
      const response = await createUser(userPayload);
      this.setUser(response.data);
      return response.data;
    },

    async submitUserAnswers(payload: {
      userId: number;
      answers: { answerId: number }[];
    }) {
      await createUserAnswers(payload);
    },
    async fetchUserWithAnswers(userId: number) {
      const response = await fetchUserWithAnswers(userId);
      console.log("✔️ Utilisateur récupéré :", response.data);
      return response.data;
    },
  },
});
