import { h } from "./jsx-runtime";
import { Counter } from "./components/Counter";
import { formatDate } from "./utils/helpers";

/**
 * Initialize the app when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 TypeScript Native + Bun + tsgo + Oxc");

  const app = document.getElementById("app");
  if (!app) {
    console.error("App container not found");
    return;
  }

  // Create welcome message using JSX
  const welcomeEl = (
    <div className="welcome">Welcome! Today is {formatDate(new Date())}</div>
  ) as HTMLElement;

  app.appendChild(welcomeEl);

  // Add counter component
  const counterContainer = (<div className="counter-container"></div>) as HTMLElement;

  app.appendChild(counterContainer);

  // Render Counter component
  const counter = Counter({ initialCount: 0 });
  counterContainer.appendChild(counter);
});
