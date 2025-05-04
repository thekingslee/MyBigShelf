import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import RightChevron from '@/assets/RightChervon.svg';
import LeftChevron from '@/assets/LeftChervon.svg';

interface PaginationProps {
  currentPage?: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  totalItems,
  onPageChange,
  pageSize,
}) => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Get the Page size to enforce a responsive pagination
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentPageSize(pageSize);
  }, [pageSize]);

  const paginationRange = useMemo(() => {
    const btns = isMobile ? 3 : 5;
    const range = [];
    const totalBtns = Math.ceil(totalPages / btns);
    const currentBtnRange = Math.ceil(currentPage / btns);
    const startPage = (currentBtnRange - 1) * btns + 1;
    const endPage = Math.min(startPage + 4, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (totalBtns > 1 && currentBtnRange !== totalBtns) {
      range.push(-1);
    }

    return range;
  }, [currentPage, totalPages]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const startItem = (currentPage - 1) * currentPageSize + 1;
  const endItem = Math.min(currentPage * currentPageSize, totalItems);
  const displayedButtons = isMobile
    ? [...paginationRange.slice(0, 3), ...paginationRange.slice(-1)]
    : paginationRange;

  return (
    <div
      className={`${
        totalItems === 0 ? 'hidden' : ''
      } flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-solid border-custom-black-300 pt-4 pb-[40px]`}
    >
      <div className="text-custom-text-gray-500 text-sm sm:text-base font-medium font-bodyMediumFont order-2 sm:order-1">
        Showing {startItem}-{endItem} of {totalItems} results
      </div>
      <div className="flex gap-3 order-1 sm:order-2 mt-2">
        <Button
          className={`bg-white text-custom-text-primary border border-solid border-custom-black-300 w-8 h-8 sm:w-10 sm:h-10 p-1 sm:p-2 rounded-full ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <img src={LeftChevron} alt="Previous Page" className="w-2 h-4" />
        </Button>
        {displayedButtons.map((btn) =>
          btn === -1 ? (
            <span key="ellipsis" className="text-lg sm:text-2xl px-1 sm:px-2">
              ...
            </span>
          ) : (
            <Button
              key={btn}
              className={`font-bodyMediumFont font-medium w-8 h-8 sm:w-10 sm:h-10 p-1 sm:p-2 rounded-full text-sm sm:text-base
                ${
                  btn === currentPage
                    ? 'bg-custom-text-primary text-white'
                    : 'bg-transparent text-custom-text-secondary hover:text-white hover:bg-custom-text-primary'
                }`}
              onClick={() => handlePageChange(btn)}
            >
              {btn}
            </Button>
          )
        )}
        <Button
          className={`bg-white text-custom-text-primary border border-solid border-custom-black-300 w-8 h-8 sm:w-10 sm:h-10 p-1 sm:p-2 rounded-full ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <img src={RightChevron} alt="Next Page" className="w-2 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
