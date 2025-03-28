import { z } from "zod";

export const UserAnswerSchema = z.object({
  answerId: z.number(),
});

export const UserSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  address: z.string(),
  zipCode: z.string().length(5),
  phoneNumber: z.string(),
  email: z.string().email(),
  paymentMethod: z.string(),
  answers: z.array(UserAnswerSchema),
});
