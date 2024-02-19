import { combineReducers } from 'redux';
import configSlice from './configSlice';

export const rootReducer = combineReducers({
  config: configSlice,
});
