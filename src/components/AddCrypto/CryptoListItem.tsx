import { CryptoItem } from '../../models/components/components-models';
import classes from './CryptoListItem.module.css';

const CryptoListItem: React.FC<CryptoItem> = props => {
  const { id, name, image, onChange, isChecked } = props;

  return (
    <li className={classes['list-item']}>
      <label className={classes.label}>
        <input
          type="checkbox"
          id={id}
          onChange={onChange.bind(null, id)}
          defaultChecked={isChecked}
        />
        <span className={classes.checkmark}></span>
        <img src={image} alt={`${name} logo`} />
        <p>{name}</p>
      </label>
    </li>
  );
};

export default CryptoListItem;
