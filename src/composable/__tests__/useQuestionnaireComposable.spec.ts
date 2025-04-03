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

  /**
   * Test pour vérifier que la fonction start() réinitialise et récupère la première question si les questions sont vides.
   */

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

  /**
   * Test pour vérifier que la fonction start() réinitialise si les questions existantes ne correspondent pas au serviceId donné.
   */

  it("start() devrait reset si questions existantes ne correspondent pas au serviceId donné", async () => {
    store.questions = [
      {
        id: 1,
        text: "Question existante",
        answers: [],
        category: "electricite",
        level: 1,
      },
    ];
    store.currentQuestion = store.questions[0];

    const { start } = useQuestionnaire();
    await start("plomberie");

    expect(store.reset).toHaveBeenCalled();
  });

  /**
   * Test pour vérifier que la fonction selectAnswer() met à jour les réponses et appelle fetchNextQuestionFromAnswer.
   */

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

  /**
   * Test pour vérifier que la fonction selectAnswer() ne fait rien si currentQuestion est null.
   */

  it("selectAnswer() ne doit rien faire si currentQuestion est null", async () => {
    store.currentQuestion = null;
    const { selectAnswer } = useQuestionnaire();
    await selectAnswer({ id: 1, text: "", questionId: 1, displayText: "" });

    expect(store.fetchNextQuestionFromAnswer).not.toHaveBeenCalled();
  });

  /**
   * Test pour vérifier que la fonction selectAnswer() redirige vers /recap quand isFinished devient true.
   */

  it("selectAnswer() doit rediriger vers /recap quand isFinished devient true", async () => {
    store.currentQuestion = {
      id: 1,
      text: "",
      answers: [],
      category: "",
      level: 0,
    };
    store.isFinished = false;

    vi.spyOn(store, "fetchNextQuestionFromAnswer").mockImplementation(() => {
      store.isFinished = true;
      return Promise.resolve();
    });

    const { selectAnswer } = useQuestionnaire();
    await selectAnswer({ id: 2, text: "", questionId: 1, displayText: "" });

    expect(push).toHaveBeenCalledWith("/recap");
  });

  /**
   * Test pour vérifier que la fonction goBack() réinitialise et redirige vers l'accueil si une seule question.
   */

  it("goBack() doit reset et si une seule question", async () => {
    store.questions = [
      { id: 1, text: "", answers: [], category: "", level: 0 },
    ];

    const reset = vi.spyOn(store, "reset");

    const { goBack } = useQuestionnaire();
    await goBack();

    expect(reset).toHaveBeenCalledTimes(2);
    expect(push).toHaveBeenCalledWith("/");
  });

  /**
   * Test pour vérifier que la fonction goBack() appelle store.goBack() si plus d'une question.
   */

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

  /**
   * Test pour vérifier que la fonction goBack() appelle reset et redirige vers l'accueil si une seule question.
   */

  it("goBack() devrait appeler reset et rediriger vers l'accueil si une seule question", async () => {
    store.questions = [
      { id: 1, text: "", answers: [], category: "", level: 0 },
    ];
    const { goBack } = useQuestionnaire();
    await goBack();

    expect(store.reset).toHaveBeenCalled();
    expect(push).toHaveBeenCalledWith("/");
  });

  it("goBack() ne devrait pas rediriger si plus d'une question", async () => {
    store.questions = [
      { id: 1, text: "", answers: [], category: "", level: 0 },
      { id: 2, text: "", answers: [], category: "", level: 0 },
    ];
    const { goBack } = useQuestionnaire();
    await goBack();

    expect(push).not.toHaveBeenCalled();
  });
});
