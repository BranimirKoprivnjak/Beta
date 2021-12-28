import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cryptocurrency, Cryptocurrencies } from '../models/redux/redux-models';

import { ChartTypeRegistry } from 'chart.js';

import cloneDeep from 'lodash.clonedeep';

const initialCryptocurrencies: Cryptocurrencies = {
  cryptocurrencies: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: initialCryptocurrencies,
  reducers: {
    updateCrypto(
      state: Cryptocurrencies,
      action: PayloadAction<Cryptocurrency[]>
    ) {
      const cryptos = state.cryptocurrencies,
        payload = action.payload;

      const deepCryptos = cloneDeep(cryptos);

      for (let i = 0; i < cryptos.length; i++) {
        const index = payload.findIndex(
          crypto => crypto.id === deepCryptos[i].id
        );
        // if index exists, slice crypto from payload
        if (index !== -1) payload.splice(index, 1);
        // if crypto doesnt exists, slice it from state
        else {
          cryptos.splice(i, 1);
          i--;
        }
      }

      // push new cryptos from paylaod
      payload.forEach(newCrypto => cryptos.push(newCrypto));
    },

    // for drag and drop functionality
    setCrypto(
      state: Cryptocurrencies,
      action: PayloadAction<Cryptocurrency[]>
    ) {
      state.cryptocurrencies = action.payload;
    },

    updateInterval(
      state: Cryptocurrencies,
      action: PayloadAction<{ id: string; interval: string; chartName: string }>
    ) {
      const cryptos = state.cryptocurrencies;
      const { id, interval, chartName } = action.payload;

      const index = cryptos.findIndex(crypto => crypto.id === id);

      const cryptoIndex = cryptos[index];
      const { historyChart, ohlcChart } = cryptoIndex;

      if (chartName === 'HistoryChart')
        historyChart.options.interval = interval;
      else ohlcChart.options.interval = interval;
    },

    updateChartType(
      state: Cryptocurrencies,
      action: PayloadAction<{ id: string; chartType: keyof ChartTypeRegistry }>
    ) {
      const cryptos = state.cryptocurrencies;
      const { id, chartType } = action.payload;

      const index = cryptos.findIndex(crypto => crypto.id === id);

      const cryptoIndex = cryptos[index];
      cryptoIndex.historyChart.options.type = chartType;
    },

    updateChartColor(
      state: Cryptocurrencies,
      action: PayloadAction<{ id: string; color: string }>
    ) {
      const cryptos = state.cryptocurrencies;
      const { id, color } = action.payload;

      const index = cryptos.findIndex(crypto => crypto.id === id);

      const cryptoIndex = cryptos[index];
      cryptoIndex.historyChart.options.color = color;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice.reducer;
