// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\SubmissionDetailPage.jsx
import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchContactById, updateContactStatus, deleteContact } from '../services/contactService.js';
import { AuthContext } from '../context/AuthContext.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import StatusBadge from '../components/dashboard/StatusBadge.jsx';

const SubmissionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { clearSession } = useContext(AuthContext);
  const [contact, setContact] = useState(null);
  const [status, setStatus] = useState('Pending');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const response = await fetchContactById(id);
        setContact(response.data.contact);
        setStatus(response.data.contact.status);
      } catch (error) {
        if (error.response?.status === 401) {
          clearSession();
          navigate('/login');
        } else {
          toast.error('Unable to load submission details.');
        }
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, [id, clearSession, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContactStatus(id, status);
      toast.success('Status saved successfully.');
      setContact((prev) => ({ ...prev, status }));
    } catch (error) {
      toast.error('Failed to save status.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this submission permanently?')) return;
    try {
      await deleteContact(id);
      toast.success('Submission deleted.');
      navigate('/admin/submissions');
    } catch (error) {
      toast.error('Unable to delete submission.');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading details…" />;
  }

  if (!contact) {
    return <p className="p-10 text-center text-slate-500">Submission not found.</p>;
  }

  return (
    <div className="space-y-8 p-6 sm:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Submission details</p>
          <h1 className="mt-2 text-3xl font-semibold">{contact.subject}</h1>
        </div>
        <button onClick={() => navigate('/admin/submissions')} className="inline-flex rounded-full bg-slate-200 px-5 py-3 text-sm text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
          Back to submissions
        </button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">From</p>
              <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{contact.name}</p>
              <p className="text-sm text-slate-500">{contact.email}</p>
              <p className="text-sm text-slate-500">{contact.phone}</p>
            </div>
            <StatusBadge status={contact.status} />
          </div>
          <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-300">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Subject</h3>
              <p className="mt-2">{contact.subject}</p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">Message</h3>
              <p className="mt-2 whitespace-pre-line">{contact.message}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Status</p>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="mt-3 w-full rounded-3xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100">
              <option value="Pending">Pending</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <button onClick={handleSave} disabled={saving} className="w-full rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-slate-500">
            {saving ? 'Saving…' : 'Save Status'}
          </button>
          <button onClick={handleDelete} className="w-full rounded-full bg-rose-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-500">
            Delete Submission
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetailPage;
