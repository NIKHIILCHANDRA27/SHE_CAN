// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\StatusDistributionChart.jsx
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StatusDistributionChart = ({ stats }) => {
  const data = {
    labels: ['Pending', 'Reviewed', 'Resolved'],
    datasets: [
      {
        data: [stats.pending, stats.reviewed, stats.resolved],
        backgroundColor: ['#f59e0b', '#0ea5e9', '#22c55e'],
        hoverOffset: 8
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Status Distribution</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Total submissions: {stats.total || 0}</p>
        </div>
        <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {stats.total || 0}
        </div>
      </div>
      <div className="mt-6">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default StatusDistributionChart;
