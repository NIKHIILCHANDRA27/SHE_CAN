// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\LoginPage.jsx
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext.jsx';
import { loginAdmin } from '../services/authService.js';

const LoginPage = () => {
  const { setSession } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await loginAdmin({ email, password });
      setSession(response.data.token, response.data.admin);
      toast.success('Welcome back, admin!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white sm:px-10">
      <div className="mx-auto grid max-w-3xl gap-10 rounded-4xl border border-slate-800 bg-slate-900/95 p-10 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-sky-400">Admin access</p>
          <h1 className="text-4xl font-semibold">Login to the admin dashboard</h1>
          <p className="text-slate-400">Securely manage submissions, view impact stats, and export reports.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <label className="block">
            <span className="text-sm text-slate-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </label>
          <label className="block">
            <span className="text-sm text-slate-300">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-sky-600 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-500"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in…' : 'Sign In'}
          </button>
          <p className="text-center text-sm text-slate-500">Use the seeded admin credentials to access the dashboard.</p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
