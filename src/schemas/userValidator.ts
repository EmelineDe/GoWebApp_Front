import { z } from "zod";

export const UserAnswerSchema = z.object({
  answerId: z.number().positive(),
});

export const UserSchema = z.object({
  firstName: z
    .string()
    .nonempty("Ce champ est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères"),

  lastName: z
    .string()
    .nonempty("Ce champ est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères"),

  address: z
    .string()
    .nonempty("Ce champ est requis")
    .min(5, "Adresse invalide"),

  zipCode: z
    .string()
    .nonempty("Ce champ est requis")
    .length(5, "Code postal invalide"),

  phoneNumber: z
    .string()
    .nonempty("Ce champ est requis")
    .min(10, "Téléphone invalide"),

  email: z.string().nonempty("Ce champ est requis").email("Email invalide"),

  paymentMethod: z.enum(["online", "in-person"], {
    errorMap: () => ({
      message: "Le mode de paiement doit être 'online' ou 'in-person'",
    }),
  }),

  answers: z.array(UserAnswerSchema).min(1),
});
