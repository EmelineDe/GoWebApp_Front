import { vi } from "vitest";

/**
 * Fonction mock pour simuler la sélection d'un service dans les tests.
 */

const selectServiceMock = vi.fn();

/**
 * Données mockées pour les services utilisés dans les tests. Chaque service est représenté par un objet
 * contenant l'identifiant, le titre, l'icône, la couleur et un indicateur d'activation.
 */

export const servicesMock = [
  {
    id: "plomberie",
    title: "Plomberie",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: true,
  },
  {
    id: "electricite",
    title: "Électricité",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: false,
  },
  {
    id: "chauffage",
    title: "Chauffage",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: false,
  },
  {
    id: "serrurerie",
    title: "Serrurerie",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: false,
  },
  {
    id: "vitrerie",
    title: "Vitrerie",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: false,
  },
  {
    id: "electromenager",
    title: "Électroménager",
    icon: "icon.svg",
    color: "#FF5252",
    enabled: false,
  },
];

export { selectServiceMock };
