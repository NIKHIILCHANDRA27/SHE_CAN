// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\DashboardOverview.jsx
import { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { fetchContacts, fetchStatusStats, fetchTrend } from '../services/contactService.js';
import { AuthContext } from '../context/AuthContext.jsx';
import StatCard from '../components/dashboard/StatCard.jsx';
import SubmissionTrendChart from '../components/dashboard/SubmissionTrendChart.jsx';
import StatusDistributionChart from '../components/dashboard/StatusDistributionChart.jsx';
import RecentActivity from '../components/dashboard/RecentActivity.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';

const DashboardOverview = () => {
  const { clearSession } = useContext(AuthContext);
  const [stats, setStats] = useState({ pending: 0, reviewed: 0, resolved: 0, total: 0 });
  const [trend, setTrend] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsRes, trendRes, contactsRes] = await Promise.all([
          fetchStatusStats(),
          fetchTrend(),
          fetchContacts({ page: 1, limit: 5, sort: 'createdAt', order: 'desc' })
        ]);
        setStats(statsRes.data);
        setTrend(trendRes.data.trend);
        setRecent(contactsRes.data.contacts || []);
      } catch (error) {
        if (error.response?.status === 401) {
          clearSession();
        }
        toast.error('Unable to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, [clearSession]);

  if (loading) {
    return <LoadingSpinner message="Loading dashboard…" />;
  }

  return (
    <div className="space-y-8 p-6 sm:p-10">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Submissions" value={stats.total || 0} label="All inquiries" color="text-slate-900 dark:text-white" />
        <StatCard title="Pending" value={stats.pending || 0} label="Awaiting review" color="text-amber-600" />
        <StatCard title="Reviewed" value={stats.reviewed || 0} label="Under follow-up" color="text-sky-600" />
        <StatCard title="Resolved" value={stats.resolved || 0} label="Completed cases" color="text-emerald-600" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <SubmissionTrendChart trend={trend} />
        <StatusDistributionChart stats={stats} />
      </div>

      <RecentActivity submissions={recent} />
    </div>
  );
};

export default DashboardOverview;
