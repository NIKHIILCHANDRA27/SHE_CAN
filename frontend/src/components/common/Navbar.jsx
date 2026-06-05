// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
          She Can Foundation
        </Link>
        <div className="hidden items-center gap-8 lg:flex">
          <NavLink to="/#about" className={({ isActive }) => isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}>
            About
          </NavLink>
          <NavLink to="/#impact" className={({ isActive }) => isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}>
            Impact
          </NavLink>
          <NavLink to="/#contact" className={({ isActive }) => isActive ? 'text-sky-600' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'}>
            Contact
          </NavLink>
          <Link
            to="/login"
            className="rounded-full bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-500"
          >
            Admin Login
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
