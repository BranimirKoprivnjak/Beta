import store from '../store/redux';

export interface AvailableCryptos {
  id: string;
  name: string;
  image: string;
}

export interface CheckedCryptos {
  id: string;
  name: string;
  image: string;
  onChange: (id: string) => void;
}

export interface MarketData {
  logo: string;
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
  changePerc24h: number;
}

export interface OnClose {
  onClose: () => void;
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
