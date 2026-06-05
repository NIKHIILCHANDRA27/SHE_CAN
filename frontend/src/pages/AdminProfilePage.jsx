// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\AdminProfilePage.jsx
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const AdminProfilePage = () => {
  const { admin } = useContext(AuthContext);

  return (
    <div className="space-y-8 p-6 sm:p-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Admin profile</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Account details</h1>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Name</p>
            <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{admin?.name}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-800">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Email</p>
            <p className="mt-3 text-xl font-semibold text-slate-900 dark:text-white">{admin?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
