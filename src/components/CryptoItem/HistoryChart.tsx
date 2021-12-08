import { useEffect, useState, useRef, useCallback } from 'react';

import { Chart, ChartType, ChartData, registerables } from 'chart.js';
import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';
Chart.register(...registerables);

const lineChartType: ChartType = 'line';

const HistoryChart: React.FC<{ id: string }> = ({ id }) => {
  const chart = useRef<Chart | null>(null);
  const [prices, setPrices] = useState<number[]>([]);

  const { fetchData } = useHttp();
  const currency = useCustomSelector(statePara => statePara.state.currency);

  const formatOptions = (data: number[]): ChartData => ({
    labels: new Array(14).fill('Nov 17'),
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
        data: formatOptions(prices),
      });
    }
  }, []);

  useEffect(() => {
    const filterData = (data: any) => {
      const chartData = [];
      for (const value of data?.prices) {
        const [_, price] = value;
        chartData.push(+price.toFixed(2));
      }

      setPrices(chartData);
    };

    fetchData(
      {
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=14&interval=daily`,
      },
      filterData
    );
  }, [id, currency, fetchData]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data = formatOptions(prices);
      chart.current.update();
    }
  }, [prices]);

  return (
    <div>
      <canvas ref={canvasCallback} id={`history-chart-${id}`}></canvas>
    </div>
  );
};

export default HistoryChart;
