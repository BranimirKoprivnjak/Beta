import { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import useHttp from '../../hooks/use-http';

import classes from './BasicInfo.module.css';

const BasicInfo: React.FC<{ id: string }> = ({ id }) => {
  const currency = useCustomSelector(statePara => statePara.state.currency);
  const [marketData, setMarketData] = useState<any>();

  const { fetchData } = useHttp();

  function getNumber(num: number) {
    var units = ['M', 'B', 'T', 'Q'];
    var unit = Math.floor((num / 1.0e1).toFixed(0).toString().length);
    var r = unit % 3;
    var x = Math.abs(Number(num)) / Number('1.0e+' + (unit - r));
    return x.toFixed(2) + units[Math.floor(unit / 3) - 2];
  }

  // add comma as thousand seperator
  const numberWithCommas = (num: number) => {
    return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    const filterData = (data: any) => {
      const [market_data] = data;
      market_data.market_cap = getNumber(market_data.market_cap);
      market_data.current_price = numberWithCommas(market_data.current_price);
      market_data.circulating_supply = getNumber(
        market_data.circulating_supply
      );
      market_data.total_volume = getNumber(market_data.total_volume);
      setMarketData(market_data);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`,
      },
      filterData
    );
  }, [id, currency, fetchData]);

  // idea -> put this in reducer or state
  let style = { change24h: '', changePerc24h: '' };
  if (marketData !== undefined) {
    style.change24h =
      marketData?.price_change_24h > 0
        ? 'rgb(110, 255, 174)'
        : 'rgb(241, 43, 66)';
    style.changePerc24h =
      marketData?.price_change_percentage_24h > 0
        ? 'rgb(110, 255, 174)'
        : 'rgb(241, 43, 66)';
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <img src={marketData?.image} className={classes.logo} />
        <p style={{ fontWeight: '500' }}>{marketData?.name}</p>
      </div>
      <p>
        <span style={{ fontWeight: '300' }}>Price</span>:{' '}
        <span style={{ fontWeight: '500' }}>{marketData?.current_price}</span>
      </p>
      <p>
        <span style={{ fontWeight: '300' }}>Change:</span>{' '}
        <span style={{ color: style.change24h, fontWeight: '500' }}>
          {marketData?.price_change_24h.toFixed(2)}
        </span>
      </p>
      <p>
        <span style={{ fontWeight: '300' }}>%Change:</span>{' '}
        <span style={{ color: style.changePerc24h, fontWeight: '500' }}>
          {marketData?.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p>
        <span style={{ fontWeight: '300' }}>Market cap:</span>{' '}
        <span style={{ fontWeight: '500' }}>{marketData?.market_cap}</span>
      </p>
      <p>
        <span style={{ fontWeight: '300' }}>Circulating supply:</span>{' '}
        <span style={{ fontWeight: '500' }}>
          {marketData?.circulating_supply}
        </span>
      </p>
      <p>
        <span style={{ fontWeight: '300' }}>Total volume:</span>{' '}
        <span style={{ fontWeight: '500' }}>{marketData?.total_volume}</span>
      </p>
    </div>
  );
};

export default BasicInfo;

// {' '} add space between words
