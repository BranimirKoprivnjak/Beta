import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface State {
  cryptocurrencies: string[];
  currency: string;
}

const initialState: State = {
  cryptocurrencies: [],
  currency: 'usd',
};

const stateSlice = createSlice({
  name: 'state',
  initialState: initialState,
  reducers: {
    changeCrypto(state: State, action: PayloadAction<string[]>) {
      state.cryptocurrencies = action.payload;
    },
    updateCurrency(state: State, action: PayloadAction<string>) {
      state.currency = action.payload;
    },
  },
});

const store = configureStore({
  reducer: { state: stateSlice.reducer },
});

export const stateActions = stateSlice.actions;

export default store;
