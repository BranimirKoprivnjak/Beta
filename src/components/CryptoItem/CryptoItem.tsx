import { memo } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import BasicInfo from './BasicInfo';
import classes from './CryptoItem.module.css';
import HistoryChart from './HistoryChart';
import OhlcChart from './OhlcChart';

import { ItemTypes } from '../../models/models';
import { CardProps } from '../../models/models';
import { Item } from '../../models/models';

const CryptoItem: React.FC<CardProps> = memo(function CryptoItem({
  id,
  moveCard,
  findCard,
}) {
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
  return (
    <div
      className={`${classes.container} ${classes.grabbable}`}
      ref={node => drag(drop(node))}
      style={{ opacity }}
    >
      <BasicInfo id={id} />
      <HistoryChart id={id} />
      <OhlcChart id={id} />
    </div>
  );
});

export default CryptoItem;
