export const ItemTypes = {
  CARD: 'card',
};

export interface CardType {
  id: string;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}
