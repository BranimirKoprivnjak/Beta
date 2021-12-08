import store from '../store/redux';

export interface AvailableCryptos {
  id: string;
  name: string;
  image: string;
}

export interface Crypto {
  id: string;
  name: string;
  image: string;
  isChecked: boolean;
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

export const ItemTypes = {
  CARD: 'card',
};

export interface CardProps {
  id: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}

export interface Item {
  id: string;
  originalIndex: number;
}

// custom redux hooks types, https://redux.js.org/usage/usage-with-typescript
export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
