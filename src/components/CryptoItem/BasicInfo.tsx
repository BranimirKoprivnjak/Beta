import { useEffect, useState } from 'react';

import { CryptoItemType } from '../../models/models';

import classes from './BasicInfo.module.css';

const BasicInfo: React.FC<{ id: string }> = ({ id }) => {
  const [info, setInfo] = useState<CryptoItemType>();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      const data = await response.json();
      const {
        image: { small: logo },
        name,
        market_data: {
          current_price: { usd: price },
          market_cap: { usd: marketCap },
          price_change_24h: change24h,
          price_change_percentage_24h: changePerc24h,
        },
      } = data;

      const filteredData = {
        logo,
        name,
        price,
        marketCap,
        change24h,
        changePerc24h,
      };

      setInfo(filteredData);
    };
    fetchData();
  }, [id]);

  // idea -> put this in reducer or state
  let style = { change24h: '', changePerc24h: '' };
  if (info !== undefined) {
    style.change24h = info?.change24h > 0 ? 'green' : 'red';
    style.changePerc24h = info?.changePerc24h > 0 ? 'green' : 'red';
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={info?.logo} className={classes.logo} />
        <p>{info?.name}</p>
      </div>
      <p>Price: {info?.price}</p>
      <p>
        Change:{' '}
        <span style={{ color: style.change24h }}>
          {info?.change24h.toFixed(2)}
        </span>
      </p>
      <p>
        %Change:{' '}
        <span style={{ color: style.changePerc24h }}>
          {info?.changePerc24h.toFixed(2)}%
        </span>
      </p>
      <p>Market cap: {info?.marketCap}</p>
    </div>
  );
};

export default BasicInfo;
