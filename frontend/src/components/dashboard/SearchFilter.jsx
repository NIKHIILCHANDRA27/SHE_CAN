// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\SearchFilter.jsx
const SearchFilter = ({ search, status, onSearchChange, onStatusChange }) => {
  return (
    <div className="grid gap-4 xl:grid-cols-[1fr_auto]">
      <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name, email, subject"
          className="w-full border-none bg-transparent text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
        />
      </div>
      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
      >
        <option value="">All statuses</option>
        <option value="Pending">Pending</option>
        <option value="Reviewed">Reviewed</option>
        <option value="Resolved">Resolved</option>
      </select>
    </div>
  );
};

export default SearchFilter;
