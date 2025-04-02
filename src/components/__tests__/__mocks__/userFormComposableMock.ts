import { ref } from "vue";
import { vi } from "vitest";

export const sharedUser = ref({
  firstName: "",
  lastName: "",
  address: "",
  zipCode: "",
  phoneNumber: "",
  email: "",
  paymentMethod: "",
});

export const acceptTerms = ref(false);
export const acceptRetraction = ref(false);
export const acceptCommercial = ref(false);
export const isSubmitted = ref(false);

export const validateUser = vi.fn(() => ({ success: true }));
export const getUserPayload = vi.fn(() => ({
  firstName: "Test",
  lastName: "User",
  address: "1 rue test",
  zipCode: "75000",
  phoneNumber: "0601020304",
  email: "test@mail.com",
  paymentMethod: "Payer sur place",
  answers: [{ questionId: 1, answerId: 2 }],
}));

export const mockedUseUserForm = vi.fn(() => ({
  user: sharedUser,
  acceptTerms,
  acceptRetraction,
  acceptCommercial,
  isSubmitted,
  paymentOptions: ["Paiement en ligne", "Payer sur place"],
  validateUser,
  getUserPayload,
  errors: {},
}));
