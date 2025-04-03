import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import QuestionsCard from "../QuestionsCard.vue";
import PreviousStepButton from "../PreviousStepButton.vue";
import type { Question } from "../../interfaces/questionsAnswersInterface";

vi.mock("../../composable/useQuestionnaireComposable", () => ({
  useQuestionnaire: () => ({
    goBack: vi.fn(),
  }),
}));

describe("QuestionCard", () => {
  const mockQuestion: Question = {
    id: 1,
    text: "quelle est votre localisation ?",
    category: "localisation",
    level: 1,
    answers: [
      { id: 101, displayText: "Paris", questionId: 1, text: "Paris" },
      { id: 102, displayText: "Lyon", questionId: 1, text: "Lyon" },
    ],
  };

  const factory = () =>
    mount(QuestionsCard, {
      props: { question: mockQuestion },
      global: {
        stubs: {
          PreviousStepButton,
        },
      },
    });

  /**
   * Test pour vérifier que le titre est affiché correctement.
   */

  it("affiche le titre capitalisé", () => {
    const wrapper = factory();
    expect(wrapper.find("h2").text()).toBe("Quelle est votre localisation ?");
  });

  /**
   * Test pour vérifier que les réponses sont affichées correctement.
   */

  it("affiche les réponses attendues", () => {
    const wrapper = factory();
    const buttons = wrapper.findAll(".answer-button");
    expect(buttons).toHaveLength(2);
    expect(buttons[0].text()).toContain("Paris");
    expect(buttons[1].text()).toContain("Lyon");
  });

  /**
   * Test pour vérifier que l'événement "select" est émis au clic sur une réponse.
   */

  it('émet un événement "select" au clic sur une réponse', async () => {
    const wrapper = factory();
    const firstButton = wrapper.findAll(".answer-button")[0];
    await firstButton.trigger("click");

    expect(wrapper.emitted("select")).toBeTruthy();
    expect(wrapper.emitted("select")?.[0][0]).toEqual({
      id: 101,
      displayText: "Paris",
      questionId: 1,
      text: "Paris",
    });
  });

  /**
   * Test pour vérifier que le bouton PreviousStepButton est affiché.
   */

  it("rend le bouton PreviousStepButton", () => {
    const wrapper = factory();
    const backBtn = wrapper.findComponent(PreviousStepButton);
    expect(backBtn.exists()).toBe(true);
  });

  /**
   * Test pour vérifier que les 3 éléments de la section info sont affichés.
   */

  it("affiche les 3 éléments de la section info", () => {
    const wrapper = factory();
    const infoItems = wrapper.findAll(".info-list li");
    expect(infoItems).toHaveLength(3);
    expect(infoItems[0].text()).toContain("professionnels qualifiés");
  });
});
