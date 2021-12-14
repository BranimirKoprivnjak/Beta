import { memo, useCallback } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import { useCustomDispatch } from '../../hooks/hooks';
import Card from './Card';
import { useDrop } from 'react-dnd';
import { cryptoActions } from '../../store/cryptocurrencies';
import { ItemTypes } from '../../models/drag&drop/drag&drop-models';
import classes from './Container.module.css';

import update from 'immutability-helper';

const Container: React.FC = memo(() => {
  const cryptocurrencies = useCustomSelector(
    state => state.crypto.cryptocurrencies
  );
  const dispatch = useCustomDispatch();

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const findCard = useCallback(
    (id: string) => {
      const [card] = cryptocurrencies.filter(c => `${c.id}` === id);
      return {
        card,
        index: cryptocurrencies.indexOf(card),
      };
    },
    [cryptocurrencies]
  );

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id);
      const newCryptocurrencies = update(cryptocurrencies, {
        $splice: [
          [index, 1],
          [atIndex, 0, card],
        ],
      });
      dispatch(cryptoActions.setCrypto(newCryptocurrencies));
    },
    [findCard, dispatch, cryptocurrencies]
  );

  return (
    <div className={classes.section} ref={drop}>
      {cryptocurrencies.map(item => (
        <Card
          key={item.id}
          id={item.id}
          moveCard={moveCard}
          findCard={findCard}
        />
      ))}
    </div>
  );
});

export default Container;
