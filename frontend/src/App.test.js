// @vitest-environment jsdom

import { mount } from "@vue/test-utils";
import { expect, test, vi } from "vitest";
import App from "./App.vue";

test("visar rubriken Biljettsystem", () => {
    global.fetch = vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve([])
        })
    );

    const wrapper = mount(App);

    expect(wrapper.text()).toContain("Biljettsystem");
});