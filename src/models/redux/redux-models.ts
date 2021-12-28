import { ChartTypeRegistry } from 'chart.js';
import store from '../../store/redux';

// cryptocurrencies
export interface Cryptocurrency {
  id: string;
  historyChart: {
    options: {
      interval: string;
      type: keyof ChartTypeRegistry;
      color: string;
    };
  };
  ohlcChart: {
    options: {
      interval: string;
    };
  };
}

export interface Cryptocurrencies {
  cryptocurrencies: Cryptocurrency[];
}

// fiat currency
export interface FiatCurrency {
  fiatCurrency: string;
}

// add modal
export interface AddModal {
  addModalIsShown: boolean;
}

// select chart
export interface SelectedChart {
  selectedChart: string;
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
