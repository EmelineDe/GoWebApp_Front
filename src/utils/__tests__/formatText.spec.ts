import { describe, it, expect } from "vitest";
import { capitalize } from "../formatText";

describe("capitalize", () => {
  it("devrait retourner une string vide si le texte est vide", () => {
    expect(capitalize("")).toBe("");
  });

  /**
   * Test pour vérifier que la fonction capitalize capitalise la première lettre d'un mot en minuscules.
   */

  it("devrait capitaliser la première lettre d'un mot en minuscules", () => {
    expect(capitalize("bonjour")).toBe("Bonjour");
  });

  /**
   * Test pour vérifier que la fonction capitalize retourne un seul mot avec la première lettre en majuscule.
   */

  it("devrait retourner un seul mot avec la première lettre en majuscule", () => {
    expect(capitalize("salut")).toBe("Salut");
  });

  /**
   * Test pour vérifier que la fonction capitalize convertit tout en minuscules sauf la première lettre.
   */

  it("devrait convertir tout en minuscules sauf la première lettre", () => {
    expect(capitalize("BONJOUR")).toBe("Bonjour");
  });

  /**
   * Test pour vérifier que la fonction capitalize supprime les espaces autour du texte.
   */

  it("devrait supprimer les espaces autour du texte", () => {
    expect(capitalize("   test  ")).toBe("Test");
  });

  /**
   * Test pour vérifier que la fonction capitalize garde les caractères spéciaux après la première lettre.
   */

  it("devrait garder les caractères spéciaux après la première lettre", () => {
    expect(capitalize("éTé")).toBe("Été");
  });

  /**
   * Test pour vérifier que la fonction capitalize gère un seul caractère.
   */

  it("devrait gérer un seul caractère", () => {
    expect(capitalize("a")).toBe("A");
    expect(capitalize("Z")).toBe("Z");
  });
});
