/**
 * Custom JSX runtime for vanilla TypeScript
 * Creates real DOM elements from JSX syntax
 */

type Props = Record<string, any> | null;
type Child = HTMLElement | DocumentFragment | Text | string | number | boolean | null | undefined;

/**
 * JSX factory function - creates DOM elements from JSX
 * @param tag - Element tag name or component function
 * @param props - Element properties and attributes
 * @param children - Child elements
 */
export function h(
  tag: string | ((props: Props) => HTMLElement | DocumentFragment),
  props: Props,
  ...children: Child[]
): HTMLElement | DocumentFragment {
  // If tag is a function (component), call it with props
  if (typeof tag === "function") {
    return tag({ ...props, children });
  }

  // Create DOM element
  const element = document.createElement(tag);

  // Apply props
  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (key === "className") {
        // Handle className
        element.className = value;
      } else if (key.startsWith("on") && typeof value === "function") {
        // Handle event listeners (onClick, onInput, etc.)
        const eventName = key.substring(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else if (key === "style" && typeof value === "object") {
        // Handle style object
        Object.assign(element.style, value);
      } else if (key === "ref" && typeof value === "function") {
        // Handle ref callback
        value(element);
      } else if (key !== "children") {
        // Handle regular attributes
        element.setAttribute(key, value);
      }
    }
  }

  // Append children
  appendChildren(element, children);

  return element;
}

/**
 * Fragment - returns a DocumentFragment for grouping without wrapper
 */
export function Fragment(props: { children?: Child[] }): DocumentFragment {
  const fragment = document.createDocumentFragment();
  if (props.children) {
    appendChildren(fragment, props.children);
  }
  return fragment;
}

/**
 * Helper to append children to a parent element
 */
function appendChildren(parent: HTMLElement | DocumentFragment, children: Child[]): void {
  for (const child of children) {
    if (child == null || child === false || child === true) {
      // Skip null, undefined, and booleans
      continue;
    }

    if (Array.isArray(child)) {
      // Recursively handle arrays
      appendChildren(parent, child);
    } else if (typeof child === "string" || typeof child === "number") {
      // Convert strings and numbers to text nodes
      parent.appendChild(document.createTextNode(String(child)));
    } else if (child instanceof Node) {
      // Append DOM nodes directly
      parent.appendChild(child);
    }
  }
}
