import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { generateHealthCurveData } from '../mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      max: 100,
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

const { labels, data: healthData } = generateHealthCurveData();

const data = {
  labels,
  datasets: [
    {
      label: 'Player Health',
      data: healthData,
      borderColor: '#34D399', // text-green-400
      backgroundColor: 'rgba(52, 211, 153, 0.1)',
      fill: true,
      tension: 0.4,
    },
  ],
};

function PlayerHealthCurve() {
  return <Line options={options} data={data} />;
}

export default PlayerHealthCurve;