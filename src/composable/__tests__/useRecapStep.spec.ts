import { describe, it, expect } from "vitest";
import { useRecapStep } from "../useRecapStep";

describe("useRecapStep", () => {
  /**
   * Test pour vérifier que la valeur initiale de isFormStep est false.
   */

  it("devrait exposer isFormStep à false initialement", () => {
    const { isFormStep } = useRecapStep();
    expect(isFormStep.value).toBe(false);
  });

  /**
   * Test pour vérifier que la fonction setFormStep permet de passer isFormStep à true.
   */

  it("devrait permettre de passer isFormStep à true", () => {
    const { isFormStep, setFormStep } = useRecapStep();
    setFormStep(true);
    expect(isFormStep.value).toBe(true);
  });

  /**
   * Test pour vérifier que la fonction setFormStep permet de repasser isFormStep à false.
   */

  it("devrait permettre de repasser isFormStep à false", () => {
    const { isFormStep, setFormStep } = useRecapStep();
    setFormStep(true);
    setFormStep(false);
    expect(isFormStep.value).toBe(false);
  });
});
