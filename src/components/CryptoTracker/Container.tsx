import { memo, useCallback } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import update from 'immutability-helper';
import { useDrop } from 'react-dnd';
import Card from './Card';
import { useCustomDispatch } from '../../hooks/hooks';

import { stateActions } from '../../store/redux';
import { ItemTypes } from '../../models/models';

import classes from './Container.module.css';

const Container: React.FC = memo(function Container() {
  const cryptocurrencies = useCustomSelector(s => s.state.cryptocurrencies);
  const dispatch = useCustomDispatch();

  const [, drop] = useDrop(() => ({ accept: ItemTypes.CARD }));

  const findCard = useCallback(
    (id: string) => {
      const [card] = cryptocurrencies.filter(c => `${c}` === id);
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
      dispatch(stateActions.changeCrypto(newCryptocurrencies));
    },
    [findCard, dispatch, cryptocurrencies]
  );

  return (
    <div className={classes.section} ref={drop}>
      {cryptocurrencies.map(id => (
        <Card key={id} id={id} moveCard={moveCard} findCard={findCard} />
      ))}
    </div>
  );
});

export default Container;
