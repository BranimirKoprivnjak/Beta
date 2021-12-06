import BasicInfo from './BasicInfo';
import classes from './CryptoItem.module.css';
import HistoryChart from './HistoryChart';
import OhlcChart from './OhlcChart';

const CryptoItem: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className={classes.container}>
      <BasicInfo id={id} />
      <HistoryChart id={id} />
      <OhlcChart id={id} />
    </div>
  );
};

export default CryptoItem;
