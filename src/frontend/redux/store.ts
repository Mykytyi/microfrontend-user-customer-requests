import {
  configureStore,
  compose,
  PreloadedState,
  ThunkDispatch,
  AnyAction,
} from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer';

const middlewares: any[] = [
  // casesApi.middleware,
];

// Enable redux devtools
const composeEnhancers = (process.env.NODE_ENV !== 'production'
    && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
  || compose;

/** Follow https://redux.js.org/style-guide#structure-files-as-feature-folders-with-single-file-logic
 * for project structure details. We create a store function for better reuse. */
export const createStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
  reducer: rootReducer,
  devTools: composeEnhancers,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppStore = ReturnType<typeof createStore>;
