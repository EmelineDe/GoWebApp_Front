import { reactive, ref } from "vue";
import { vi } from "vitest";

/**
 * Mock pour le composable userFormComposable
 */

export const sharedUser = ref({
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
  paymentMethod: "",
});

/**
 * Mock pour les erreurs
 */

export const errors = reactive({
  firstName: null,
  lastName: null,
  address: null,
  zipCode: null,
  phoneNumber: null,
  email: null,
});

/**
 * Mock pour les acceptations
 */

export const acceptTerms = ref(false);
export const acceptRetraction = ref(false);
export const acceptCommercial = ref(false);
export const isSubmitted = ref(false);

/**
 * Mock pour les options de paiement
 */
export const paymentOptions = ["Paiement en ligne", "Payer sur place"];

/**
 * Mock pour la validation de l'utilisateur
 */

export const validateUser = vi.fn(() => ({ success: true }));

/**
 * Mock pour le payload de l'utilisateur
 */
export const getUserPayload = vi.fn(() => ({
  address: "1 rue test",
  zipCode: "75000",
  phoneNumber: "0601020304",
  email: "test@mail.com",
  paymentMethod: "Payer sur place",
  answers: [{ questionId: 1, answerId: 2 }],
}));

/**
 * Mock pour le composable useUserForm
 */

export const mockedUseUserForm = vi.fn(() => ({
  user: sharedUser,
  acceptTerms,
  acceptRetraction,
  acceptCommercial,
  isSubmitted,
  paymentOptions,
  validateUser,
  getUserPayload,
  errors,
}));
