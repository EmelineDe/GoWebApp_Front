import { describe, it, expect, vi, beforeEach } from "vitest";
import * as apiModule from "../api";
import api from "../api";

describe("API module", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("fetchFirstQuestion appelle la bonne route", async () => {
    const getMock = vi.spyOn(api, "get").mockResolvedValue({ data: {} });
    const category = "plomberie";

    await apiModule.fetchFirstQuestion(category);

    expect(getMock).toHaveBeenCalledWith(`/questions/first/${category}`);
  });

  it("fetchQuestionById appelle la bonne route", async () => {
    const getMock = vi.spyOn(api, "get").mockResolvedValue({ data: {} });

    await apiModule.fetchQuestionById(42);

    expect(getMock).toHaveBeenCalledWith("/questions/42");
  });

  it("fetchNextQuestionFromAnswer appelle la bonne route", async () => {
    const getMock = vi.spyOn(api, "get").mockResolvedValue({ data: {} });

    await apiModule.fetchNextQuestionFromAnswer(99);

    expect(getMock).toHaveBeenCalledWith("/answers/99/next");
  });

  it("createUser appelle la bonne route avec les données", async () => {
    const postMock = vi.spyOn(api, "post").mockResolvedValue({ data: {} });

    const payload = {
      firstName: "Alice",
      lastName: "Dupont",
      address: "10 rue des Lilas",
      zipCode: "75000",
      phoneNumber: "0123456789",
      email: "alice@example.com",
      paymentMethod: "online" as const,
    };

    await apiModule.createUser(payload);

    expect(postMock).toHaveBeenCalledWith("/user", payload);
  });

  it("createUserAnswers appelle la bonne route avec le payload", async () => {
    const postMock = vi.spyOn(api, "post").mockResolvedValue({ data: {} });

    const payload = {
      userId: 1,
      answers: [{ answerId: 42 }],
    };

    await apiModule.createUserAnswers(payload);

    expect(postMock).toHaveBeenCalledWith("/user-answers", payload);
  });

  it("fetchUserWithAnswers appelle la bonne route", async () => {
    const getMock = vi.spyOn(api, "get").mockResolvedValue({ data: {} });

    await apiModule.fetchUserWithAnswers(1);

    expect(getMock).toHaveBeenCalledWith("/user/1");
  });
});
