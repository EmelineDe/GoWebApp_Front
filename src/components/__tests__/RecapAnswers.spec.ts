import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import RecapAnswers from "../RecapAnswers.vue";
import { setActivePinia, createPinia } from "pinia";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import { nextTick } from "vue";

describe("RecapAnswers", () => {
  beforeEach(() => {
    setActivePinia(createPinia());

    const store = useQuestionnaireStore();
    store.questions = [
      {
        id: 1,
        text: "localisation",
        category: "localisation",
        level: 1,
        answers: [
          { id: 11, displayText: "paris", questionId: 1, text: "paris" },
          { id: 12, displayText: "lyon", questionId: 1, text: "lyon" },
        ],
      },
    ];
    store.answers = [
      {
        questionId: 1,
        answerId: 11,
      },
    ];
  });

  const mountComponent = (isFormStep = false) =>
    mount(RecapAnswers, {
      props: {
        isFormStep,
      },
    });

  /**
   * Test pour vérifier que la phrase est générée correctement avec plusieurs labels.
   */

  it("génère correctement la phrase avec plusieurs labels", () => {
    const store = useQuestionnaireStore();

    store.questions = [
      {
        id: 1,
        text: "problème",
        category: "problème",
        level: 1,
        answers: [
          { id: 1, displayText: "wc", questionId: 1, text: "wc" },
          { id: 2, displayText: "bouché", questionId: 1, text: "bouché" },
          { id: 3, displayText: "urgent", questionId: 1, text: "urgent" },
        ],
      },
    ];

    store.answers = [
      { questionId: 1, answerId: 1 },
      { questionId: 1, answerId: 2 },
      { questionId: 1, answerId: 3 },
    ];

    const wrapper = mountComponent();
    const sentence = wrapper.find(".recap-title");
    expect(sentence.text()).toBe("Wc, bouché, urgent.");
  });

  /**
   * Test pour vérifier que la phrase récapitulative est correctement capitalisée.
   */

  it("affiche la phrase récapitulative correctement capitalisée", () => {
    const wrapper = mountComponent();
    const sentence = wrapper.find(".recap-title");
    expect(sentence.text()).toBe("Paris.");
  });

  /**
   * Test pour vérifier que les éléments inclus dans la liste sont affichés correctement.
   */

  it("affiche les éléments inclus dans la liste", () => {
    const wrapper = mountComponent();
    const items = wrapper.findAll(".recap-list li");
    expect(items).toHaveLength(6);
    expect(items[0].text()).toContain("Entre 150€ et 300€ TTC");
  });

  /**
   * Test pour vérifier que le message par défaut est affiché si aucune réponse n’a été sélectionnée.
   */

  it("affiche le message par défaut si aucune réponse n’a été sélectionnée", async () => {
    const store = useQuestionnaireStore();
    store.answers = [];
    store.questions = [];

    const wrapper = mountComponent();
    await nextTick();

    const sentence = wrapper.find(".recap-title");
    expect(sentence.text()).toBe("Aucune information sélectionnée.");
  });

  /**
   * Test pour vérifier que le bouton "Demander une intervention" est affiché quand isFormStep est false.
   */

  it('affiche le bouton "Demander une intervention" quand isFormStep est false', () => {
    const wrapper = mountComponent(false);
    const btn = wrapper.find("button.intervention-btn");
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe("Demander une intervention");
  });

  /**
   * Test pour vérifier que le bouton "Afficher le numéro" est affiché quand isFormStep est true.
   */

  it("n’affiche PAS le bouton intervention quand isFormStep est true", () => {
    const wrapper = mountComponent(true);
    const btn = wrapper.find("button.intervention-btn");
    expect(btn.text()).toBe("Afficher le numéro");
  });

  /**
   * Test pour vérifier que l'événement "next" est émis au clic sur le bouton "Demander une intervention".
   */

  it('émet l’événement "next" au clic sur "Demander une intervention"', async () => {
    const wrapper = mountComponent(false);
    await wrapper.find("button.intervention-btn").trigger("click");
    expect(wrapper.emitted("next")).toBeTruthy();
  });

  /**
   * Test pour vérifier que le paragraphe étendu est affiché correctement selon isFormStep.
   */

  it("affiche le bon paragraphe de fin selon isFormStep = false", () => {
    const wrapper = mountComponent(false);
    const text = wrapper.find(".recap-info");
    expect(text.text()).toContain("recontactés sous 20 minutes");
    expect(text.text()).toContain("une intervention à part entière");
  });

  /**
   * Test pour vérifier que le paragraphe étendu est affiché correctement selon isFormStep.
   */

  it("affiche le paragraphe étendu quand isFormStep = true", () => {
    const wrapper = mountComponent(true);
    const text = wrapper.find(".recap-info");
    expect(text.text()).toContain("L'artisan vous proposera un rendez-vous");
    expect(text.text()).toContain("aucun frais n'est engagé");
  });

  /**
   * Test pour vérifier que la section assistance téléphonique est affichée correctement selon isFormStep.
   */

  it("affiche la section assistance téléphonique quand isFormStep = true", () => {
    const wrapper = mountComponent(true);
    const title = wrapper.find(".assistance-title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain("assistance téléphonique");
  });
});
