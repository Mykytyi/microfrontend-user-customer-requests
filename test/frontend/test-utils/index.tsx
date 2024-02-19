import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import type { PreloadedState } from '@reduxjs/toolkit';
import locales from '../../../src/frontend/locales/locales';
import {
  AppStore,
  RootState,
  createStore,
} from '../../../src/frontend/redux/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store. For
// future dependencies, such as wanting to test with react-router, you can extend
// this interface to accept a path and route and use those in a <MemoryRouter />
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/** Follow https://redux.js.org/usage/writing-tests#setting-up-a-reusable-test-render-function
 * for more details on setting up a reusable test render function */
export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  const queryClient = new QueryClient();
  // eslint-disable-next-line @typescript-eslint/ban-types
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <QueryClientProvider client={queryClient}>
        <IntlProvider
          locale="de"
          messages={locales.de}
          onError={(error) => {
            if (error.code === 'MISSING_TRANSLATION') {
              return;
            }
            console.error(error);
          }}
        >
          <Provider store={store}>{children}</Provider>
        </IntlProvider>
      </QueryClientProvider>
    );
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
