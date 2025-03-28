import { ref } from "vue";
import { UserSchema } from "@/schemas/userValidator";
import type { User } from "@/interfaces/questionsAnswersInterface";

export function useUserForm() {
  const user = ref<Partial<User>>({
    firstName: "",
    lastName: "",
    address: "",
    zipCode: "",
    phoneNumber: "",
    email: "",
    paymentMethod: "",
    answers: [],
  });

  const validateUser = () => {
    return UserSchema.safeParse(user.value);
  };

  const resetUser = () => {
    user.value = {
      firstName: "",
      lastName: "",
      address: "",
      zipCode: "",
      phoneNumber: "",
      email: "",
      paymentMethod: "",
      answers: [],
    };
  };

  return {
    user,
    validateUser,
    resetUser,
  };
}
