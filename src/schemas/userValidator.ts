import { z } from "zod";

export const UserAnswerSchema = z.object({
  answerId: z.number().positive(),
});

export const UserSchema = z.object({
  firstName: z
    .string()
    .nonempty("Ce champ est requis")
    .min(2, "Le prénom doit contenir au moins 2 caractères")
    .regex(
      /^[A-Za-zÀ-ÿ\s-]+$/,
      "Seules les lettres et les tirets sont autorisés"
    ),

  lastName: z
    .string()
    .nonempty("Ce champ est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .regex(
      /^[A-Za-zÀ-ÿ\s-]+$/,
      "Seules les lettres et les tirets sont autorisés"
    ),

  address: z
    .string()
    .nonempty("Ce champ est requis")
    .min(5, "Adresse invalide")
    .regex(
      /^\d{1,4}[a-zA-Z\s,.'’-]{3,}$/,
      "L'adresse doit commencer par un numéro suivi du nom de rue"
    ),

  zipCode: z
    .string()
    .nonempty("Ce champ est requis")
    .length(5, "Code postal invalide")
    .regex(/^\d{5}$/, "Le code postal doit contenir uniquement des chiffres"),

  phoneNumber: z
    .string()
    .nonempty("Ce champ est requis")
    .min(10, "Téléphone invalide")
    .regex(/^\d+$/, "Le téléphone doit contenir uniquement des chiffres"),

  email: z.string().nonempty("Ce champ est requis").email("Email invalide"),

  paymentMethod: z.enum(["online", "in-person"], {
    errorMap: () => ({
      message: "Le mode de paiement doit être 'online' ou 'in-person'",
    }),
  }),

  answers: z.array(UserAnswerSchema).min(1),
});
