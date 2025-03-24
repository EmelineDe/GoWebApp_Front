import { defineStore } from "pinia";

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: [
      {
        id: "plomberie",
        icon: new URL("@/assets/icons/plomberie.svg", import.meta.url).href,
        title: "Plomberie",
        color: "#FF5252",
      },
      {
        id: "electricite",
        icon: new URL("@/assets/icons/electricite.svg", import.meta.url).href,
        title: "Électricité",
        color: "#FF5252",
      },
      {
        id: "chauffage",
        icon: new URL("@/assets/icons/chauffage.svg", import.meta.url).href,
        title: "Chauffage",
        color: "#FF5252",
      },
      {
        id: "serrurerie",
        icon: new URL("@/assets/icons/serrurerie.svg", import.meta.url).href,
        title: "Serrurerie",
        color: "#FF5252",
      },
      {
        id: "vitrerie",
        icon: new URL("@/assets/icons/vitrerie.svg", import.meta.url).href,
        title: "Vitrerie",
        color: "#FF5252",
      },
      {
        id: "electromenager",
        icon: new URL("@/assets/icons/electromenager.svg", import.meta.url)
          .href,
        title: "Électroménager",
        color: "#FF5252",
      },
    ],
    selectedService: null,
  }),

  getters: {
    getServices: (state) => state.services,
    getSelectedService: (state) => state.selectedService,
    getServiceById: (state) => (id) => {
      return state.services.find((service) => service.id === id);
    },
  },

  actions: {
    selectService(serviceId) {
      this.selectedService = this.getServiceById(serviceId);
    },
  },
});
