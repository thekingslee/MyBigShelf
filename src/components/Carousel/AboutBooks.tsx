import React, { useMemo } from 'react';
import CarouselX from './CarouselXFramer';
import useAvailableBook from '@/hooks/useAvailableBooks';
import ErrorHandler from '../ErrorHandler';
import Skeleton from 'react-loading-skeleton';

const AboutBooks: React.FC = () => {
  const totalPage = 138;
  const pageSize = 8;
  const pageNumber = useMemo(
    () => Math.floor(Math.random() * (totalPage / pageSize)) + 1,
    [totalPage, pageSize]
  );

  const {
    data: books,
    error,
    isLoading,
  } = useAvailableBook({
    pageNumber: pageNumber,
    query: '',
    pageSize,
    genre: '',
  });

  const hasBooks = books?.data?.books && books.data.books.length > 0;

  return (
    <>
      {error ? (
        <ErrorHandler fullHeight={true} />
      ) : isLoading && !hasBooks ? (
        <div className="sm:w-[300px] w-full h-[450px] mx-auto px-4 sm:px-0 ">
          <Skeleton height={400} className="mb-2 rounded-[8px] " />
        </div>
      ) : (
        <CarouselX books={books?.data?.books || []} />
      )}
    </>
  );
};

export default AboutBooks;
