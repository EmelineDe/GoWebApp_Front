import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useUserStore } from "@/stores/userStore";
import * as api from "@/utils/api";
import type { User } from "@/interfaces/questionsAnswersInterface";
import type { AxiosResponse, InternalAxiosRequestConfig } from "axios";

const mockUser: User = {
  id: 1,
  firstName: "Alice",
  lastName: "Dupont",
  address: "10 rue des Lilas",
  zipCode: "75000",
  phoneNumber: "0123456789",
  email: "alice@example.com",
  paymentMethod: "online",
  answers: [],
};

const mockAxiosResponse = <T>(data: T): AxiosResponse<T> => ({
  data,
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as InternalAxiosRequestConfig,
});

vi.mock("@/utils/api");

describe("userStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  /**
   * Test pour vérifier que le store est initialisé avec les valeurs par défaut.
   */

  it("setUser met à jour l'état avec les données utilisateur", () => {
    const store = useUserStore();
    store.setUser({ firstName: "Alice" });
    expect(store.user.firstName).toBe("Alice");
  });

  /**
   * Test pour vérifier que le store est réinitialisé.
   */

  it("resetUser réinitialise l'utilisateur", () => {
    const store = useUserStore();
    store.setUser({ firstName: "Alice" });
    store.resetUser();
    expect(store.user).toEqual({});
  });

  /**
   * Test pour vérifier que le store est initialisé avec les valeurs par défaut.
   */

  it("createUser appelle l'API et met à jour l'utilisateur", async () => {
    const store = useUserStore();
    vi.spyOn(api, "createUser").mockResolvedValue(mockAxiosResponse(mockUser));

    const userPayload: Omit<User, "id" | "answers"> = {
      firstName: "Alice",
      lastName: "Dupont",
      address: "10 rue des Lilas",
      zipCode: "75000",
      phoneNumber: "0123456789",
      email: "alice@example.com",
      paymentMethod: "online",
    };

    const user = await store.createUser(userPayload);
    expect(user).toEqual(mockUser);
    expect(store.user).toEqual(mockUser);
  });

  /**
   * Test pour vérifier que les réponses d'un utilisateur sont créées.
   */

  it("submitUserAnswers appelle createUserAnswers", async () => {
    const store = useUserStore();

    const mockSubmit = vi
      .spyOn(api, "createUserAnswers")
      .mockResolvedValue(mockAxiosResponse(undefined));

    await store.submitUserAnswers({
      userId: 1,
      answers: [{ answerId: 42 }],
    });

    expect(mockSubmit).toHaveBeenCalledWith({
      userId: 1,
      answers: [{ answerId: 42 }],
    });
  });

  /**
   * Test pour vérifier que les données utilisateur sont récupérées.
   */

  it("fetchUserWithAnswers récupère les données utilisateur", async () => {
    const store = useUserStore();

    vi.spyOn(api, "fetchUserWithAnswers").mockResolvedValue(
      mockAxiosResponse(mockUser)
    );

    const user = await store.fetchUserWithAnswers(1);
    expect(user).toEqual(mockUser);
  });
});
