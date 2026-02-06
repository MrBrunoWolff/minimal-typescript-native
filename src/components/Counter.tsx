import { h } from "../jsx-runtime";

/**
 * Counter component demonstrating JSX + vanilla TypeScript integration
 * JSX is used for templating, vanilla DOM handles interactions
 */

interface CounterProps {
  initialCount: number;
}

export function Counter({ initialCount }: CounterProps): HTMLElement {
  let count = initialCount;

  const display = (<div className="counter-display">{count}</div>) as HTMLDivElement;

  const pulseAnimation = () => {
    display.classList.add("pulse");
    setTimeout(() => display.classList.remove("pulse"), 300);
  };

  const incrementBtn = (
    <button
      className="counter-btn increment"
      onClick={() => {
        count++;
        display.textContent = String(count);
        pulseAnimation();
      }}
    >
      +
    </button>
  ) as HTMLButtonElement;

  const decrementBtn = (
    <button
      className="counter-btn decrement"
      onClick={() => {
        count--;
        display.textContent = String(count);
        pulseAnimation();
      }}
    >
      -
    </button>
  ) as HTMLButtonElement;

  const resetBtn = (
    <button
      className="counter-btn reset"
      onClick={() => {
        count = 0;
        display.textContent = "0";
        pulseAnimation();
      }}
    >
      Reset
    </button>
  ) as HTMLButtonElement;

  return (
    <div className="counter">
      <h2>Counter Component</h2>
      <p className="subtitle">Built with JSX + vanilla TypeScript</p>

      <div className="counter-display-wrapper">{display}</div>

      <div className="counter-controls">
        {decrementBtn}
        {resetBtn}
        {incrementBtn}
      </div>

      <div className="info">
        <small>Click buttons to interact (vanilla DOM event handlers)</small>
      </div>
    </div>
  ) as HTMLElement;
}
