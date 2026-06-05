// c:\Users\chand\Desktop\SHE_Foundation\frontend\src\hooks\usePagination.js
import { useMemo } from 'react';

const usePagination = ({ totalItems, currentPage, pageSize }) => {
  return useMemo(() => {
    const totalPages = Math.ceil(totalItems / pageSize);
    const hasPrevious = currentPage > 1;
    const hasNext = currentPage < totalPages;
    return { totalPages, hasPrevious, hasNext };
  }, [totalItems, currentPage, pageSize]);
};

export default usePagination;
