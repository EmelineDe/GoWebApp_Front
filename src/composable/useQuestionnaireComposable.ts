// src/composables/useQuestionnaireComposable.ts
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import type { Answer } from "@/interfaces/questionsAnswersInterface";
import router from "@/router";

export function useQuestionnaire() {
  const store = useQuestionnaireStore();

  async function start(serviceId: string) {
    await store.fetchFirstQuestion(serviceId);
    store.answers = [];
  }

  async function selectAnswer(answer: Answer) {
    console.log("Selected answer ID:", answer.id);
    if (!store.currentQuestion) return;

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
