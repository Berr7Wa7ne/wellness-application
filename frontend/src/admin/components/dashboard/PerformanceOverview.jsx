import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Legend,
  Tooltip
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  LineElement,
  LineController,
  PointElement,
  Legend,
  Tooltip
);

const data = {
  labels: ['January', 'February', 'March', 'April'],
  datasets: [
    {
      type: 'bar',
      label: 'Bar Dataset',
      data: [10, 20, 30, 40],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
      order: 2,
    },
    {
      type: 'line',
      label: 'Line Dataset',
      data: [50, 50, 50, 50],
      borderColor: '#6366f1',
      borderWidth: 2,
      tension: 0.4,
      fill: false,
      order: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: 'top' },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const PerformanceOverview = () => {
    return (
        <div className="bg-white rounded-lg p-4 shadow-sm w-full">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h2 className="text-lg font-semibold">Performance Overview</h2>
              <p className="text-sm text-gray-500">Monthly view statistics for your content</p>
            </div>
            <BarChart2 className="w-5 h-5 text-gray-400" />
          </div>
          <div className="bg-gray-100 rounded-md h-64 p-2 flex items-center justify-center">
            <Chart data={data} options={options} />
          </div>
        </div>
      );
    }

export default PerformanceOverview