import { configureStore } from '@reduxjs/toolkit';

import fiatReducer from './fiat-currency';
import cryptoReducer from './cryptocurrencies';
import modalReducer from './modal';
import selectedReducer from './selected-chart';

const store = configureStore({
  reducer: {
    crypto: cryptoReducer,
    fiat: fiatReducer,
    modal: modalReducer,
    selected: selectedReducer,
  },
});

export default store;
