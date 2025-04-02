import { describe, it, expect } from "vitest";
import { useRecapStep } from "../useRecapStep";

describe("useRecapStep", () => {
  it("devrait exposer isFormStep à false initialement", () => {
    const { isFormStep } = useRecapStep();
    expect(isFormStep.value).toBe(false);
  });

  it("devrait permettre de passer isFormStep à true", () => {
    const { isFormStep, setFormStep } = useRecapStep();
    setFormStep(true);
    expect(isFormStep.value).toBe(true);
  });

  it("devrait permettre de repasser isFormStep à false", () => {
    const { isFormStep, setFormStep } = useRecapStep();
    setFormStep(true);
    setFormStep(false);
    expect(isFormStep.value).toBe(false);
  });
});
