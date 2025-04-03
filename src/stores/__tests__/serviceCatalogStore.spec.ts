import { setActivePinia, createPinia } from "pinia";
import { describe, it, expect, beforeEach } from "vitest";
import { serviceCatalogStore } from "@/stores/serviceCatalogStore";

describe("serviceCatalogStore", () => {
  let store: ReturnType<typeof serviceCatalogStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = serviceCatalogStore();
  });

  /**
   * Test pour vérifier que le store contient des services prédéfinis.
   */

  it("should contain predefined services", () => {
    expect(store.services.length).toBeGreaterThan(0);
  });

  /**
   * Test pour vérifier que le service est retourné par son identifiant.
   */

  it("should return service by id", () => {
    const service = store.getServiceById("plomberie");
    expect(service).toBeDefined();
    expect(service?.title).toBe("Plomberie");
  });

  /**
   * Test pour vérifier que le service est undefined si l'identifiant est inconnu.
   */

  it("should return undefined for unknown service id", () => {
    const service = store.getServiceById("inconnu");
    expect(service).toBeUndefined();
  });

  /**
   * Test pour vérifier que le service est sélectionné par son identifiant.
   */

  it("should select a service by id", () => {
    store.selectService("plomberie");
    expect(store.selectedService?.id).toBe("plomberie");
  });

  /**
   * Test pour vérifier que le service est null si l'identifiant est invalide.
   */

  it("should set selectedService to null if id not found", () => {
    store.selectService("invalide");
    expect(store.selectedService).toBeNull();
  });

  /**
   * Test pour vérifier que les getters retournent les valeurs correctes.
   */

  it("getters should return correct values", () => {
    expect(store.getServices).toEqual(store.services);
    expect(store.getSelectedService).toBeNull();
  });
});
