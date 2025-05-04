import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'react-router-dom';
import SkeletonBookList from './SkeletonBookList';
import Pagination from './Pagination';
import { useSearch } from '@/stores';
import ErrorHandler from './ErrorHandler';
import useAvailableBook from '@/hooks/useAvailableBooks';
import EmptyList from './EmptyList';
import { BookCard } from './BookCard';
import ResponsiveHeader from './ResponsiveHeader';
import useGenres from '@/hooks/useGenre';
import { useURLParams } from '@/hooks/useURLParams';
import useDebounce from '@/hooks/specialHooks/useDebounce';
import { BookDetailsDrawer } from './BookDetailsDrawer';
import { extractProductId } from '@/lib/productIdParser';

const BookList: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookDetailId = extractProductId(searchParams.get('item-id') as string);

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const { searchParams: searchStoreParams } = useSearch();
  const searchTerm = searchStoreParams['books'] || '';
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { params, updateParams } = useURLParams<{
    genre: string;
  }>({
    genre: { type: 'string', default: '' },
  });

  const { data: genresData } = useGenres();

  const {
    data: books,
    error,
    isLoading,
  } = useAvailableBook({
    pageNumber,
    query: debouncedSearchTerm,
    pageSize,
    genre: params.genre,
  });

  useEffect(() => {
    const handleResize = () => {
      setPageSize(window.innerWidth < 768 ? 10 : 20);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const noSearchResultsNotification = {
    header: 'No results found',
    reason:
      "Looks like we couldn't find the book you're after. Try adjusting your search, or request the book, and we'll help you find it!",
  };

  const genreSortOptions = useMemo(
    () => [
      ...(genresData?.data.genre.map((genre) => ({
        value: genre.name,
        name: genre.name.charAt(0).toUpperCase() + genre.name.slice(1),
      })) || []),
    ],
    [genresData]
  );

  const handleSortChange = React.useCallback(
    (sortValue: string) => {
      updateParams({ genre: sortValue });
    },
    [updateParams]
  );

  const hasBooks = books?.data?.books && books.data.books.length > 0;
  const hasSearchResults = searchTerm.trim() !== '';

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, params.genre]);

  // if (isLoading) {
  //   return <SkeletonBookList />;
  // }

  return (
    <>
      {/* Floating drawer that responds to URL */}
      <BookDetailsDrawer bookId={bookDetailId ?? null} />
      <div className="grid gap-4 md:gap-8">
        <Card className="xs:w-[280px] w-auto bg-transparent shadow-none border-none">
          {!error && (
            <ResponsiveHeader
              sortOptions={genreSortOptions}
              onSortChange={handleSortChange}
              searchPlaceholder="Search by title and author"
              searchContext="books"
              initialGenre={params.genre}
            />
          )}
          <CardContent className="p-0">
            {error ? (
              <ErrorHandler fullHeight={true} />
            ) : isLoading ? (
              <SkeletonBookList />
            ) : hasSearchResults && books?.data.books.length === 0 ? (
              <EmptyList notification={noSearchResultsNotification} />
            ) : !hasBooks ? (
              <EmptyList notification={noSearchResultsNotification} />
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 md:gap-10 ">
                {books?.data.books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        {error ? null : (
          <Pagination
            currentPage={books?.data.pagination.currentPage}
            totalPages={books?.data.pagination.totalPages || 1}
            totalItems={books?.data.pagination.totalBooks || 0}
            onPageChange={handlePageChange}
            pageSize={pageSize}
          />
        )}
      </div>
    </>
  );
};

export default BookList;
