import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import MarketData from './MarketData';
import classes from './Card.module.css';
import HistoryChart from '../Charts/HistoryChart';
import OhlcChart from '../Charts/OhlcChart';
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';

import { ItemTypes } from '../../models/models';
import { CardProps } from '../../models/models';
import { Item } from '../../models/models';
import { stateActions } from '../../store/redux';

const Card: React.FC<CardProps> = memo(function CryptoItem({
  id,
  moveCard,
  findCard,
}) {
  const dispatch = useCustomDispatch();
  const cryptocurrencies = useCustomSelector(
    statePara => statePara.state.cryptocurrencies
  );
  const originalIndex = findCard(id).index;
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item;
        const didDrop = monitor.didDrop();
        if (!didDrop) moveCard(droppedId, originalIndex);
      },
    }),
    [id, originalIndex, moveCard]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      canDrop: () => false,
      hover({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id);
          moveCard(draggedId, overIndex);
        }
      },
    }),
    [findCard, moveCard]
  );
  const opacity = isDragging ? 0 : 1;

  const removeItemHandler = (id: string) => {
    dispatch(
      stateActions.changeCrypto(cryptocurrencies.filter(item => item !== id))
    );
  };

  return (
    <div
      className={`${classes.container} ${classes.grabbable}`}
      ref={node => drag(drop(node))}
      style={{ opacity }}
    >
      <MarketData id={id} />
      <HistoryChart id={id} />
      <OhlcChart id={id} />
      <div className={classes.toolbox}>
        <div className={classes.settings}></div>
        <a
          href="#"
          className={classes['close-button']}
          onClick={removeItemHandler.bind(null, id)}
        ></a>
      </div>
    </div>
  );
});

export default Card;
