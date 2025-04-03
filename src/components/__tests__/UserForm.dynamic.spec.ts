import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import { createTestingPinia } from "@pinia/testing";

const setFormStepMock = vi.fn();

vi.mock("@/composable/useRecapStep", () => ({
  useRecapStep: () => ({
    setFormStep: setFormStepMock,
  }),
}));

vi.mock("@/components/PreviousStepButton.vue", () => ({
  default: {
    template: `<button @click="$emit('click')">Mock PreviousStep</button>`,
  },
}));

import UserForm from "../UserForm.vue";

describe("UserForm.vue (dynamic)", () => {
  /**
   * Test pour vérifier que le bouton PreviousStepButton est présent.
   */

  it("retourne à l'étape précédente quand on clique sur PreviousStepButton", async () => {
    const wrapper = mount(UserForm, {
      global: {
        plugins: [createVuetify(), createTestingPinia()],
      },
    });

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(setFormStepMock).toHaveBeenCalledWith(false);
  });
});
