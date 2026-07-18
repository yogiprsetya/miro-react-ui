import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
  cleanup();
});

// Polyfill for matchMedia in jsdom (used by sonner and other theme-aware components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Polyfill for Radix Select pointer capture in jsdom
if (typeof window !== 'undefined' && window.PointerEvent) {
  const originalPointerEvent = window.PointerEvent;
  window.PointerEvent = class PointerEvent extends originalPointerEvent {
    constructor(type: string, init?: PointerEventInit) {
      super(type, init);
      if (!('hasPointerCapture' in this)) {
        Object.defineProperty(this, 'hasPointerCapture', {
          value: () => false,
          writable: true,
          configurable: true,
        });
      }
    }
  };
}

if (typeof Element !== 'undefined' && !('hasPointerCapture' in Element.prototype)) {
  Object.assign(Element.prototype, {
    hasPointerCapture: () => false,
    setPointerCapture: () => {},
    releasePointerCapture: () => {},
    scrollIntoView: () => {},
  });
}

