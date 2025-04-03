import { vi } from "vitest";
import type { Question } from "@/interfaces/questionsAnswersInterface";

/**
 * Mock pour le composant UserForm.
 */

vi.mock("@/components/UserForm.vue", () => ({
  default: {
    name: "UserForm",
    template: "<div class='mock-user-form'>UserForm</div>",
  },
}));

/**
 * Mock pour le composant GoodToKnow.
 */

vi.mock("@/components/GoodToKnow.vue", () => ({
  default: {
    name: "GoodToKnow",
    template: "<div class='mock-good-to-know'>GoodToKnow</div>",
  },
}));

/**
 * Mock pour le composant RecapAnswers.
 */

vi.mock("@/components/RecapAnswers.vue", () => ({
  default: {
    name: "RecapAnswers",
    props: ["isFormStep"],
    emits: ["next"],
    template: "<div class='mock-recap-answers'>RecapAnswers</div>",
  },
}));

/**
 * Fonction mock pour simuler la réinitialisation du store du questionnaire.
 */

export const resetMock = vi.fn();

/**
 * État mocké du store du questionnaire, comprenant les questions, la question actuelle,
 * les réponses, le statut de fin et le chargement.
 */

export const mockQuestionnaireStore = {
  questions: [] as Question[],
  currentQuestion: null,
  answers: [],
  isFinished: false,
  loading: false,
  reset: resetMock,
};

/**
 * Mock pour le store du questionnaire, permettant de simuler les états et fonctions nécessaires.
 */

vi.mock("@/stores/questionnaireStore", () => ({
  useQuestionnaireStore: () => mockQuestionnaireStore,
}));

/**
 * Fonction mock pour simuler le changement de l'étape du formulaire.
 */

export const setFormStepMock = vi.fn();

/**
 * État mocké pour l'étape du formulaire, comprenant l'état de l'étape et la fonction pour changer l'étape.
 */
export const recapStepMock = {
  isFormStep: false,
  setFormStep: setFormStepMock,
};

/**
 * Mock pour le composable useRecapStep, permettant de simuler les états et fonctions nécessaires.
 */

vi.mock("@/composable/useRecapStep", () => ({
  useRecapStep: () => recapStepMock,
}));
