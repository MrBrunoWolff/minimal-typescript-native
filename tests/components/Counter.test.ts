/// <reference lib="dom" />

import { test, expect, describe, beforeEach } from "bun:test";
import { Counter } from "../../src/components/Counter";

describe("Counter Component", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders with initial count", () => {
    const counter = Counter({ initialCount: 5 });
    document.body.appendChild(counter);

    const display = document.querySelector(".counter-display") as HTMLElement;
    expect(display.textContent).toBe("5");
  });

  test("renders with zero as initial count", () => {
    const counter = Counter({ initialCount: 0 });
    document.body.appendChild(counter);

    const display = document.querySelector(".counter-display") as HTMLElement;
    expect(display.textContent).toBe("0");
  });

  test("has all required buttons", () => {
    const counter = Counter({ initialCount: 0 });
    document.body.appendChild(counter);

    expect(document.querySelectorAll(".counter-btn.increment").length).toBe(1);
    expect(document.querySelectorAll(".counter-btn.decrement").length).toBe(1);
    expect(document.querySelectorAll(".counter-btn.reset").length).toBe(1);
  });

  test("increment button increases count", () => {
    const counter = Counter({ initialCount: 0 });
    document.body.appendChild(counter);

    const incrementBtn = document.querySelector(".counter-btn.increment") as HTMLButtonElement;
    const display = document.querySelector(".counter-display") as HTMLElement;

    incrementBtn.click();
    expect(display.textContent).toBe("1");

    incrementBtn.click();
    expect(display.textContent).toBe("2");
  });

  test("decrement button decreases count", () => {
    const counter = Counter({ initialCount: 5 });
    document.body.appendChild(counter);

    const decrementBtn = document.querySelector(".counter-btn.decrement") as HTMLButtonElement;
    const display = document.querySelector(".counter-display") as HTMLElement;

    decrementBtn.click();
    expect(display.textContent).toBe("4");

    decrementBtn.click();
    expect(display.textContent).toBe("3");
  });

  test("reset button sets count to zero", () => {
    const counter = Counter({ initialCount: 42 });
    document.body.appendChild(counter);

    const resetBtn = document.querySelector(".counter-btn.reset") as HTMLButtonElement;
    const display = document.querySelector(".counter-display") as HTMLElement;

    resetBtn.click();
    expect(display.textContent).toBe("0");
  });

  test("DOM selectors work correctly", () => {
    const counter = Counter({ initialCount: 0 });
    document.body.appendChild(counter);

    // Test various DOM selectors
    expect(document.querySelectorAll(".counter").length).toBe(1);

    const h2 = document.querySelector("h2") as HTMLElement;
    expect(h2.textContent).toBe("Counter Component");

    expect(document.querySelectorAll(".subtitle").length).toBe(1);
    expect(document.querySelectorAll(".counter-controls").length).toBe(1);
  });

  test("pulse animation class is added and removed", async () => {
    const counter = Counter({ initialCount: 0 });
    document.body.appendChild(counter);

    const incrementBtn = document.querySelector(".counter-btn.increment") as HTMLButtonElement;
    const display = document.querySelector(".counter-display") as HTMLElement;

    incrementBtn.click();

    // Check that pulse class is added immediately
    expect(display.classList.contains("pulse")).toBe(true);

    // Wait for animation to complete
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Check that pulse class is removed
    expect(display.classList.contains("pulse")).toBe(false);
  });
});
