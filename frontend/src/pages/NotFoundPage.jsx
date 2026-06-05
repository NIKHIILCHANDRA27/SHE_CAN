// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\NotFoundPage.jsx
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 text-center text-white sm:px-10">
      <div className="max-w-xl rounded-4xl border border-slate-800 bg-slate-900 p-14 shadow-xl">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Page not found</p>
        <h1 className="mt-6 text-5xl font-bold">404</h1>
        <p className="mt-4 text-base leading-8 text-slate-300">
          The page you are looking for does not exist. Return to the homepage or access the admin area.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link to="/" className="rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
            Home
          </Link>
          <Link to="/login" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800">
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
