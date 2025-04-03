import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";
import { nextTick } from "vue";

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { type: "plomberie" } }),
  useRouter: () => ({ push: pushMock }),
}));

const defaultStore = {
  selectService: vi.fn(),
  get getSelectedService() {
    return true;
  },
};
vi.mock("@/stores/serviceCatalogStore", () => ({
  serviceCatalogStore: () => defaultStore,
}));

import {
  mockedUseQuestionnaire,
  startMock,
  selectAnswerMock,
  questionnaireState,
} from "@/views/__tests__/Mocks/useQuestionnaireComposableMock";

vi.mock("@/composable/useQuestionnaireComposable", () => ({
  useQuestionnaire: mockedUseQuestionnaire,
}));

import QuestionnaireWizard from "@/views/QuestionnaireWizard.vue";
import QuestionCard from "@/components/QuestionsCard.vue";

describe("QuestionnaireWizard.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    setActivePinia(createPinia());
  });

  /**
   * Test pour vérifier que le composant affiche la QuestionCard si currentQuestion existe.
   */

  it("affiche la QuestionCard si currentQuestion existe", () => {
    const wrapper = mount(QuestionnaireWizard);
    expect(wrapper.findComponent(QuestionCard).exists()).toBe(true);
  });

  /**
   * Test pour vérifier que le composant affiche la QuestionCard si currentQuestion existe.
   */

  it("affiche le loader si aucune question ou si isFinished est true", async () => {
    const newState = {
      ...questionnaireState,
      currentQuestion: null,
      isFinished: true,
    };

    mockedUseQuestionnaire.mockReturnValueOnce({
      store: {
        ...newState,
        $id: "questionnaire",
        $state: newState,
        $patch: vi.fn(),
        $reset: vi.fn(),
        $subscribe: vi.fn(),
        $onAction: vi.fn(),
        $dispose: vi.fn(),
        _customProperties: new Set(),
      },
      start: startMock,
      selectAnswer: selectAnswerMock,
    });

    const wrapper = mount(QuestionnaireWizard);
    await nextTick();

    expect(wrapper.find("svg").exists()).toBe(true);
    expect(wrapper.findComponent(QuestionCard).exists()).toBe(false);
  });

  /**
   * Test pour vérifier que le composant appelle start() au montage avec le bon service.
   */

  it("appelle start() au montage avec le bon service", () => {
    mount(QuestionnaireWizard);
    expect(startMock).toHaveBeenCalledWith("plomberie");
  });
});
