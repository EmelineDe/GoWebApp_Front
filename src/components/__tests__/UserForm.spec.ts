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
  errors,
} from "./__mocks__/userFormComposableMock";

const createUser = vi.fn().mockResolvedValue({ id: 123 });
const submitUserAnswers = vi.fn().mockResolvedValue(undefined);

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

const questionnaireResetMock = vi.fn();

vi.mock("@/stores/questionnaireStore", () => ({
  useQuestionnaireStore: () => ({
    reset: questionnaireResetMock,
  }),
}));

const routerPushMock = vi.fn();

// mock global de vue-router
vi.mock("vue-router", () => ({
  useRouter: () => ({
    push: routerPushMock,
  }),
}));

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

  /**
   * Test pour vérifier que tous les champs obligatoires sont affichés.
   */

  it("affiche tous les champs obligatoires", () => {
    const wrapper = mountForm();
    const inputs = wrapper.findAllComponents({ name: "VTextField" });
    expect(inputs).toHaveLength(6);
  });

  /**
   * Test pour vérifier que les options de paiement sont affichées.
   */

  it("affiche les options de paiement", () => {
    const wrapper = mountForm();
    const paymentOptions = wrapper.findAll(".payment-option");
    expect(paymentOptions.length).toBe(2);
  });

  /**
   * Test pour vérifier que les 3 checkboxes d’acceptation sont affichés.
   */

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

  /**
   * Test pour vérifier que les 5 checkboxes d’acceptation sont affichés.
   */

  it("affiche les 5 checkboxes d’acceptation", () => {
    const wrapper = mountForm();
    const checkboxes = wrapper.findAllComponents({ name: "VCheckbox" });
    expect(checkboxes.length).toBe(5);
  });

  /**
   * Test pour vérifier que la fonction createUser et submitUserAnswers sont appelées au submit.
   */

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

  /**
   * Test pour vérifier que la fonction createUser échoue.
   */

  it("log une erreur si createUser échoue", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    createUser.mockRejectedValueOnce(new Error("Erreur réseau"));

    const wrapper = mountForm();

    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "Carte bancaire";

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(errorSpy).toHaveBeenCalledWith("Erreur API :", expect.any(Error));

    errorSpy.mockRestore();
  });

  /**
   * Test pour vérifier que l'alerte est affichée si les conditions ne sont pas cochées.
   */

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

  /**
   * Test pour vérifier que l'alerte est affichée si le mode de paiement n'est pas sélectionné.
   */

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

  /**
   * Test pour vérifier que l'alerte de redirection est affichée si paiement en ligne.
   */

  it("affiche l'alerte de redirection si paiement en ligne", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mountForm();

    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "Carte bancaire";

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(alertSpy).toHaveBeenCalledWith(
      "Vous allez être redirigé vers notre plateforme de paiement sécurisée pour finaliser votre demande."
    );

    alertSpy.mockRestore();
  });

  /**
   * Test pour vérifier que le store est réinitialisé et que l'utilisateur est redirigé vers Home après confirmation.
   */

  it("reset le store et redirige vers Home après confirmation", async () => {
    vi.useFakeTimers();

    const wrapper = mount(UserForm, {
      global: {
        plugins: [vuetify, createTestingPinia({ stubActions: false })],
        stubs: ["PreviousStepButton"],
      },
    });

    sharedUser.value.paymentMethod = "Payer sur place";
    acceptTerms.value = true;
    acceptRetraction.value = true;

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    vi.advanceTimersByTime(201);
    expect(routerPushMock).toHaveBeenCalledWith({ name: "Home" });
    expect(questionnaireResetMock).toHaveBeenCalled();
  });

  /**
   * Test pour vérifier que l'état d'erreur est affiché pour le champ prénom si trop court.
   */

  it("affiche l'état d'erreur pour le champ prénom si trop court", async () => {
    const wrapper = mountForm();

    sharedUser.value.firstName = "A";
    isSubmitted.value = true;

    await wrapper.vm.$nextTick();

    const input = wrapper.findAllComponents({ name: "VTextField" })[0];
    const colorAttr = input.attributes("color");

    expect(colorAttr).not.toBe("success");
  });

  /**
   * Test pour vérifier que le champ email est vert si valide.
   */

  it("met le champ email en vert si valide", async () => {
    const wrapper = mountForm();
    sharedUser.value.email = "test@example.com";
    errors.email = null;
    isSubmitted.value = true;

    await wrapper.vm.$nextTick();

    const emailInput = wrapper.findAllComponents({ name: "VTextField" })[5];
    expect(emailInput.vm.$props.color).toBe("success");
  });

  /**
   * Test pour vérifier que la fonction submitForm est appelée manuellement.
   */

  it("déclenche la fonction submitForm manuellement", async () => {
    const wrapper = mountForm();
    // @ts-ignore accès direct à la fonction via l'instance
    await wrapper.vm.submitForm?.();
  });

  /**
   * Test pour vérifier que isSubmitted est activé dans un cas sans erreur.
   */

  it("active isSubmitted dans un cas sans erreur", async () => {
    const wrapper = mountForm();

    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "Carte bancaire";

    await wrapper.find("form").trigger("submit.prevent");
    await flushPromises();

    expect(isSubmitted.value).toBe(true);
  });
});
