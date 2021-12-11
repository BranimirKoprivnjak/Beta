import { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import { getNumber, numberWithCommas } from '../../helpers/helpers';
import useHttp from '../../hooks/use-http';

import classes from './MarketData.module.css';

const MarketData: React.FC<{ id: string }> = ({ id }) => {
  const currency = useCustomSelector(statePara => statePara.state.currency);
  const [marketData, setMarketData] = useState<any>();

  const { fetchData } = useHttp();

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
      <div className={classes.name}>
        <img src={marketData?.image} />
        <p>{marketData?.name}</p>
      </div>
      <p>
        Price: <span>{marketData?.current_price}</span>
      </p>
      <p>
        Change:{' '}
        <span style={{ color: style.change24h }}>
          {marketData?.price_change_24h.toFixed(2)}
        </span>
      </p>
      <p>
        %Change:{' '}
        <span style={{ color: style.changePerc24h }}>
          {marketData?.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p>
        Market Cap: <span>{marketData?.market_cap}</span>
      </p>
      <p>
        Circulating Supply: <span>{marketData?.circulating_supply}</span>
      </p>
      <p>
        Total Volume: <span>{marketData?.total_volume}</span>
      </p>
    </div>
  );
};

export default MarketData;
