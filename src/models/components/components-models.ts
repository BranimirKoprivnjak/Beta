export interface CryptoBasic {
  id: string;
  name: string;
  image: string;
}

export interface CryptoItem extends CryptoBasic {
  isChecked: boolean;
  onChange: (id: string) => void;
}

export interface MarketDataType extends CryptoBasic {
  price: string;
  change24h: number;
  changePerc24h: number;
  marketCap: string;
  circulatingSupply: string;
  totalVolume: string;
}
