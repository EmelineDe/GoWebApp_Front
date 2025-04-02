
import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";

describe("serviceCatalogStore", () => {
  let store: ReturnType<typeof serviceCatalogStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = serviceCatalogStore();
  });

  it("should contain predefined services", () => {
    expect(store.services.length).toBeGreaterThan(0);
  });

  it("should return service by id", () => {
    const service = store.getServiceById("plomberie");
    expect(service).toBeDefined();
    expect(service?.title).toBe("Plomberie");
  });

  it("should return undefined for unknown service id", () => {
    const service = store.getServiceById("inconnu");
    expect(service).toBeUndefined();
  });

  it("should select a service by id", () => {
    store.selectService("plomberie");
    expect(store.selectedService?.id).toBe("plomberie");
  });

  it("should set selectedService to null if id not found", () => {
    store.selectService("invalide");
    expect(store.selectedService).toBeNull();
  });

  it("getters should return correct values", () => {
    expect(store.getServices).toEqual(store.services);
    expect(store.getSelectedService).toBeNull();
  });
});
