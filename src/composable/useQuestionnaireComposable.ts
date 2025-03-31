// src/composables/useQuestionnaireComposable.ts
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import type { Answer } from "@/interfaces/questionsAnswersInterface";
import router from "@/router";
import { watch } from "vue";
import { useRoute } from "vue-router";

export function useQuestionnaire() {
  const store = useQuestionnaireStore();
  const route = useRoute();

  watch(
    () => route.fullPath,
    async (newPath, oldPath) => {
      const cameFromRecap =
        oldPath.includes("/recap") && newPath.includes("/service");
      if (cameFromRecap) {
        const restart = window.confirm(
          "Souhaitez-vous recommencer le questionnaire ?"
        );
        if (restart) {
          store.reset();
          await router.push("/");
        } else {
          await router.push("/recap");
        }
      }
    }
  );

  async function start(serviceId: string) {
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
      router.push("/recap");
    }
  }

  async function goBack() {
    if (store.questions.length <= 1) {
      store.reset();
      await router.push("/");
      store.reset();
    } else {
      store.goBack();
    }
  }

  return {
    store,
    start,
    selectAnswer,
    goBack,
  };
}
