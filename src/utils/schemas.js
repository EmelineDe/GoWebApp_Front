import { z } from "zod";

// Schéma pour un produit
export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  description: z.string().optional(),
  price: z.number().positive("Le prix doit être positif"),
  image: z.string().url("L'URL de l'image n'est pas valide").optional(),
  category: z.string().optional(),
});

// Schéma pour un utilisateur
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email("Email invalide"),
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Numéro de téléphone invalide")
    .optional(),
});

// Schéma pour une commande
export const orderSchema = z.object({
  id: z.number(),
  userId: z.number(),
  items: z.array(
    z.object({
      productId: z.number(),
      quantity: z.number().int().positive("La quantité doit être positive"),
    })
  ),
  total: z.number().positive("Le total doit être positif"),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  createdAt: z.string().datetime(),
});

// Fonction utilitaire pour valider les données
export const validateData = (schema, data) => {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
    }
    throw error;
  }
};
