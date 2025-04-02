import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GoodToKnow from "../GoodToKnow.vue";

describe("GoodToKnow", () => {
  it("renders the title correctly", () => {
    const wrapper = mount(GoodToKnow);
    const title = wrapper.find(".good-to-know-title");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("Bon à savoir");
  });

  it("renders the image with correct src and alt attributes", () => {
    const wrapper = mount(GoodToKnow);
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBe("/src/assets/images/OIP.png");
    expect(img.attributes("alt")).toBe("image");
  });

  it("renders the paragraph content", () => {
    const wrapper = mount(GoodToKnow);
    const paragraph = wrapper.find(".good-to-know-text");
    expect(paragraph.exists()).toBe(true);
    expect(paragraph.text()).toContain("Vous faites face à des WC bouchés");
    expect(paragraph.text()).toContain("Le débouchage des WC");
  });

  it("applies the correct wrapper class to the card", () => {
    const wrapper = mount(GoodToKnow);
    const card = wrapper.find(".good-to-know-card");
    expect(card.exists()).toBe(true);
    expect(card.classes()).toContain("good-to-know-card");
  });
});
