// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\LoadingSpinner.jsx
const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 rounded-3xl bg-white p-8 text-slate-700 shadow-xl dark:bg-slate-900 dark:text-slate-100">
      <div className="h-14 w-14 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
