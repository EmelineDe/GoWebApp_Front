import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// Mock store
import { selectServiceMock, servicesMock } from "./Mocks/HomeViewServiceMock";

vi.mock("@/stores/serviceCatalogStore", () => ({
  serviceCatalogStore: () => ({
    selectService: selectServiceMock,
    getServices: servicesMock,
  }),
}));

// Mock router
const pushMock = vi.fn();
vi.mock("vue-router", () => ({
  useRouter: () => ({ push: pushMock }),
}));

import HomeView from "@/views/HomeView.vue";

const vuetify = createVuetify({ components, directives });

describe("HomeView.vue", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Test pour vérifier que tous les services sont affichés.
   */

  it("affiche tous les services", () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [vuetify] },
    });

    const cards = wrapper.findAll(".service-card");
    expect(cards.length).toBe(servicesMock.length);
  });

  /**
   * Test pour vérifier que le composant redirige vers la page service si le service est activé.
   */

  it("redirige vers la page service si le service est activé", async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [vuetify] },
    });

    const cards = wrapper.findAll(".service-card");
    await cards[0].trigger("click");

    expect(selectServiceMock).toHaveBeenCalledWith("plomberie");
    expect(pushMock).toHaveBeenCalledWith({
      name: "service",
      params: { type: "plomberie" },
    });
  });

  /**
   * Test pour vérifier que le composant ne fait rien si le service est désactivé.
   */

  it("n'appelle rien si le service est désactivé", async () => {
    const wrapper = mount(HomeView, {
      global: { plugins: [vuetify] },
    });

    const cards = wrapper.findAll(".service-card");
    await cards[1].trigger("click");

    expect(selectServiceMock).not.toHaveBeenCalled();
    expect(pushMock).not.toHaveBeenCalled();
  });
});
