// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\layouts\PublicLayout.jsx
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
