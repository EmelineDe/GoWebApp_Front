import { vi, it } from "vitest";
import { nextTick } from "vue";
import { expect } from "vitest";
import { mount } from "@vue/test-utils";

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

/**
 * Test pour vérifier que le composant redirige vers la page d'accueil si le service sélectionné n'existe pas.
 */

it("redirige vers Home si getSelectedService est null", async () => {
  const mockStore = {
    selectService: vi.fn(),
    get getSelectedService() {
      return null;
    },
  };

  vi.doMock("@/stores/serviceCatalogStore", () => ({
    serviceCatalogStore: () => mockStore,
  }));

  const { mockedUseQuestionnaire } = await import(
    "@/views/__tests__/Mocks/useQuestionnaireComposableMock"
  );

  vi.doMock("@/composable/useQuestionnaireComposable", () => ({
    useQuestionnaire: mockedUseQuestionnaire,
  }));

  const { default: Component } = await import(
    "@/views/QuestionnaireWizard.vue"
  );

  mount(Component);
  await nextTick();

  expect(pushMock).toHaveBeenCalledWith({ name: "Home" });
});
