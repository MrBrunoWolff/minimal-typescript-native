/**
 * JSX type definitions for custom JSX runtime
 */

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }

  interface Element extends HTMLElement {}

  interface ElementChildrenAttribute {
    children: {};
  }
}
