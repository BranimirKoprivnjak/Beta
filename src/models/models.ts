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
