import { describe, it, expect, vi, beforeEach } from "vitest";
import { useQuestionnaire } from "../useQuestionnaireComposable";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { reactive } from "vue";
import { createTestingPinia } from "@pinia/testing";
import { setActivePinia } from "pinia";
import { useRoute } from "vue-router";
import type { Mock } from "vitest";

const push = vi.fn();

vi.mock("@/router", () => ({
  default: { push },
}));

vi.mock("vue-router", () => ({
  useRoute: vi.fn(),
}));

vi.mock("@/stores/questionnaireStore", async () => {
  const actual = await vi.importActual("@/stores/questionnaireStore");
  return actual;
});

describe("useQuestionnaire", () => {
  let store: ReturnType<typeof useQuestionnaireStore>;
  let route: { fullPath: string };

  beforeEach(() => {
    setActivePinia(createTestingPinia({ stubActions: false }));
    store = useQuestionnaireStore();
    push.mockClear();

    // Mock réactif pour le watcher
    route = reactive({ fullPath: "/service/test" });
    (useRoute as unknown as Mock).mockReturnValue(route);
  });

  it("start() devrait reset et fetch la première question si questions vide", async () => {
    store.questions = [];
    store.currentQuestion = null;

    const fetchFirstQuestion = vi
      .spyOn(store, "fetchFirstQuestion")
      .mockResolvedValue();

    const { start } = useQuestionnaire();
    await start("plomberie");

    expect(fetchFirstQuestion).toHaveBeenCalledWith("plomberie");
    expect(store.answers).toEqual([]);
    expect(store.isFinished).toBe(false);
  });

  it("selectAnswer() doit mettre à jour les réponses et appeler fetchNextQuestionFromAnswer", async () => {
    store.currentQuestion = {
      id: 1,
      text: "",
      answers: [],
      category: "",
      level: 0,
    };
    const fetchNext = vi
      .spyOn(store, "fetchNextQuestionFromAnswer")
      .mockResolvedValue();

    const { selectAnswer } = useQuestionnaire();
    await selectAnswer({
      id: 99,
      text: "",
      nextQuestionId: undefined,
      displayText: "",
      questionId: 1,
    });

    expect(store.answers).toContainEqual({ questionId: 1, answerId: 99 });
    expect(fetchNext).toHaveBeenCalledWith(99);
  });

  it("goBack() doit reset et rediriger si une seule question", async () => {
    store.questions = [
      { id: 1, text: "", answers: [], category: "", level: 0 },
    ];

    const reset = vi.spyOn(store, "reset");

    const { goBack } = useQuestionnaire();
    await goBack();

    expect(reset).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenCalledWith("/");
  });

  it("goBack() appelle store.goBack() si plus d'une question", async () => {
    const goBackStore = vi.spyOn(store, "goBack").mockImplementation(() => {});
    store.questions = [
      { id: 1, text: "", answers: [], category: "", level: 0 },
      { id: 2, text: "", answers: [], category: "", level: 0 },
    ];

    const { goBack } = useQuestionnaire();
    await goBack();

    expect(goBackStore).toHaveBeenCalled();
  });
});
