import { useEffect, useState, useRef, useCallback } from 'react';
import useHttp from '../../hooks/use-http';
import { useCustomSelector } from '../../hooks/hooks';

import { Chart, ChartType, ChartData, registerables } from 'chart.js';
Chart.register(...registerables);

const lineChartType: ChartType = 'line';

const HistoryChart: React.FC<{ id: string }> = ({ id }) => {
  const chart = useRef<Chart | null>(null);
  const [prices, setPrices] = useState<number[]>([]);
  const [dates, setDates] = useState<number[]>([]);

  const { fetchData } = useHttp();
  const currency = useCustomSelector(statePara => statePara.state.currency);

  const formatOptions = (data: number[]): ChartData => ({
    labels: dates,
    datasets: [
      {
        label: 'Price',
        data,
        backgroundColor: 'rgba(140, 63, 79, 1)',
        borderColor: 'rgba(140, 63, 79, 1)',
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
        options: {
          // responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'timeseries',
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
        },
      });
    }
  }, []);

  useEffect(() => {
    const filterData = (data: any) => {
      const chartData = [],
        chartLabels = [];
      for (const value of data?.prices) {
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
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=14&interval=daily`,
      },
      filterData
    );
  }, [id, currency, fetchData]);

  useEffect(() => {
    if (chart.current) {
      chart.current.data = formatOptions(prices);
      chart.current.data.labels = dates;
      chart.current.update();
    }
  }, [prices, dates]);

  return (
    <div style={{ position: 'relative', width: '28vw', height: '275px' }}>
      <canvas ref={canvasCallback} id={`history-chart-${id}`}></canvas>
    </div>
  );
};

export default HistoryChart;
