import { memo, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import MarketData from './MarketData';
import classes from './Card.module.css';
import HistoryChart from '../Charts/HistoryChart';
import OhlcChart from '../Charts/OhlcChart';
import { useCustomSelector, useCustomDispatch } from '../../hooks/hooks';

import { ItemTypes, CardType } from '../../models/drag&drop/drag&drop-models';
import { cryptoActions } from '../../store/cryptocurrencies';
import { selectedActions } from '../../store/selected-chart';
import ChartModal from '../UI/ChartModal';

const Card: React.FC<CardType> = memo(({ id, moveCard, findCard }) => {
  const [chartModalIsShown, setChartModalIsShown] = useState<boolean>(false);
  const dispatch = useCustomDispatch();
  const cryptocurrencies = useCustomSelector(
    state => state.crypto.cryptocurrencies
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
      hover({ id: draggedId }: { id: string }) {
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
      cryptoActions.setCrypto(cryptocurrencies.filter(item => item.id !== id))
    );
  };

  const toggleModalHandler = () => {
    setChartModalIsShown(prev => !prev);
  };

  return (
    <div
      className={`${classes.container} ${classes.grabbable}`}
      ref={node => drag(drop(node))}
      style={{ opacity }}
    >
      <MarketData id={id} />
      <div
        onClick={() => {
          toggleModalHandler();
          dispatch(selectedActions.setDetail('HistoryChart'));
        }}
      >
        <HistoryChart id={id} cssClass="summary" />
      </div>
      <div
        onClick={() => {
          toggleModalHandler();
          dispatch(selectedActions.setDetail('OhlcChart'));
        }}
      >
        <OhlcChart id={id} cssClass="summary" />
      </div>
      <div className={classes.toolbox}>
        <div className={classes.settings} onClick={toggleModalHandler}></div>
        {chartModalIsShown && (
          <ChartModal id={id} onClose={toggleModalHandler} />
        )}
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
