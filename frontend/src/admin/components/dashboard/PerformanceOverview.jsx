import React from 'react';
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

const PerformanceOverview = ({ data, loading, error }) => {
  if (loading) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full">Loading performance...</div>;
  }
  if (error) {
    return <div className="bg-white rounded-lg p-4 shadow-sm w-full text-red-500">{error}</div>;
  }
  if (!data) {
    return null;
  }
  // Transform data to chartjs format for both videos and products
  const chartData = {
    labels: data.map(item => item.month),
    datasets: [
      {
        type: 'bar',
        label: 'Videos Uploaded',
        data: data.map(item => item.videos),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        order: 2,
      },
      {
        type: 'bar',
        label: 'Products Added',
        data: data.map(item => item.products),
        backgroundColor: 'rgba(99, 102, 241, 0.5)', // Indigo
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
        <Chart data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PerformanceOverview;