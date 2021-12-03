import { useEffect, useState, useRef } from 'react';

import { Chart, ChartType, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

const lineChartType: ChartType = 'line';

const HistoryChart: React.FC<{ id: string }> = ({ id }) => {
  const chart = useRef<HTMLCanvasElement>(null);
  const [prices, setPrices] = useState<number[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=14&interval=daily`
      );

      const data = await response.json();

      const chartData = [];
      for (const value of data?.prices) {
        const [_, price] = value;
        chartData.push(+price.toFixed(2));
      }

      setPrices(chartData);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    // prevents from creating chart when prices array is empty
    if (prices.length > 1) {
      const canvas = document.getElementById(
        `history-chart-${id}`
      ) as HTMLCanvasElement;
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

      console.log(prices);

      const historyChart = new Chart(ctx, {
        type: lineChartType,
        data: formatOptions(prices),
        // options: { responsive: true },
      });
      // chart?.current?.update();
      // historyChart.update();
    }
  }, [prices, id]);

  return (
    <div style={{ width: '500px' }}>
      <canvas ref={chart} id={`history-chart-${id}`}></canvas>
    </div>
  );
};

export default HistoryChart;
