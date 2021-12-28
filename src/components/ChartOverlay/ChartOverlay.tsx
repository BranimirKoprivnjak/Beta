import { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import { SUPPORTED_INTERVALS } from '../../config/config';
import { cryptoActions } from '../../store/cryptocurrencies';
import HistoryChart from '../Charts/HistoryChart';
import OhlcChart from '../Charts/OhlcChart';
import { ChartTypeRegistry } from 'chart.js';
import ChartIcon from '../UI/ChartIcon';
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

  const intervalChangeHandler = (interval: string) => {
    dispatch(
      cryptoActions.updateInterval({
        interval,
        id,
        chartName: selectedComponent,
      })
    );
  };

  const typeChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      cryptoActions.updateChartType({
        id,
        chartType: event.currentTarget.value as keyof ChartTypeRegistry,
      })
    );
  };

  const colorChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      cryptoActions.updateChartColor({
        id,
        color: event.currentTarget.value,
      })
    );
  };

  const isHistorySelected = selectedComponent === 'HistoryChart';
  const isOhlcSelected = selectedComponent === 'OhlcChart';

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
        {isHistorySelected && (
          <>
            <ChartIcon />
            <select
              className={classes.dropdown}
              value={historyChart.options.type}
              onChange={typeChangeHandler}
            >
              <option value="line">Line</option>
              <option value="bar">Bar</option>
            </select>
            <input
              className={classes['color-input']}
              type="color"
              value={historyChart.options.color}
              onChange={colorChangeHandler}
            />
          </>
        )}
        <ul className={classes.intervals}>
          {SUPPORTED_INTERVALS.map(int => (
            <li
              key={int}
              value={int}
              className={interval === int ? classes['picked-interval'] : ''}
              onClick={intervalChangeHandler.bind(null, int)}
            >
              {int}
            </li>
          ))}
        </ul>
      </div>
      <p className={classes.text}>
        All the changes you do here, will be saved and added to the 'My
        cryptocurrencies' tab.
      </p>
      {isHistorySelected && <HistoryChart id={id} cssClass="detail" />}
      {isOhlcSelected && <OhlcChart id={id} cssClass="detail" />}
    </>
  );
};

export default ChartOverlay;
