import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import { createTestingPinia } from "@pinia/testing";
import { useRouter } from "vue-router";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";

vi.mock("vue-router", () => ({
  useRouter: vi.fn(),
}));

describe("HomeView.vue", () => {
  let routerPush: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    routerPush = vi.fn();
    (useRouter as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      push: routerPush,
    });
  });

  it("affiche tous les services", () => {
    const wrapper = shallowMount(HomeView, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const cards = wrapper.findAll(".service-card");

    expect(cards.length).toBe(6);
  });

  it("navigue vers la page service si le service est activé", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              service: {
                services: [
                  {
                    id: "plomberie",
                    icon: "test-icon.svg",
                    title: "Plomberie",
                    color: "#FF5252",
                    enabled: true,
                  },
                ],
                selectedService: null,
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    await wrapper.find(".service-card").trigger("click");

    expect(routerPush).toHaveBeenCalledWith({
      name: "service",
      params: { type: "plomberie" },
    });
  });

  it("ne navigue pas si le service est désactivé", async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              service: {
                services: [
                  {
                    id: "serrurerie",
                    icon: "test-icon.svg",
                    title: "Serrurerie",
                    color: "#FF5252",
                    enabled: false,
                  },
                ],
                selectedService: null,
              },
            },
            stubActions: false,
          }),
        ],
      },
    });

    await wrapper.find(".service-card").trigger("click");

    expect(routerPush).not.toHaveBeenCalled();
  });
});
