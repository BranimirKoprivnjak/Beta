import { useEffect, useState, useCallback, useRef } from 'react';

import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';
import classes from './OhlcChart.module.css';

import { Chart, ChartType, registerables, ChartData } from 'chart.js';
import {
  CandlestickElement,
  CandlestickController,
} from 'chartjs-chart-financial';

// @ts-ignore
import 'chartjs-adapter-moment';

Chart.register(CandlestickElement, CandlestickController);
Chart.register(...registerables);

const lineChartType: ChartType = 'candlestick';

const OhlcChart: React.FC<{
  id: string;
  cssClass: string;
}> = ({ id, cssClass }) => {
  const chart = useRef<Chart | null>(null);
  const [data, setData] = useState<any[]>([]);

  const { fetchData } = useHttp();
  const currency = useCustomSelector(statePara => statePara.fiat.fiatCurrency);
  const [crypto] = useCustomSelector(state =>
    state.crypto.cryptocurrencies.filter(item => item.id === id)
  );

  const interval = crypto.ohlcChart.options.interval;

  const formatOptions = (data: number[]): ChartData => ({
    datasets: [
      {
        label: '# of Votes',
        data,
      },
    ],
  });

  const canvasCallback = useCallback((canvas: HTMLCanvasElement | null) => {
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (ctx) {
      chart.current = new Chart(ctx, {
        type: lineChartType,
        data: formatOptions(data),
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false,
              },
              ticks: {
                // display: false,
                // maxTicksLimit: 3,
                maxRotation: 0,
                minRotation: 0,
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
              text: 'OHLC Chart',
            },
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    const filterData = (data: any) => {
      const chartData: any[] = [];
      for (let i = 0; i < data.length; i = i + 6) {
        // data is from each 4 hours, filter to be once a day
        const [time, open, high, low, close] = data[i];
        chartData.push({ x: time, o: open, h: high, l: low, c: close });
      }
      setData(chartData);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=${interval}`,
      },
      filterData
    );
  }, [id, currency, interval, fetchData]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data = formatOptions(data);
      chart.current.update();
    }
  }, [data]);

  return (
    <div className={classes[`chart-${cssClass}`]}>
      <canvas ref={canvasCallback} id={`ohlc-chart-${id}`}></canvas>
    </div>
  );
};

export default OhlcChart;
