import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { generateHeatmapData } from '../mockData';

ChartJS.register(
  MatrixController,
  MatrixElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

// Helper function to create a grid for the heatmap
const createHeatmapGrid = (data, gridSize = 10) => {
  const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
  const cellSize = 100 / gridSize;

  data.forEach(point => {
    const xBin = Math.floor(point.x / cellSize);
    const yBin = Math.floor(point.y / cellSize);
    if (grid[yBin] && grid[yBin][xBin] !== undefined) {
      grid[yBin][xBin] += point.value;
    }
  });

  const chartData = [];
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      chartData.push({
        x: `${x * cellSize}-${(x + 1) * cellSize}`,
        y: `${y * cellSize}-${(y + 1) * cellSize}`,
        v: grid[y][x],
      });
    }
  }
  return chartData;
};

const rawData = generateHeatmapData();
const heatmapData = createHeatmapGrid(rawData);

const data = {
  datasets: [
    {
      label: '사망 히트맵',
      data: heatmapData,
      backgroundColor(ctx) {
        const value = ctx.dataset.data[ctx.dataIndex].v;
        if (value === 0) return '#1F2937'; // bg-gray-800
        const alpha = (value / 10) + 0.1;
        return `rgba(239, 68, 68, ${alpha})`; // bg-red-500 with opacity
      },
      borderColor: '#4B5563', // bg-gray-600
      borderWidth: 1,
      width: ({chart}) => (chart.chartArea || {}).width / 10 - 1,
      height: ({chart}) => (chart.chartArea || {}).height / 10 - 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
        display: false,
    },
    tooltip: {
        callbacks: {
            title() {
                return '사망 위치';
            },
            label(context) {
                const item = context.dataset.data[context.dataIndex];
                return [
                    `좌표: (${item.x}, ${item.y})`,
                    `사망 횟수: ${item.v}`
                ];
            }
        }
    }
  },
  scales: {
    x: {
        type: 'category',
        labels: [...Array(10)].map((_, i) => `${i*10}-${(i+1)*10}`),
        ticks: { display: false },
        grid: { display: false }
    },
    y: {
        type: 'category',
        labels: [...Array(10)].map((_, i) => `${i*10}-${(i+1)*10}`),
        offset: true,
        ticks: { display: false },
        grid: { display: false }
    }
  }
};

function DeathHeatmap() {
  return <Chart type='matrix' options={options} data={data} />;
}

export default DeathHeatmap;