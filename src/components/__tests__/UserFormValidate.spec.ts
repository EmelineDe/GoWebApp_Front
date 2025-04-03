import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import { createVuetify } from "vuetify";

/**
 * Mock pour le composable userFormComposable
 */

vi.mock("@/composable/userFormComposable", async () => {
  const {
    sharedUser,
    acceptTerms,
    acceptRetraction,
    isSubmitted,
    paymentOptions,
    getUserPayload,
    acceptCommercial,
    errors,
  } = await import("./__mocks__/userFormComposableMock");

  return {
    useUserForm: () => ({
      user: sharedUser,
      acceptTerms,
      acceptRetraction,
      acceptCommercial,
      isSubmitted,
      paymentOptions,
      getUserPayload,
      errors,
      validateUser: () => ({ success: false }),
    }),
  };
});

// mock store
const createUser = vi.fn();
const submitUserAnswers = vi.fn();

vi.mock("@/stores/userStore", () => ({
  useUserStore: () => ({
    createUser,
    submitUserAnswers,
  }),
}));

import UserForm from "../UserForm.vue";
import {
  sharedUser,
  acceptTerms,
  acceptRetraction,
} from "./__mocks__/userFormComposableMock";

describe("UserForm.vue – validateUser", () => {
  it("n'envoie pas le formulaire si validateUser retourne une erreur", async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createVuetify(), createTestingPinia()],
        stubs: ["PreviousStepButton"],
      },
    });

    acceptTerms.value = true;
    acceptRetraction.value = true;
    sharedUser.value.paymentMethod = "Carte bancaire";

    await wrapper.find("form").trigger("submit.prevent");
    await wrapper.vm.$nextTick();

    expect(createUser).not.toHaveBeenCalled();
    expect(submitUserAnswers).not.toHaveBeenCalled();
  });
});
