import { ref } from "vue";

const isFormStep = ref(false);

/**
 * Composable pour gérer le passage à l'étape de récapitulatif.
 */

export function useRecapStep() {
  function setFormStep(value: boolean) {
    isFormStep.value = value;
  }

  return {
    isFormStep,
    setFormStep,
  };
}
