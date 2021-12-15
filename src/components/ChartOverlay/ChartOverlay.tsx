import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import { cryptoActions } from '../../store/cryptocurrencies';
import HistoryChart from '../Charts/HistoryChart';
import OhlcChart from '../Charts/OhlcChart';
import { SUPPORTED_INTERVALS } from '../../config/config';
import classes from './ChartOverlay.module.css';

const ChartOverlay: React.FC<{ id: string }> = ({ id }) => {
  const selectedChart = useCustomSelector(
    state => state.selected.selectedChart
  );
  const dispatch = useCustomDispatch();
  const [selectedComponent, setSelectedComponent] =
    useState<string>(selectedChart);

  const [crypto] = useCustomSelector(state =>
    state.crypto.cryptocurrencies.filter(item => item.id === id)
  );

  const { historyChart, ohlcChart } = crypto;

  const interval =
    selectedComponent === 'HistoryChart'
      ? historyChart.options.interval
      : ohlcChart.options.interval;

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.currentTarget.value);
  };

  const clickHandler = (interval: string) => {
    dispatch(
      cryptoActions.updateDays({
        interval,
        id,
        chartName: selectedComponent,
      })
    );
  };

  return (
    <>
      <h2 className={classes.title}>{id}</h2>
      <div className={classes.toolbar}>
        <select
          className={classes.dropdown}
          value={selectedComponent}
          onChange={changeHandler}
        >
          <option value="HistoryChart">History Chart</option>
          <option value="OhlcChart">Ohlc Chart</option>
        </select>
        <p className={classes.interval}>Interval:</p>
        <ul className={classes.list}>
          {SUPPORTED_INTERVALS.map(int => (
            <li
              key={int}
              value={int}
              className={interval === int ? classes.picked : ''}
              onClick={clickHandler.bind(null, int)}
            >
              {int}
            </li>
          ))}
        </ul>
      </div>
      {selectedComponent === 'HistoryChart' && (
        <HistoryChart id={id} cssClass="detail" />
      )}
      {selectedComponent === 'OhlcChart' && (
        <OhlcChart id={id} cssClass="detail" />
      )}
    </>
  );
};

export default ChartOverlay;
