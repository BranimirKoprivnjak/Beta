import { useEffect, useState } from 'react';
import { useCustomSelector } from '../../hooks/hooks';
import useHttp from '../../hooks/use-http';
import { getNumber, numberWithCommas } from '../../helpers/helpers';
import { MarketDataType } from '../../models/components/components-models';
import classes from './MarketData.module.css';

const MarketData: React.FC<{ id: string }> = ({ id }) => {
  const currency = useCustomSelector(state => state.fiat.fiatCurrency);
  const [marketData, setMarketData] = useState<MarketDataType>();
  const [styles, setStyles] = useState<{
    change24h: string;
    changePerc24h: string;
  }>({ change24h: '', changePerc24h: '' });

  const { fetchData } = useHttp();

  useEffect(() => {
    const filterData = (data: any) => {
      const [dataObj] = data;
      const {
        id,
        name,
        image,
        current_price: price,
        price_change_24h: change24h,
        price_change_percentage_24h: changePerc24h,
        market_cap: marketCap,
        circulating_supply: circulatingSupply,
        total_volume: totalVolume,
      } = dataObj;

      const filteredData: MarketDataType = {
        id,
        name,
        image,
        price,
        change24h,
        changePerc24h,
        marketCap,
        circulatingSupply,
        totalVolume,
      };

      filteredData.marketCap = getNumber(+filteredData.marketCap);
      filteredData.price = numberWithCommas(+filteredData.price);
      filteredData.circulatingSupply = getNumber(
        +filteredData.circulatingSupply
      );
      filteredData.totalVolume = getNumber(+filteredData.totalVolume);

      setMarketData(filteredData);

      const green = 'rgb(110, 255, 174)',
        red = 'rgb(241, 43, 66)';

      setStyles({
        change24h: change24h > 0 ? green : red,
        changePerc24h: changePerc24h > 0 ? green : red,
      });
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`,
      },
      filterData
    );
  }, [id, currency, fetchData]);

  return (
    <div className={classes.container}>
      <div className={classes.name}>
        <img src={marketData?.image} alt={`${marketData?.name} logo`} />
        <p>{marketData?.name}</p>
      </div>
      <p>
        Price: <span>{marketData?.price}</span>
      </p>
      <p>
        Change:{' '}
        <span style={{ color: styles.change24h }}>
          {marketData?.change24h.toFixed(2)}
        </span>
      </p>
      <p>
        %Change:{' '}
        <span style={{ color: styles.changePerc24h }}>
          {marketData?.changePerc24h.toFixed(2)}%
        </span>
      </p>
      <p>
        Market Cap: <span>{marketData?.marketCap}</span>
      </p>
      <p>
        Circulating Supply: <span>{marketData?.circulatingSupply}</span>
      </p>
      <p>
        Total Volume: <span>{marketData?.totalVolume}</span>
      </p>
    </div>
  );
};

export default MarketData;
