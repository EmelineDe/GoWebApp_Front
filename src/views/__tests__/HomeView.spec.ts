import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { createTestingPinia } from "@pinia/testing";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({ components, directives });

describe("HomeView.vue", () => {
  it("affiche tous les services", () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          vuetify,
          createTestingPinia({
            stubActions: false,
            initialState: {
              service: {
                services: [
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
                ],
              },
            },
          }),
        ],
      },
    });

    const cards = wrapper.findAll(".service-card");
    expect(cards.length).toBe(6);
  });
});
