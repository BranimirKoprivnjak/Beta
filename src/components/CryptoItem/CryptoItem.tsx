import BasicInfo from './BasicInfo';
import classes from './CryptoItem.module.css';
import HistoryChart from './HistoryChart';

const CryptoItem: React.FC<{ id: string }> = ({ id }) => {
  return (
    <div className={classes.container}>
      <BasicInfo id={id} />
      <HistoryChart id={id} />
    </div>
  );
};

export default CryptoItem;
