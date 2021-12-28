import { useEffect, useState, useRef, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';
import { hexToRgb } from '../../helpers/helpers';
import classes from './HistoryChart.module.css';

import { Chart, ChartData, registerables } from 'chart.js';

Chart.register(...registerables);

const HistoryChart: React.FC<{
  id: string;
  cssClass: string;
}> = ({ id, cssClass }) => {
  const chart = useRef<Chart | null>(null);
  const [prices, setPrices] = useState<number[]>([]);
  const [dates, setDates] = useState<number[]>([]);

  const { fetchData } = useHttp();
  const currency = useCustomSelector(state => state.fiat.fiatCurrency);
  const [crypto] = useCustomSelector(state =>
    state.crypto.cryptocurrencies.filter(item => item.id === id)
  );

  const { interval, type: chartType, color } = crypto.historyChart.options;

  const [borderColor, lineBackgroundColor, barBackgroundColor] =
    hexToRgb(color);

  const backgroundColor =
    chartType === 'bar' ? barBackgroundColor : lineBackgroundColor;

  const formatOptions = useCallback(
    (data: number[]): ChartData => ({
      labels: dates,
      datasets: [
        {
          label: 'Price',
          data,
          backgroundColor,
          borderColor,
          fill: true,
          // pointRadius: 0,
        },
      ],
    }),
    [dates, backgroundColor, borderColor]
  );

  const canvasCallback = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (ctx) {
      chart.current = new Chart(ctx, {
        type: 'line',
        data: formatOptions(prices),
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'time',
              time: {
                minUnit: 'day',
                round: 'day',
              },
              ticks: {
                // autoSkip: true,
                // display: false,
                // maxTicksLimit: 3,
                maxRotation: 0,
                minRotation: 0,
              },
              grid: {
                display: false,
              },
              // bounds: 'ticks',
              // offset: true,
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: 'History Chart',
            },
          },
          // elements: {
          //   point: {
          //     radius: 0,
          //   },
          // },
        },
      });
    }
  }, []);

  useEffect(() => {
    const filterData = (data: any) => {
      const chartData = [],
        chartLabels = [];
      for (const value of data.prices) {
        const [dates, price] = value;
        chartData.push(+price.toFixed(2));
        chartLabels.push(dates);
      }

      // remove last item
      chartData.pop();
      chartLabels.pop();
      setPrices(chartData);
      setDates(chartLabels);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${interval}&interval=daily`,
      },
      filterData
    );
  }, [id, currency, fetchData, interval]);

  useEffect(() => {
    if (!chart.current) return;
    chart.current.data = formatOptions(prices);
    chart.current.update('none');
  }, [formatOptions]);

  // chart color change
  useEffect(() => {
    if (!chart.current) return;
    chart.current.update('none');
  }, [backgroundColor, borderColor]);

  // on interval change, update prices and corresponding dates
  useEffect(() => {
    if (!chart.current) return;
    chart.current.data = formatOptions(prices);
    chart.current.update();
  }, [prices, dates]);

  // chart type change
  useEffect(() => {
    if (!chart.current) return;
    chart.current.config.type = chartType;
    chart.current.update();
  }, [chartType]);

  // default type is line, update on render based on redux state
  useEffect(() => {
    if (!chart.current) return;
    chart.current.config.type = chartType;
    chart.current.update();
  }, []);

  return (
    <div className={classes[`chart-${cssClass}`]}>
      <canvas ref={canvasCallback} id={`history-chart-${id}`}></canvas>
    </div>
  );
};

export default HistoryChart;
