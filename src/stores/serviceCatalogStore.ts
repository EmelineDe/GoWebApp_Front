import { defineStore } from "pinia";
import type { Service } from "../interfaces/serviceInterface";

export const serviceCatalogStore = defineStore("service", {
  state: (): {
    services: Service[];
    selectedService: Service | null;
  } => ({
    services: [
      {
        id: "plomberie",
        icon: new URL("@/assets/icons/plomberie.svg", import.meta.url).href,
        title: "Plomberie",
        color: "#FF5252",
        enabled: true,
      },
      {
        id: "electricite",
        icon: new URL("@/assets/icons/electricite.svg", import.meta.url).href,
        title: "Électricité",
        color: "#FF5252",
        enabled: false,
      },
      {
        id: "chauffage",
        icon: new URL("@/assets/icons/chauffage.svg", import.meta.url).href,
        title: "Chauffage",
        color: "#FF5252",
        enabled: false,
      },
      {
        id: "serrurerie",
        icon: new URL("@/assets/icons/serrurerie.svg", import.meta.url).href,
        title: "Serrurerie",
        color: "#FF5252",
        enabled: false,
      },
      {
        id: "vitrerie",
        icon: new URL("@/assets/icons/vitrerie.svg", import.meta.url).href,
        title: "Vitrerie",
        color: "#FF5252",
        enabled: false,
      },
      {
        id: "electromenager",
        icon: new URL("@/assets/icons/electromenager.svg", import.meta.url)
          .href,
        title: "Électroménager",
        color: "#FF5252",
        enabled: false,
      },
    ],
    selectedService: null,
  }),

  getters: {
    /**
     * Récupère toutes les services.
     * @returns {Service[]} Liste des services.
     */

    getServices: (state): Service[] => state.services,

    /**
     * Récupère le service sélectionné.
     * @returns {Service | null} Service sélectionné ou null si aucun service n'est sélectionné.
     */

    getSelectedService: (state): Service | null => state.selectedService,

    /**
     * Récupère un service par son identifiant.
     * @param {string} id - L'identifiant du service.
     * @returns {Service | undefined} Service trouvé ou undefined si aucun service n'est trouvé.
     */

    getServiceById:
      (state) =>
      (id: string): Service | undefined => {
        return state.services.find((service) => service.id === id);
      },
  },

  actions: {
    /**
     * Sélectionne un service.
     * @param {string} serviceId - L'identifiant du service à sélectionner.
     */

    selectService(serviceId: string): void {
      this.selectedService = this.getServiceById(serviceId) ?? null;
    },
  },
});
