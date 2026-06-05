// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\StatusBadge.jsx
const statusClasses = {
  Pending: 'bg-amber-100 text-amber-700',
  Reviewed: 'bg-sky-100 text-sky-700',
  Resolved: 'bg-emerald-100 text-emerald-700'
};

const StatusBadge = ({ status }) => {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusClasses[status] || 'bg-slate-100 text-slate-700'}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
