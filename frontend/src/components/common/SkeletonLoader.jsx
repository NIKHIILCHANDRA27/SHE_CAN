// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\SkeletonLoader.jsx
const SkeletonLoader = ({ count = 4 }) => {
  return (
    <div className="grid gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-3xl bg-slate-200 p-6 shadow-sm dark:bg-slate-800"></div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
