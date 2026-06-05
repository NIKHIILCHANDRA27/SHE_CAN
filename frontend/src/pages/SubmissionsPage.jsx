// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\pages\SubmissionsPage.jsx
import { useEffect, useMemo, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import SubmissionTable from '../components/dashboard/SubmissionTable.jsx';
import SearchFilter from '../components/dashboard/SearchFilter.jsx';
import Pagination from '../components/dashboard/Pagination.jsx';
import LoadingSpinner from '../components/common/LoadingSpinner.jsx';
import { fetchContacts, deleteContact, updateContactStatus, exportContactsCsv } from '../services/contactService.js';
import useDebounce from '../hooks/useDebounce.js';
import { AuthContext } from '../context/AuthContext.jsx';
import { downloadCsv } from '../utils/exportCsv.js';

const SubmissionsPage = () => {
  const { clearSession } = useContext(AuthContext);
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('createdAt');
  const [order, setOrder] = useState('desc');

  const debouncedSearch = useDebounce(search, 300);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetchContacts({ page, limit: 10, status, search: debouncedSearch, sort, order });
      setSubmissions(response.data.contacts);
      setTotal(response.data.total);
    } catch (error) {
      if (error.response?.status === 401) {
        clearSession();
        navigate('/login');
      } else {
        toast.error('Unable to load submissions.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, [page, status, debouncedSearch, sort, order]);

  const handleStatusToggle = async (item) => {
    const nextStatus = item.status === 'Pending' ? 'Reviewed' : item.status === 'Reviewed' ? 'Resolved' : 'Pending';
    try {
      await updateContactStatus(item._id, nextStatus);
      toast.success(`Status updated to ${nextStatus}`);
      loadSubmissions();
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this submission permanently?')) return;
    try {
      await deleteContact(id);
      toast.success('Submission deleted.');
      loadSubmissions();
    } catch (error) {
      toast.error('Unable to delete submission.');
    }
  };

  const handleExport = async () => {
    try {
      const response = await exportContactsCsv();
      downloadCsv(new Blob([response.data], { type: 'text/csv' }), 'submissions.csv');
    } catch (error) {
      toast.error('CSV export failed.');
    }
  };

  const totalPages = Math.ceil(total / 10) || 1;

  const tableHeader = useMemo(() => ({ sort, order }), [sort, order]);

  return (
    <div className="space-y-8 p-6 sm:p-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Submissions</p>
          <h1 className="mt-2 text-3xl font-semibold">Manage inquiries</h1>
        </div>
        <button onClick={handleExport} className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
          Export CSV
        </button>
      </div>
      <SearchFilter search={search} status={status} onSearchChange={setSearch} onStatusChange={setStatus} />
      {loading ? (
        <LoadingSpinner message="Loading submissions…" />
      ) : (
        <>
          <SubmissionTable submissions={submissions} onDelete={handleDelete} onStatusToggle={handleStatusToggle} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={(newPage) => setPage(newPage)} />
        </>
      )}
    </div>
  );
};

export default SubmissionsPage;
