import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  cryptocurrencies: string[];
}

const initialState: State = {
  cryptocurrencies: [],
};

const stateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    changeCrypto(state: State, action: PayloadAction<string[]>) {
      state.cryptocurrencies = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { state: stateSlice.reducer },
});

export const stateActions = stateSlice.actions;

export default store;
