/// <reference lib="dom" />

import { test, expect, describe } from "bun:test";
import { formatDate, createElement, debounce } from "../../src/utils/helpers";

describe("Helpers", () => {
  describe("formatDate", () => {
    test("formats date correctly", () => {
      const date = new Date("2026-01-21");
      const formatted = formatDate(date);

      expect(formatted).toContain("2026");
      expect(formatted).toContain("January");
    });
  });

  describe("createElement", () => {
    test("creates element with text", () => {
      const el = createElement("div", { text: "Hello World" });

      expect(el.tagName).toBe("DIV");
      expect(el.textContent).toBe("Hello World");
    });

    test("creates element with class", () => {
      const el = createElement("span", { class: "test-class" });

      expect(el.classList.contains("test-class")).toBe(true);
    });

    test("creates element with multiple attributes", () => {
      const el = createElement("a", {
        href: "https://example.com",
        class: "link",
        text: "Click me",
      });

      expect(el.getAttribute("href")).toBe("https://example.com");
      expect(el.classList.contains("link")).toBe(true);
      expect(el.textContent).toBe("Click me");
    });

    test("creates element with HTML content", () => {
      const el = createElement("div", {
        html: "<strong>Bold</strong> text",
      });

      expect(el.innerHTML).toBe("<strong>Bold</strong> text");
      expect(el.querySelectorAll("strong").length).toBe(1);
    });
  });

  describe("debounce", () => {
    test("delays function execution", async () => {
      let called = false;
      const fn = debounce(() => {
        called = true;
      }, 100);

      fn();
      expect(called).toBe(false);

      // Wait for debounce to complete
      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(called).toBe(true);
    });

    test("cancels previous calls", async () => {
      let count = 0;
      const fn = debounce(() => {
        count++;
      }, 100);

      fn(); // First call
      fn(); // Second call (should cancel first)
      fn(); // Third call (should cancel second)

      await new Promise((resolve) => setTimeout(resolve, 150));

      // Should only execute once (the last call)
      expect(count).toBe(1);
    });
  });
});
