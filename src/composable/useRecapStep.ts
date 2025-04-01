import { ref } from "vue";

const isFormStep = ref(false);

export function useRecapStep() {
  function setFormStep(value: boolean) {
    isFormStep.value = value;
  }

  return {
    isFormStep,
    setFormStep,
  };
}
