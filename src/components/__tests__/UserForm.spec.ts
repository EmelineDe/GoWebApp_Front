import { describe, it, expect, vi, beforeEach } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import UserForm from "../UserForm.vue";
import { createTestingPinia } from "@pinia/testing";
import { createVuetify } from "vuetify";
import {
  sharedUser,
  acceptTerms,
  acceptRetraction,
  acceptCommercial,
  isSubmitted,
} from "./__mocks__/userFormComposableMock";

const createUser = vi.fn().mockResolvedValue({ id: 123 });
const submitUserAnswers = vi.fn().mockResolvedValue(undefined);

// Mock Router
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock Composable
vi.mock("@/composable/userFormComposable", async () => {
  const { mockedUseUserForm } = await import(
    "./__mocks__/userFormComposableMock"
  );
  return { useUserForm: mockedUseUserForm };
});

// Mock Store
vi.mock("@/stores/userStore", () => {
  return {
    useUserStore: () => ({
      createUser,
      submitUserAnswers,
    }),
  };
});

describe("UserForm.vue", () => {
  const vuetify = createVuetify();

  const mountForm = () =>
    mount(UserForm, {
      global: {
        plugins: [vuetify, createTestingPinia({ stubActions: false })],
        stubs: ["PreviousStepButton"],
      },
    });

  beforeEach(() => {
    sharedUser.value.paymentMethod = "";
    acceptTerms.value = false;
    acceptRetraction.value = false;
    acceptCommercial.value = false;
    isSubmitted.value = false;
    createUser.mockClear();
    submitUserAnswers.mockClear();
  });

  it("affiche tous les champs obligatoires", () => {
    const wrapper = mountForm();
    const inputs = wrapper.findAllComponents({ name: "VTextField" });
    expect(inputs).toHaveLength(6);
  });

  it("affiche les options de paiement", () => {
    const wrapper = mountForm();
    const paymentOptions = wrapper.findAll(".payment-option");
    expect(paymentOptions.length).toBe(2);
  });

  it("affiche les 3 checkboxes d’acceptation", () => {
    const wrapper = mountForm();
    const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });

    const filtered = checkboxes.filter(
      (c) =>
        c.text().includes("conditions") ||
        c.text().includes("rétractation") ||
        c.text().includes("offres")
    );

    expect(filtered.length).toBe(3);
  });

  it("affiche les 5 checkboxes d’acceptation", () => {
    const wrapper = mountForm();
    const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
    expect(checkboxes.length).toBe(5);
  });

  it("appelle createUser + submitUserAnswers au submit", async () => {
    const wrapper = mountForm();
    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "Payer sur place";

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(createUser).toHaveBeenCalled();
    expect(submitUserAnswers).toHaveBeenCalledWith({
      userId: 123,
      answers: [{ questionId: 1, answerId: 2 }],
    });
  });

  it("affiche une alerte si conditions non cochées", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mountForm();

    acceptTerms.value = false;
    acceptRetraction.value = false;

    await wrapper.find("form").trigger("submit.prevent");

    expect(alertSpy).toHaveBeenCalledWith(
      "Vous devez accepter les conditions générales et le droit de rétractation."
    );

    alertSpy.mockRestore();
  });

  it("affiche une alerte si mode de paiement non sélectionné", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mountForm();

    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "";
    isSubmitted.value = true;

    await wrapper.find("form").trigger("submit.prevent");

    expect(alertSpy).toHaveBeenCalledWith(
      "Veuillez sélectionner un mode de paiement."
    );

    alertSpy.mockRestore();
  });
});
