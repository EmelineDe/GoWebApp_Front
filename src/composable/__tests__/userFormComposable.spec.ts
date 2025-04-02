// tests/unit/useUserForm.spec.ts

import { describe, it, expect, vi, beforeEach } from "vitest";
import { useUserForm } from "../userFormComposable";
import { setActivePinia, createPinia } from "pinia";
import { useQuestionnaireStore } from "@/stores/questionnaireStore";

describe("useUserForm", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("devrait avoir des valeurs initiales correctes", () => {
    const form = useUserForm();
    expect(form.user.value.firstName).toBe("");
    expect(form.acceptTerms.value).toBe(false);
    expect(form.paymentOptions).toEqual(["Payer sur place", "Payer en ligne"]);
  });

  it("onlyDigits devrait bloquer les lettres", () => {
    const form = useUserForm();
    const preventDefault = vi.fn();

    form.onlyDigits({ key: "a", preventDefault } as any);
    expect(preventDefault).toHaveBeenCalled();

    preventDefault.mockReset();

    form.onlyDigits({ key: "1", preventDefault } as any);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("onlyLetters devrait bloquer les chiffres", () => {
    const form = useUserForm();
    const preventDefault = vi.fn();

    form.onlyLetters({ key: "1", preventDefault } as any);
    expect(preventDefault).toHaveBeenCalled();

    preventDefault.mockReset();

    form.onlyLetters({ key: "a", preventDefault } as any);
    expect(preventDefault).not.toHaveBeenCalled();
  });

  it("getUserPayload devrait transformer paymentMethod", () => {
    const form = useUserForm();
    const store = useQuestionnaireStore();
    store.answers = [{ questionId: 1, answerId: 42 }];

    form.user.value.paymentMethod = "Payer en ligne";
    const payload = form.getUserPayload();
    expect(payload.paymentMethod).toBe("online");

    form.user.value.paymentMethod = "Payer sur place";
    const payload2 = form.getUserPayload();
    expect(payload2.paymentMethod).toBe("in-person");
  });

  it("validateUser renvoie une erreur si vide", () => {
    const form = useUserForm();
    const result = form.validateUser();
    expect(result.success).toBe(false);
    expect(form.errors.value).not.toEqual({});
  });

  it("validateUser renvoie success si user complet", () => {
    const form = useUserForm();
    const store = useQuestionnaireStore();
    store.answers = [{ questionId: 1, answerId: 123 }];

    form.user.value = {
      firstName: "John",
      lastName: "Doe",
      address: "123 rue test",
      zipCode: "75000",
      phoneNumber: "0601020304",
      email: "john@example.com",
      paymentMethod: "Payer en ligne",
    };

    const result = form.validateUser();
    expect(result.success).toBe(true);
    expect(form.errors.value).toEqual({});
  });
});
