import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import type { Answer } from "@/interfaces/questionsAnswersInterface";
import { watch } from "vue";
import { useRoute } from "vue-router";

export function useQuestionnaire() {
  let router: typeof import("@/router").default;

  /**
   * Charge le routeur.
   */

  async function loadRouter() {
    if (!router) {
      const mod = await import("@/router");
      router = mod.default;
    }
  }
  const store = useQuestionnaireStore();
  const route = useRoute();

  /**
   * Surveille les changements de chemin.
   */

  watch(
    () => route.fullPath,
    async (newPath, oldPath) => {
      const cameFromRecap =
        oldPath.includes("/recap") && newPath.includes("/service");
      if (cameFromRecap) {
        const restart = window.confirm(
          "Souhaitez-vous recommencer le questionnaire ?"
        );

        await loadRouter();

        if (restart) {
          store.reset();
          await router.push("/");
        } else {
          await router.push("/recap");
        }
      }
    }
  );

  /**
   * Démarre le questionnaire.
   */

  async function start(serviceId: string) {
    await loadRouter();
    if (
      store.questions.length > 0 &&
      store.questions[0].category !== serviceId
    ) {
      store.reset();
    }

    if (store.questions.length === 0 || !store.currentQuestion) {
      await store.fetchFirstQuestion(serviceId);
      store.answers = [];
    } else {
      store.currentQuestion = store.questions.at(-1) ?? null;
    }

    store.isFinished = false;
  }

  /**
   * Sélectionne une réponse.
   */

  async function selectAnswer(answer: Answer) {
    console.log("Selected answer ID:", answer.id);
    if (!store.currentQuestion) return;

    store.answers = store.answers.filter(
      (a) => a.questionId !== store.currentQuestion!.id
    );

    store.answers.push({
      questionId: store.currentQuestion.id,
      answerId: answer.id,
    });

    await store.fetchNextQuestionFromAnswer(answer.id);

    if (store.isFinished) {
      await loadRouter();
      router.push("/recap");
    }
  }

  /**
   * Revient à la question précédente.
   */

  async function goBack() {
    await loadRouter();
    if (store.questions.length <= 1) {
      store.reset();
      await router.push("/");
      store.reset();
    } else {
      store.goBack();
    }
  }

  /**
   * Retourne les données du store.
   */

  return {
    store,
    start,
    selectAnswer,
    goBack,
  };
}
