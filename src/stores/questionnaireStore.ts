import { defineStore } from "pinia";
import api from "@/utils/api";
import type { Question } from "@/interfaces/questionsAnswersInterface";

export const useQuestionnaireStore = defineStore("questionnaire", {
  state: () => ({
    questions: [] as Question[],
    currentQuestion: null as Question | null,
    answers: [] as { questionId: number; answerId: number }[],
    isFinished: false,
    loading: false,
  }),

  actions: {
    /**
     * Récupère la première question d'une catégorie donnée.
     * @param {string} category - La catégorie de la question.
     */

    async fetchFirstQuestion(category: string) {
      this.loading = true;
      try {
        const res = await api.get(`/questions/first/${category}`);
        this.questions = [res.data];
        this.currentQuestion = res.data;
      } catch (error) {
        console.error("Erreur fetchFirstQuestion:", error);
        this.questions = [];
        this.currentQuestion = null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Récupère la prochaine question d'une réponse donnée.
     * @param {number} answerId - L'identifiant de la réponse.
     */

    async fetchNextQuestionFromAnswer(answerId: number) {
      this.loading = true;
      try {
        const res = await api.get(`/answers/${answerId}/next`);

        if (res.data?.finished) {
          this.isFinished = true;
        } else {
          this.questions.push(res.data);
          this.currentQuestion = res.data;
        }
      } catch (error: any) {
        console.error("Erreur fetchNextQuestionFromAnswer:", error);
      } finally {
        this.loading = false;
      }
    },

    /**
     * Revient à la question précédente.
     */

    goBack() {
      if (this.questions.length > 1) {
        this.questions.pop();
        this.currentQuestion =
          this.questions[this.questions.length - 1] ?? null;
        this.answers.pop();
        this.isFinished = false;
      } else {
        this.reset();
      }
    },

    /**
     * Réinitialise le store.
     */

    reset() {
      this.questions = [];
      this.currentQuestion = null;
      this.answers = [];
      this.isFinished = false;
      this.loading = false;
    },
  },
});
