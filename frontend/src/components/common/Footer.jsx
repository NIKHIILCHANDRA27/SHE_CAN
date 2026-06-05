// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\Footer.jsx
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 text-slate-700 dark:text-slate-300">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <p className="text-2xl font-semibold text-slate-900 dark:text-white">She Can Foundation</p>
            <p className="mt-4 max-w-md leading-7">
              Empowering women through education, mentorship, and sustainable community programs for a stronger future.
            </p>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Quick Links</p>
            <div className="mt-4 flex flex-col gap-2 text-slate-600 dark:text-slate-400">
              <Link to="/">Home</Link>
              <a href="#impact">Impact</a>
              <a href="#contact">Contact</a>
              <Link to="/login">Admin</Link>
            </div>
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900 dark:text-white">Connect</p>
            <p className="mt-4 text-slate-600 dark:text-slate-400">contact@shecan.org</p>
            <p className="mt-1 text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
            <div className="mt-5 flex items-center gap-3 text-slate-600 dark:text-slate-300">
              <a href="https://facebook.com" aria-label="Facebook" className="hover:text-sky-600"><FaFacebookF /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="hover:text-sky-600"><FaTwitter /></a>
              <a href="https://instagram.com" aria-label="Instagram" className="hover:text-sky-600"><FaInstagram /></a>
              <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-sky-600"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-slate-200/80 pt-6 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          © {new Date().getFullYear()} She Can Foundation. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
