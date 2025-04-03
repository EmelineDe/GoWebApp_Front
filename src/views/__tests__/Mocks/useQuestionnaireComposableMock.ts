import { Question } from "@/interfaces/questionsAnswersInterface";
import { Store } from "pinia";
import { vi } from "vitest";

/**
 * Fonction mock pour simuler le démarrage d'un questionnaire.
 */
export const startMock = vi.fn();

/**
 * Fonction mock pour simuler la sélection d'une réponse dans un questionnaire.
 */
export const selectAnswerMock = vi.fn();

/**
 * Question courante mockée pour les tests, représentant une structure de question typique.
 */

export const currentQuestionMock = {
  id: 1,
  label: "Test question",
  text: "Test question",
  category: "Test category",
  level: 1,
  answers: [
    {
      id: 1,
      text: "Test answer",
      displayText: "Test answer",
      questionId: 1,
      nextQuestionId: 2,
    },
  ],
};

/**
 * État du store de questionnaire mocké pour les tests, incluant la question courante et l'état de fin.
 */

export const questionnaireState = {
  questions: [currentQuestionMock],
  currentQuestion: currentQuestionMock,
  isFinished: false,
  answers: [],
  loading: false,
};

/**
 * Store de questionnaire mocké, contenant les fonctions et états nécessaires pour les tests.
 * Inclut des fonctions mockées pour la mutation, la réinitialisation, et la souscription.
 */

export const mockQuestionnaireStore = {
  questions: [] as Question[],
  currentQuestion: currentQuestionMock,
  isFinished: false,
  answers: [],
  loading: false,
  $id: "questionnaire",
  $state: {},
  $patch: vi.fn(),
  $reset: vi.fn(),
  $subscribe: vi.fn(),
  $onAction: vi.fn(),
  $dispose: vi.fn(),
  _customProperties: new Set(),
} as unknown as Store<
  "questionnaire",
  {
    questions: Question[];
    currentQuestion: Question | null;
    answers: { questionId: number; answerId: number }[];
    isFinished: boolean;
    loading: boolean;
  },
  {},
  {}
>;

/**
 * Fonction mock pour simuler l'utilisation du composable de questionnaire.
 */

export const mockedUseQuestionnaire = vi.fn(() => ({
  store: mockQuestionnaireStore,
  start: startMock,
  selectAnswer: selectAnswerMock,
}));
