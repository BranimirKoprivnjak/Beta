import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FiatCurrency } from '../models/redux/redux-models';

const initialFiatState: FiatCurrency = { fiatCurrency: 'usd' };

const fiatSlice = createSlice({
  name: 'fiat',
  initialState: initialFiatState,
  reducers: {
    setFiatCurrency(state: FiatCurrency, action: PayloadAction<string>) {
      state.fiatCurrency = action.payload;
    },
  },
});

export const fiatActions = fiatSlice.actions;

export default fiatSlice.reducer;
