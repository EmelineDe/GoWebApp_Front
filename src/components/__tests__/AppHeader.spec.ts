import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppHeader from "../AppHeader.vue";

describe("AppHeader", () => {
  /**
   * Test pour vérifier que le composant est rendu correctement.
   */

  it("renders the component correctly", () => {
    const wrapper = mount(AppHeader);

    expect(wrapper.vm).toBeTruthy();

    const logo = wrapper.find(".logo");
    expect(logo.text()).toBe("Depannage App");

    const dot = wrapper.find(".dot");
    expect(dot.text()).toBe(".");

    const contact = wrapper.find(".contact");
    expect(contact.text()).toBe("Contact");
  });

  /**
   * Test pour vérifier que les classes correctes sont appliquées.
   */

  it("has the correct classes applied", () => {
    const wrapper = mount(AppHeader);

    const logoContainer = wrapper.find(".logo-container");
    expect(logoContainer.classes()).toContain("logo-container");

    const contact = wrapper.find(".contact");
    expect(contact.classes()).toContain("contact");
  });
});
