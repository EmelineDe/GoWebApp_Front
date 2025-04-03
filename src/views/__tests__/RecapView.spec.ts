/// <reference types="vitest" />
import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import RecapView from "@/views/RecapView.vue";
import {
  recapStepMock,
  mockQuestionnaireStore,
} from "./Mocks/useRecapViewMock";

// Mock des dépendances globales
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock des composants enfants
vi.mock("@/components/UserForm.vue", () => ({
  default: { template: "<div>UserFormMock</div>" },
}));
vi.mock("@/components/GoodToKnow.vue", () => ({
  default: { template: "<div>GoodToKnowMock</div>" },
}));
vi.mock("@/components/RecapAnswers.vue", () => ({
  default: {
    template: `<div>RecapAnswersMock<button @click="$emit('next')">Next</button></div>`,
  },
}));

// Mock des stores et composables
vi.mock("@/stores/questionnaireStore", () => ({
  useQuestionnaireStore: () => mockQuestionnaireStore,
}));
vi.mock("@/composable/useRecapStep", () => ({
  useRecapStep: () => recapStepMock,
}));

export const replaceMock = vi.fn();
export const pushMock = vi.fn();

vi.mock("vue-router", () => ({
  useRoute: () => ({ params: { type: "plomberie" } }),
  useRouter: () => ({
    push: pushMock,
    replace: replaceMock,
  }),
}));

describe("RecapView.vue", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
    recapStepMock.isFormStep = false;
  });

  /**
   * Test pour vérifier que le composant affiche GoodToKnow si isFormStep est false.
   */

  it("affiche GoodToKnow si isFormStep est false", () => {
    const wrapper = mount(RecapView);
    expect(wrapper.html()).toContain("GoodToKnowMock");
    expect(wrapper.html()).not.toContain("UserFormMock");
  });

  /**
   * Test pour vérifier que le composant affiche UserForm si isFormStep est true.
   */

  it("affiche UserForm si isFormStep est true", () => {
    recapStepMock.isFormStep = true;
    const wrapper = mount(RecapView);
    expect(wrapper.html()).toContain("UserFormMock");
    expect(wrapper.html()).not.toContain("GoodToKnowMock");
  });

  /**
   * Test pour vérifier que le composant passe à l'étape formulaire quand on émet l'event `next` depuis RecapAnswers.
   */

  it("passe à l'étape formulaire quand on émet l'event `next` depuis RecapAnswers", async () => {
    const wrapper = mount(RecapView);
    await wrapper.find("button").trigger("click");
    expect(recapStepMock.setFormStep).toHaveBeenCalledWith(true);
  });

  /**
   * Test pour vérifier que le composant réinitialise le store et redirige vers Home si l'utilisateur accepte de quitter via popstate.
   */

  it("réinitialise le store et redirige vers Home si l'utilisateur accepte de quitter via popstate", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);

    mount(RecapView);
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(confirmSpy).toHaveBeenCalled();
    expect(mockQuestionnaireStore.reset).toHaveBeenCalled();
    expect(replaceMock).toHaveBeenCalledWith({ name: "Home" });
  });

  /**
   * Test pour vérifier que le composant empêche la navigation si l'utilisateur refuse de quitter via popstate.
   */

  it("empêche la navigation si l'utilisateur refuse de quitter via popstate", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(false);
    const pushStateSpy = vi.spyOn(history, "pushState");

    mount(RecapView);
    window.dispatchEvent(new PopStateEvent("popstate"));

    expect(confirmSpy).toHaveBeenCalled();
    expect(pushStateSpy).toHaveBeenCalled();
  });

  /**
   * Test pour vérifier que le composant retire le listener popstate au démontage.
   */

  it("retire le listener popstate au démontage", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const wrapper = mount(RecapView);
    wrapper.unmount();

    expect(removeSpy).toHaveBeenCalledWith("popstate", expect.any(Function));
  });
});
