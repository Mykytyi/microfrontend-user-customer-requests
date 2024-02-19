import type { MashroomPortalAppPluginBootstrapFunction } from '@mashroom/mashroom-portal/type-definitions';
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import locales, { Languages } from './locales/locales';
import { createStore } from './redux/store';
import Widget from './components/widget/Widget';
import { setConfig } from './redux/configSlice';
import { ClientServicesContext } from './utils/context/ClientServicesContext';
import { ApiService } from './api/apiService';

const bootstrap: MashroomPortalAppPluginBootstrapFunction = (
  portalAppHostElement,
  portalAppSetup,
  clientServices,
) => {
  const {
    restProxyPaths,
    appConfig = {},
    appId,
    lang: passedLang,
    user,
  } = portalAppSetup || {};
  const { username } = user;
  const { view, caseOwner } = appConfig;
  const { tracer } = restProxyPaths || {};
  const queryClient = new QueryClient();
  const store = createStore();
  let lang: Languages = 'de';

  const restProxyPath = restProxyPaths?.bff || '/api';

  const handledUsername = caseOwner || username;

  ApiService.setBaseUrl(restProxyPath);
  ApiService.setTracerUrl(tracer);

  store.dispatch(setConfig({
    caseOwner: handledUsername,
    view,
    appId,
  }));

  switch (passedLang) {
    case 'en':
      lang = 'en';
      break;
    case 'de':
      lang = 'de';
      break;
    default:
      lang = 'de';
      break;
  }

  const root = createRoot(portalAppHostElement);

  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ClientServicesContext.Provider value={clientServices}>
          <IntlProvider
            locale={lang}
            defaultLocale="de"
            messages={locales[lang]}
            onError={(error) => {
              if (error.code === 'MISSING_TRANSLATION') {
                console.warn(error);
                return;
              }
              console.error(error);
            }}
          >
            <Widget />
          </IntlProvider>
        </ClientServicesContext.Provider>
      </Provider>
    </QueryClientProvider>,
  );

  return Promise.resolve({
    willBeRemoved: () => {
      root.unmount();
    },
  });
};

// eslint-disable-next-line no-underscore-dangle
(global as any).startupUserCustomersRequests = bootstrap;
