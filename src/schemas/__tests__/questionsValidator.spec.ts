import { describe, it, expect } from "vitest";
import { AnswerSchema, QuestionSchema } from "../questionsValidator";

describe("AnswerSchema", () => {
  /**
   * Test pour vérifier que la réponse est valide.
   */

  it("valide une réponse correcte", () => {
    const result = AnswerSchema.safeParse({
      id: 1,
      text: "Réponse A",
      questionId: 123,
      nextQuestionId: 456,
    });

    expect(result.success).toBe(true);
  });

  /**
   * Test pour vérifier que la réponse est rejetée si elle n'a pas d'id.
   */

  it("rejette une réponse sans id", () => {
    const result = AnswerSchema.safeParse({
      text: "Réponse B",
      questionId: 123,
    });

    expect(result.success).toBe(false);
    expect(result.error?.format().id?._errors[0]).toContain("Required");
  });

  /**
   * Test pour vérifier que la réponse est valide si elle n'a pas de nextQuestionId.
   */

  it("accepte l'absence de nextQuestionId", () => {
    const result = AnswerSchema.safeParse({
      id: 2,
      text: "Réponse sans suite",
      questionId: 456,
    });

    expect(result.success).toBe(true);
  });
});

describe("QuestionSchema", () => {
  /**
   * Test pour vérifier que la question est valide.
   */

  it("valide une question complète avec réponses", () => {
    const result = QuestionSchema.safeParse({
      id: 10,
      text: "Quelle est la nature du problème ?",
      category: "plomberie",
      level: 1,
      answers: [
        { id: 1, text: "Fuite", questionId: 10 },
        { id: 2, text: "Bouché", questionId: 10, nextQuestionId: 11 },
      ],
    });

    expect(result.success).toBe(true);
  });

  /**
   * Test pour vérifier que la question est rejetée si elle n'a pas de réponses.
   */

  it("rejette une question sans réponses", () => {
    const result = QuestionSchema.safeParse({
      id: 11,
      text: "Sans réponse",
      category: "électricité",
      level: 2,
      answers: [],
    });

    expect(result.success).toBe(true);
  });

  /**
   * Test pour vérifier que la question est rejetée si elle a une mauvaise réponse.
   */

  it("rejette une question avec une mauvaise réponse", () => {
    const result = QuestionSchema.safeParse({
      id: 12,
      text: "Mauvaise question",
      category: "autre",
      level: 3,
      answers: [{ id: "oops", text: 123, questionId: "non-numeric" }],
    });

    expect(result.success).toBe(false);
    expect(result.error?.format().answers?._errors).toBeDefined();
  });
});
