import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { generateCombatTimeData } from '../mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#9CA3AF', // text-gray-400
      },
      grid: {
        color: '#374151', // bg-gray-700
      },
    },
    x: {
      ticks: {
        color: '#9CA3AF', // text-gray-400
      },
      grid: {
        color: '#374151', // bg-gray-700
      },
    },
  },
};

// Helper function to create histogram bins
const createHistogram = (data, binSize = 30) => {
  const min = 0;
  const max = Math.ceil(Math.max(...data) / binSize) * binSize;
  const bins = {};

  for (let i = min; i < max; i += binSize) {
    const binStart = i;
    const binEnd = i + binSize - 1;
    bins[`${binStart}-${binEnd}s`] = 0;
  }

  data.forEach(value => {
    const binStart = Math.floor(value / binSize) * binSize;
    const binEnd = binStart + binSize - 1;
    const binName = `${binStart}-${binEnd}s`;
    if (bins[binName] !== undefined) {
      bins[binName]++;
    }
  });

  return bins;
};

const rawData = generateCombatTimeData();
const histogramData = createHistogram(rawData);

const data = {
  labels: Object.keys(histogramData),
  datasets: [
    {
      label: '전투 횟수',
      data: Object.values(histogramData),
      backgroundColor: '#60A5FA', // text-blue-400
    },
  ],
};

function CombatTimeHistogram() {
  return <Bar options={options} data={data} />;
}

export default CombatTimeHistogram;