import React, { useState } from 'react';
import { useCustomDispatch, useCustomSelector } from '../../hooks/hooks';
import { cryptoActions } from '../../store/cryptocurrencies';
import HistoryChart from '../Charts/HistoryChart';
import OhlcChart from '../Charts/OhlcChart';
import { SUPPORTED_INTERVALS } from '../../config/config';

const ChartOverlay: React.FC<{ id: string }> = props => {
  const detail = useCustomSelector(state => state.selected.selectedChart);
  const dispatch = useCustomDispatch();
  const [selectedComponent, setSelectedComponent] = useState<string>(detail);

  const [crypto] = useCustomSelector(state =>
    state.crypto.cryptocurrencies.filter(item => item.id === props.id)
  );

  const { historyChart, ohlcChart } = crypto;

  const interval =
    selectedComponent === 'HistoryChart'
      ? historyChart.options.interval
      : ohlcChart.options.interval;

  const changeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.currentTarget.value);
  };

  const intervalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      cryptoActions.updateDays({
        interval: +event.currentTarget.value,
        id: props.id,
        chartName: detail,
      })
    );
  };

  // const typeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   dispatch(
  //     cryptoActions.updateType({
  //       id: props.id,
  //       type: event.currentTarget.value as keyof ChartTypeRegistry,
  //     })
  //   );
  // };

  return (
    <>
      <select value={selectedComponent} onChange={changeHandler}>
        <option value="HistoryChart">History Chart</option>
        <option value="OhlcChart">Ohlc Chart</option>
      </select>
      <select value={interval} onChange={intervalChange}>
        {SUPPORTED_INTERVALS.map(value => (
          <option key={value}>{value}</option>
        ))}
      </select>
      {/* <select value={type} onChange={typeChange}>
        <option value="bar">bar</option>
        <option value="line">line</option>
      </select> */}
      {selectedComponent === 'HistoryChart' && (
        <HistoryChart id={props.id} cssClass="detail" />
      )}
      {selectedComponent === 'OhlcChart' && (
        <OhlcChart id={props.id} cssClass="detail" />
      )}
    </>
  );
};

export default ChartOverlay;
