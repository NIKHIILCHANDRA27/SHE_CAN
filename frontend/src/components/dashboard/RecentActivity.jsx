// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\RecentActivity.jsx
import { formatDateShort } from '../../utils/formatters.js';
import StatusBadge from './StatusBadge.jsx';

const RecentActivity = ({ submissions }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
      <div className="mt-6 space-y-4">
        {submissions.map((item) => (
          <div key={item._id} className="rounded-3xl border border-slate-200 p-4 dark:border-slate-800">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{item.email}</p>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{formatDateShort(item.createdAt)}</p>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-sm text-slate-600 dark:text-slate-300">{item.subject}</p>
              <StatusBadge status={item.status} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
