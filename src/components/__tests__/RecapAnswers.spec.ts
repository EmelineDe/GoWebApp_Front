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

  it("affiche la phrase récapitulative correctement capitalisée", () => {
    const wrapper = mountComponent();
    const sentence = wrapper.find(".recap-title");
    expect(sentence.text()).toBe("Paris.");
  });

  it("affiche les éléments inclus dans la liste", () => {
    const wrapper = mountComponent();
    const items = wrapper.findAll(".recap-list li");
    expect(items).toHaveLength(6);
    expect(items[0].text()).toContain("Entre 150€ et 300€ TTC");
  });

  it("affiche le message par défaut si aucune réponse n’a été sélectionnée", async () => {
    const store = useQuestionnaireStore();
    store.answers = [];
    store.questions = [];

    const wrapper = mountComponent();
    await nextTick();

    const sentence = wrapper.find(".recap-title");
    expect(sentence.text()).toBe("Aucune information sélectionnée.");
  });

  it('affiche le bouton "Demander une intervention" quand isFormStep est false', () => {
    const wrapper = mountComponent(false);
    const btn = wrapper.find("button.intervention-btn");
    expect(btn.exists()).toBe(true);
    expect(btn.text()).toBe("Demander une intervention");
  });

  it("n’affiche PAS le bouton intervention quand isFormStep est true", () => {
    const wrapper = mountComponent(true);
    const btn = wrapper.find("button.intervention-btn");
    expect(btn.text()).toBe("Afficher le numéro");
  });

  it('émet l’événement "next" au clic sur "Demander une intervention"', async () => {
    const wrapper = mountComponent(false);
    await wrapper.find("button.intervention-btn").trigger("click");
    expect(wrapper.emitted("next")).toBeTruthy();
  });

  it("affiche le bon paragraphe de fin selon isFormStep = false", () => {
    const wrapper = mountComponent(false);
    const text = wrapper.find(".recap-info");
    expect(text.text()).toContain("recontactés sous 20 minutes");
    expect(text.text()).toContain("une intervention à part entière");
  });

  it("affiche le paragraphe étendu quand isFormStep = true", () => {
    const wrapper = mountComponent(true);
    const text = wrapper.find(".recap-info");
    expect(text.text()).toContain("L'artisan vous proposera un rendez-vous");
    expect(text.text()).toContain("aucun frais n'est engagé");
  });

  it("affiche la section assistance téléphonique quand isFormStep = true", () => {
    const wrapper = mountComponent(true);
    const title = wrapper.find(".assistance-title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toContain("assistance téléphonique");
  });
});
