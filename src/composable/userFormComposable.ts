import { ref, watchEffect } from "vue";
import { UserSchema } from "@/schemas/userValidator";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";
import type { User } from "@/interfaces/questionsAnswersInterface";

type UserFormErrors = Partial<Record<keyof User, string[]>>;

/**
 * Composable pour gérer le formulaire des informations de l'utilisateur.
 */

export function useUserForm() {
  const questionnaireStore = useQuestionnaireStore();

  const user = ref({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
  });

  const acceptTerms = ref(false);
  const acceptRetraction = ref(false);
  const acceptCommercial = ref(false);
  const isSubmitted = ref(false);
  const errors = ref<UserFormErrors>({});
  const paymentOptions = ["Payer sur place", "Payer en ligne"];

  const onlyDigits = (e: KeyboardEvent) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (allowedKeys.includes(e.key)) return;

    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Vérifie que les caractères sont des lettres.
   */

  const onlyLetters = (e: KeyboardEvent) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (allowedKeys.includes(e.key)) return;

    if (!/^[a-zA-ZÀ-ÿ-]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  /**
   * Retourne les données du formulaire.
   */

  const getUserPayload = (): Omit<User, "id"> => ({
    ...user.value,
    paymentMethod:
      user.value.paymentMethod === "Payer en ligne" ? "online" : "in-person",
    answers: questionnaireStore.answers.map((a) => ({
      answerId: a.answerId,
    })),
  });

  /**
   * Valide le formulaire.
   */

  const validateUser = () => {
    const result = UserSchema.safeParse(getUserPayload());
    errors.value = result.success ? {} : result.error.flatten().fieldErrors;
    return result;
  };

  /**
   * Surveille les changements de l'état de soumission du formulaire.
   */

  watchEffect(() => {
    if (isSubmitted.value) validateUser();
  });

  return {
    user,
    acceptTerms,
    acceptRetraction,
    acceptCommercial,
    paymentOptions,
    onlyLetters,
    onlyDigits,
    getUserPayload,
    validateUser,
    errors,
    isSubmitted,
  };
}
