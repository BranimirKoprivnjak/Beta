import { useEffect, useState, useRef, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';
import classes from './HistoryChart.module.css';

import { Chart, ChartType, ChartData, registerables } from 'chart.js';
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

  const { interval, type: chartType } = crypto.historyChart.options;

  const lineChartType: ChartType = chartType;

  const formatOptions = useCallback(
    (data: number[]): ChartData => ({
      labels: dates,
      datasets: [
        {
          label: 'Price',
          data,
          backgroundColor: 'rgba(140, 63, 79, 0.2)',
          borderColor: 'rgba(140, 63, 79, 1)',
          fill: true,
          // pointRadius: 0,
        },
      ],
    }),
    [dates]
  );

  const canvasCallback = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (ctx) {
      chart.current = new Chart(ctx, {
        type: lineChartType,
        data: formatOptions(prices),
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'timeseries',
              time: {
                minUnit: 'day',
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
    if (chart.current) {
      chart.current.data = formatOptions(prices);
      chart.current.data.labels = dates;
      chart.current.update();
    }
  }, [prices, dates, formatOptions]);

  return (
    <div className={classes[`chart-${cssClass}`]}>
      <canvas ref={canvasCallback} id={`history-chart-${id}`}></canvas>
    </div>
  );
};

export default HistoryChart;
