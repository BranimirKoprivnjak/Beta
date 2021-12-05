import { useEffect, useState } from 'react';

import { MarketData } from '../../models/models';

import classes from './BasicInfo.module.css';

const BasicInfo: React.FC<{ id: string }> = ({ id }) => {
  const [marketData, setMarketData] = useState<MarketData>();

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

      setMarketData(filteredData);
    };
    fetchData();
  }, [id]);

  // idea -> put this in reducer or state
  let style = { change24h: '', changePerc24h: '' };
  if (marketData !== undefined) {
    style.change24h = marketData?.change24h > 0 ? 'green' : 'red';
    style.changePerc24h = marketData?.changePerc24h > 0 ? 'green' : 'red';
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={marketData?.logo} className={classes.logo} />
        <p>{marketData?.name}</p>
      </div>
      <p>Price: {marketData?.price}</p>
      <p>
        Change:{' '}
        <span style={{ color: style.change24h }}>
          {marketData?.change24h.toFixed(2)}
        </span>
      </p>
      <p>
        %Change:{' '}
        <span style={{ color: style.changePerc24h }}>
          {marketData?.changePerc24h.toFixed(2)}%
        </span>
      </p>
      <p>Market cap: {marketData?.marketCap}</p>
    </div>
  );
};

export default BasicInfo;

// {' '} add space between words
