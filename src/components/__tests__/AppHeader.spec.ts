import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import AppHeader from "../AppHeader.vue";

describe("AppHeader", () => {
  it("renders the component correctly", () => {
    const wrapper = mount(AppHeader);

    // Vérifie que le composant est une instance de Vue
    expect(wrapper.vm).toBeTruthy();

    // Teste le rendu du texte du logo
    const logo = wrapper.find(".logo");
    expect(logo.text()).toBe("Goweb");

    // Teste la présence du point après le logo
    const dot = wrapper.find(".dot");
    expect(dot.text()).toBe(".");

    // Teste le rendu du bloc Contact
    const contact = wrapper.find(".contact");
    expect(contact.text()).toBe("Contact");
  });

  it("has the correct classes applied", () => {
    const wrapper = mount(AppHeader);

    const logoContainer = wrapper.find(".logo-container");
    expect(logoContainer.classes()).toContain("logo-container");

    const contact = wrapper.find(".contact");
    expect(contact.classes()).toContain("contact");
  });
});
