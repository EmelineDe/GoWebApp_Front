import { describe, it, expect, vi, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import api from "@/utils/api";

vi.mock("@/utils/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("questionnaireStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("initialise le store avec les valeurs par défaut", () => {
    const store = useQuestionnaireStore();
    expect(store.questions).toEqual([]);
    expect(store.currentQuestion).toBe(null);
    expect(store.answers).toEqual([]);
    expect(store.isFinished).toBe(false);
    expect(store.loading).toBe(false);
  });

  it("fetchFirstQuestion → remplit correctement la première question", async () => {
    const store = useQuestionnaireStore();
    const fakeQuestion = { id: 1, text: "Q1", category: "plomberie", level: 1, answers: [] };

    vi.mocked(api.get).mockResolvedValueOnce({ data: fakeQuestion });

    await store.fetchFirstQuestion("plomberie");

    expect(store.questions).toEqual([fakeQuestion]);
    expect(store.currentQuestion).toEqual(fakeQuestion);
    expect(store.loading).toBe(false);
  });

  it("fetchFirstQuestion → gère les erreurs et reset les questions", async () => {
    const store = useQuestionnaireStore();
    vi.mocked(api.get).mockRejectedValueOnce(new Error("Erreur API"));

    await store.fetchFirstQuestion("plomberie");

    expect(store.questions).toEqual([]);
    expect(store.currentQuestion).toBe(null);
    expect(store.loading).toBe(false);
  });

  it("fetchNextQuestionFromAnswer → ajoute la prochaine question", async () => {
    const store = useQuestionnaireStore();
    const q1 = { id: 1, text: "Q1", category: "plomberie", level: 1, answers: [] };
    const q2 = { id: 2, text: "Q2", category: "plomberie", level: 2, answers: [] };

    store.questions = [q1];
    vi.mocked(api.get).mockResolvedValueOnce({ data: q2 });

    await store.fetchNextQuestionFromAnswer(99);

    expect(store.questions).toEqual([q1, q2]);
    expect(store.currentQuestion).toEqual(q2);
    expect(store.isFinished).toBe(false);
  });

  it("fetchNextQuestionFromAnswer → termine le questionnaire si finished=true", async () => {
    const store = useQuestionnaireStore();
    vi.mocked(api.get).mockResolvedValueOnce({ data: { finished: true } });

    await store.fetchNextQuestionFromAnswer(42);

    expect(store.isFinished).toBe(true);
  });

  it("goBack → revient à la question précédente", () => {
    const store = useQuestionnaireStore();
    const q1 = { id: 1, text: "Q1", category: "plomberie", level: 1, answers: [] };
    const q2 = { id: 2, text: "Q2", category: "plomberie", level: 2, answers: [] };

    store.questions = [q1, q2];
    store.currentQuestion = q2;
    store.answers = [{ questionId: 1, answerId: 1 }, { questionId: 2, answerId: 2 }];
    store.isFinished = true;

    store.goBack();

    expect(store.questions).toEqual([q1]);
    expect(store.currentQuestion).toEqual(q1);
    expect(store.answers).toEqual([{ questionId: 1, answerId: 1 }]);
    expect(store.isFinished).toBe(false);
  });

  it("goBack → appelle reset si une seule question", () => {
    const store = useQuestionnaireStore();
    const q1 = { id: 1, text: "Q1", category: "plomberie", level: 1, answers: [] };

    store.questions = [q1];
    const resetSpy = vi.spyOn(store, "reset");

    store.goBack();
    expect(resetSpy).toHaveBeenCalled();
  });

  it("reset → remet tous les états à zéro", () => {
    const store = useQuestionnaireStore();
    store.questions = [{ id: 1, text: "Q", category: "plomberie", level: 1, answers: [] }];
    store.currentQuestion = { id: 1, text: "Q", category: "plomberie", level: 1, answers: [] };
    store.answers = [{ questionId: 1, answerId: 2 }];
    store.isFinished = true;
    store.loading = true;

    store.reset();

    expect(store.questions).toEqual([]);
    expect(store.currentQuestion).toBe(null);
    expect(store.answers).toEqual([]);
    expect(store.isFinished).toBe(false);
    expect(store.loading).toBe(false);
  });
});