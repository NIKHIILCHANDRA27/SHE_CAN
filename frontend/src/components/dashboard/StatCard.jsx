// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\StatCard.jsx
const StatCard = ({ title, value, label, color }) => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-500">{title}</p>
      <p className={`mt-4 text-4xl font-semibold ${color}`}>{value}</p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
    </div>
  );
};

export default StatCard;
