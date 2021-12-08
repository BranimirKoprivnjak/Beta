import { useEffect, useState, useCallback, useRef } from 'react';

import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';

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

const OhlcChart: React.FC<{ id: string }> = ({ id }) => {
  const chart = useRef<Chart | null>(null);
  const [data, setData] = useState<any[]>([]);

  const { fetchData } = useHttp();
  const currency = useCustomSelector(statePara => statePara.state.currency);

  const formatOptions = (data: number[]): ChartData => ({
    datasets: [
      {
        label: '# of Votes',
        data,
        backgroundColor: 'red',
        borderColor: 'blue',
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
      });
    }
  }, []);

  useEffect(() => {
    const filterData = (data: any) => {
      const chartData: any[] = [];
      for (const value of data) {
        const [time, open, high, low, close] = value;
        chartData.push({ x: time, o: open, h: high, l: low, c: close });
      }
      setData(chartData);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=${currency}&days=14`,
      },
      filterData
    );
  }, [id, currency, fetchData]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data = formatOptions(data);
      chart.current.update();
    }
  }, [data]);

  return (
    <div>
      <canvas ref={canvasCallback} id={`ohlc-chart-${id}`}></canvas>
    </div>
  );
};

export default OhlcChart;
