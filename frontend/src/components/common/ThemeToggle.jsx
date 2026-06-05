// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\components\common\ThemeToggle.jsx
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext.jsx';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
      aria-label="Toggle theme"
    >
      <motion.span
        key={theme}
        initial={{ rotate: -20, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      >
        {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
      </motion.span>
    </button>
  );
};

export default ThemeToggle;
