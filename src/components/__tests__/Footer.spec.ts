import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Footer from "../Footer.vue";

describe("Footer", () => {
  /**
   * Test pour vérifier que le composant est rendu correctement.
   */

  it("renders the component correctly", () => {
    const wrapper = mount(Footer);

    expect(wrapper.vm).toBeTruthy();

    const footerText = wrapper.find(".footer-text");
    expect(footerText.text()).toBe("Depannage App.");

    const dot = wrapper.find(".dot");
    expect(dot.text()).toBe(".");
  });

  /**
   * Test pour vérifier que les classes correctes sont appliquées.
   */

  it("has the correct classes applied", () => {
    const wrapper = mount(Footer);

    const footer = wrapper.find(".footer");
    expect(footer.classes()).toContain("footer");

    const footerContent = wrapper.find(".footer-content");
    expect(footerContent.classes()).toContain("footer-content");
  });
});
