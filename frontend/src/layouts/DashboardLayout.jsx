// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\layouts\DashboardLayout.jsx
import { Outlet, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Sidebar from '../components/dashboard/Sidebar.jsx';
import { AuthContext } from '../context/AuthContext.jsx';

const DashboardLayout = () => {
  const { admin, clearSession } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearSession();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <div className="lg:flex">
        <Sidebar onLogout={handleLogout} />
        <div className="flex-1">
          <div className="border-b border-slate-200 bg-white px-6 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 lg:px-10">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm text-slate-500">Welcome back,</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">{admin?.name}</p>
              </div>
            </div>
          </div>
          <main className="p-6 sm:p-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
