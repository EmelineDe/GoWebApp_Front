import { describe, it, expect } from "vitest";
import { capitalize } from "../formatText";

describe("capitalize", () => {
  it("devrait retourner une string vide si le texte est vide", () => {
    expect(capitalize("")).toBe("");
  });

  it("devrait capitaliser la première lettre d'un mot en minuscules", () => {
    expect(capitalize("bonjour")).toBe("Bonjour");
  });

  it("devrait retourner un seul mot avec la première lettre en majuscule", () => {
    expect(capitalize("salut")).toBe("Salut");
  });

  it("devrait convertir tout en minuscules sauf la première lettre", () => {
    expect(capitalize("BONJOUR")).toBe("Bonjour");
  });

  it("devrait supprimer les espaces autour du texte", () => {
    expect(capitalize("   test  ")).toBe("Test");
  });

  it("devrait garder les caractères spéciaux après la première lettre", () => {
    expect(capitalize("éTé")).toBe("Été");
  });

  it("devrait gérer un seul caractère", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("Z")).toBe("Z");
  });
});
