import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import PreviousStepButton from "../PreviousStepButton.vue";

describe("PreviousStepButton.vue", () => {
  /**
   * Test pour vérifier que le bouton est rendu avec le texte correct.
   */

  it("rend le bouton avec le bon texte", () => {
    const { getByText } = render(PreviousStepButton);
    expect(getByText(/étape précédente/i)).toBeTruthy();
  });

  /**
   * Test pour vérifier que l'événement "click" est émis quand le bouton est cliqué.
   */

  it('émet un événement "click" quand on clique', async () => {
    const { getByText, emitted } = render(PreviousStepButton);
    const button = getByText(/étape précédente/i);
    await fireEvent.click(button);
    expect(emitted().click).toBeTruthy();
  });
});
