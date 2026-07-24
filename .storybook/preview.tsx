import type { Preview } from '@storybook/react-vite';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/styles/index.css';
import { mswHandlers } from './msw-handlers';

initialize({ onUnhandledRequest: 'bypass' });

// Suppress "Illegal invocation" errors from focus() calls in Docs addon
if (typeof window !== 'undefined') {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    const errorStr = String(args[0] ?? '');
    if (errorStr.includes('Illegal invocation') && errorStr.includes('focus')) {
      return;
    }
    originalError(...args);
  };
}

const preview: Preview = {
  decorators: [(Story) => <Story />],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
