import { defineStore } from "pinia";
import type { User } from "@/interfaces/questionsAnswersInterface";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "",
      answers: [],
    } as Partial<User>,
  }),

  actions: {
    setUser(userData: Partial<User>) {
      this.user = { ...this.user, ...userData };
    },
    resetUser() {
      this.user = {
        firstName: "",
        lastName: "",
        address: "",
        zipCode: "",
        phoneNumber: "",
        email: "",
        paymentMethod: "",
        answers: [],
      };
    },
  },
});
