// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\SubmissionTrendChart.jsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const SubmissionTrendChart = ({ trend }) => {
  const labels = trend.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Submissions',
        data: trend.map((item) => item.count),
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14,165,233,0.25)',
        tension: 0.35,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' }
    },
    scales: {
      x: { ticks: { color: '#94a3b8' } },
      y: { beginAtZero: true, ticks: { color: '#94a3b8', precision: 0 } }
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Submission Trend</h3>
      <div className="mt-6">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SubmissionTrendChart;
