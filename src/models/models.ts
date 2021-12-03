import store from '../store/redux';

export interface State {
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

export interface CryptoItemType {
  logo: string;
  name: string;
  price: number;
  marketCap: number;
  change24h: number;
  changePerc24h: number;
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
