// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\dashboard\Sidebar.jsx
import { NavLink } from 'react-router-dom';
import { FaChartLine, FaEnvelopeOpenText, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { formatInitials } from '../../utils/formatters.js';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';

const Sidebar = ({ onLogout }) => {
  const { admin } = useContext(AuthContext);

  return (
    <aside className="hidden h-screen w-72 flex-col border-r border-slate-200 bg-white px-6 py-8 dark:border-slate-800 dark:bg-slate-950 lg:flex">
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-sky-500 text-2xl font-semibold text-white">
          {formatInitials(admin?.name)}
        </div>
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Admin</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{admin?.name || 'She Can Admin'}</p>
        </div>
      </div>
      <nav className="flex flex-1 flex-col gap-4">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'rounded-3xl bg-sky-50 px-5 py-3 text-sky-700 dark:bg-slate-800 dark:text-white' : 'rounded-3xl px-5 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}>
          <div className="flex items-center gap-3"><FaChartLine /> Dashboard</div>
        </NavLink>
        <NavLink to="/admin/submissions" className={({ isActive }) => isActive ? 'rounded-3xl bg-sky-50 px-5 py-3 text-sky-700 dark:bg-slate-800 dark:text-white' : 'rounded-3xl px-5 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}>
          <div className="flex items-center gap-3"><FaEnvelopeOpenText /> Submissions</div>
        </NavLink>
        <NavLink to="/admin/profile" className={({ isActive }) => isActive ? 'rounded-3xl bg-sky-50 px-5 py-3 text-sky-700 dark:bg-slate-800 dark:text-white' : 'rounded-3xl px-5 py-3 text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'}>
          <div className="flex items-center gap-3"><FaUserCircle /> Profile</div>
        </NavLink>
      </nav>
      <button onClick={onLogout} className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-sky-500 dark:hover:bg-sky-400">
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
};

export default Sidebar;
