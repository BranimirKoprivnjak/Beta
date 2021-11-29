import { useState } from 'react';

import { CheckedCryptos } from '../../models/models';
import classes from './Crypto.module.css';

const Crypto: React.FC<CheckedCryptos> = props => {
  return (
    <li className={classes['list-item']}>
      <div className={classes.radio}>
        <input
          type="checkbox"
          id={props.id}
          onChange={props.onChange.bind(null, props.id)}
        />
        <label htmlFor={props.id}></label>
      </div>
      <img src={props.image} />
      <div>{props.name}</div>
    </li>
  );
};

export default Crypto;
