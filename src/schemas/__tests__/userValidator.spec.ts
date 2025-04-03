import { describe, it, expect } from "vitest";
import { UserSchema } from "@/schemas/userValidator";

const validUser = {
  firstName: "Jean",
  lastName: "Dupont",
  address: "12 rue des Lilas",
  zipCode: "75001",
  phoneNumber: "0601020304",
  email: "jean.dupont@email.com",
  paymentMethod: "online",
  answers: [{ answerId: 1 }],
};

describe("UserSchema", () => {
  it("valide un utilisateur correct", () => {
    const result = UserSchema.safeParse(validUser);
    expect(result.success).toBe(true);
  });

  it("rejette un utilisateur sans prénom", () => {
    const user = { ...validUser, firstName: "" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().firstName?._errors[0]).toBe(
      "Ce champ est requis"
    );
  });

  it("rejette un prénom trop court", () => {
    const user = { ...validUser, firstName: "J" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().firstName?._errors[0]).toContain(
      "au moins 2 caractères"
    );
  });

  it("rejette un nom avec des chiffres", () => {
    const user = { ...validUser, lastName: "Dupon7" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().lastName?._errors[0]).toContain(
      "lettres et les tirets"
    );
  });

  it("rejette une adresse sans numéro", () => {
    const user = { ...validUser, address: "rue des Lilas" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().address?._errors[0]).toContain(
      "commencer par un numéro"
    );
  });

  it("rejette un code postal vide", () => {
    const user = { ...validUser, zipCode: "" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().zipCode?._errors[0]).toBe(
      "Ce champ est requis"
    );
  });

  it("rejette un téléphone avec des lettres", () => {
    const user = { ...validUser, phoneNumber: "06ABCD1234" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().phoneNumber?._errors[0]).toContain(
      "chiffres"
    );
  });

  it("rejette un email invalide", () => {
    const user = { ...validUser, email: "invalid-email" };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().email?._errors[0]).toBe("Email invalide");
  });

  it("rejette un mauvais mode de paiement", () => {
    const user = { ...validUser, paymentMethod: "cheque" as any };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().paymentMethod?._errors[0]).toContain(
      "mode de paiement"
    );
  });

  it("rejette si aucune réponse n'est sélectionnée", () => {
    const user = { ...validUser, answers: [] };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().answers?._errors[0]).toBe(
      "Array must contain at least 1 element(s)"
    );
  });

  it("rejette si un answerId est négatif", () => {
    const user = { ...validUser, answers: [{ answerId: -1 }] };
    const result = UserSchema.safeParse(user);
    expect(result.success).toBe(false);
    expect(result.error?.format().answers?.[0]?.answerId?._errors[0]).toBe(
      "Number must be greater than 0"
    );
  });
});
