// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\SubmissionTable.jsx
import { Link } from 'react-router-dom';
import StatusBadge from './StatusBadge.jsx';

const SubmissionTable = ({ submissions, onDelete, onStatusToggle }) => {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead className="bg-slate-50 dark:bg-slate-950">
          <tr>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subject</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
            <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Date</th>
            <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-800 dark:bg-slate-900">
          {submissions.map((item) => (
            <tr key={item._id} className="hover:bg-slate-50 dark:hover:bg-slate-800">
              <td className="px-4 py-4 text-sm text-slate-900 dark:text-slate-100">{item.name}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{item.email}</td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{item.subject}</td>
              <td className="px-4 py-4 text-sm">
                <StatusBadge status={item.status} />
              </td>
              <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-4 text-right text-sm font-medium">
                <div className="inline-flex items-center gap-2">
                  <Link to={`/admin/submissions/${item._id}`} className="rounded-full bg-slate-100 px-3 py-2 text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
                    View
                  </Link>
                  <button
                    type="button"
                    onClick={() => onStatusToggle(item)}
                    className="rounded-full bg-sky-600 px-3 py-2 text-white transition hover:bg-sky-500"
                  >
                    Next Status
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(item._id)}
                    className="rounded-full bg-rose-600 px-3 py-2 text-white transition hover:bg-rose-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
