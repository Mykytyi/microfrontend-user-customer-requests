import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { WidgetConfig } from '../type-definitions';

const initialState: WidgetConfig = {
  caseOwner: undefined,
  view: null,
  appId: '',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setConfig(state, action: PayloadAction<WidgetConfig>) {
      const { caseOwner, view } = action.payload;
      // Classic approach: return { ...state, partyId, restProxyPath };
      // With createSlice, one can write "mutating" immutable updates
      state.caseOwner = caseOwner;
      state.view = view;
    },
  },
});

export const { setConfig } = configSlice.actions;
export default configSlice.reducer;
