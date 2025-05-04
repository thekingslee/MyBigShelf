import React, { CSSProperties, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, DrawerClose, DrawerContent } from '@/components/ui/drawer';
import { isValidImageUrl } from '@/utils';
import Book from '@/assets/picture.png';
import useBookById from '@/hooks/useBookById';
import { Books } from '@/hooks/useAvailableBooks';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import QuantityControl from './QuantityControl';
import { CartTray } from './CartTray';
import ScaleLoader from 'react-spinners/ScaleLoader';

interface BookDetailsDrawerProps {
  bookId: string | null;
}

export const BookDetailsDrawer: React.FC<BookDetailsDrawerProps> = ({
  bookId,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Fetch book details if bookId exists
  const { data, isLoading } = useBookById(bookId || undefined);
  const bookDetails = data?.data?.book;

  const override: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleClose = () => {
    const currentParams = new URLSearchParams(location.search);
    currentParams.delete('item-id');
    navigate(
      {
        pathname: location.pathname,
        search: currentParams.toString(),
      },
      { replace: true }
    );
  };

  const handleGenreClick = (genre: string) => {
    try {
      const currentParams = new URLSearchParams(
        decodeURIComponent(location.search)
      );
      const formattedGenre = genre.toLowerCase().replace(/\s+/g, '-');

      const affiliateUsername = currentParams
        .get('affiliate')
        ?.replace(/^"|"$/g, '');
      const haul = currentParams.get('haul');

      const searchString = [];

      if (affiliateUsername) {
        searchString.push(`affiliate=${affiliateUsername}`);
      }
      if (haul) {
        searchString.push(`haul=${haul}`);
      }
      searchString.push(`genre=${formattedGenre}`);

      navigate({
        pathname: '/',
        search: searchString.join('&'),
      });

      setTimeout(() => {
        closeButtonRef.current?.click();
      }, 100);
    } catch (error) {
      console.error('Error in handleGenreClick:', error);
    }
  };

  // If no bookId, don't render anything
  if (!bookId) return null;

  return (
    <Drawer open={true} onOpenChange={(open) => !open && handleClose()}>
      <DrawerContent className="h-[90vh] bg-white border-none outline-none">
        <div className="mx-auto mt-4 h-2 w-[100px] bg-custom-black-200 rounded-full" />
        <DrawerClose
          className="block absolute right-4 top-4"
          ref={closeButtonRef}
        >
          <Button
            variant="outline"
            className="w-[40px] h-[40px] rounded-full bg-custom-black-100 border border-solid border-custom-black-500"
            size="icon"
          >
            <X className="h-5 w-5" />
          </Button>
        </DrawerClose>
        <div className="flex justify-center overflow-auto no-scrollbar">
          <div className="max-w-2xl w-full lg:h-full lg:max-w-4xl p-2 overflow-auto mb-4">
            <>
              {isLoading ? (
                <div className="w-full h-full">
                  <ScaleLoader
                    color="#1E1E1E"
                    loading={true}
                    cssOverride={override}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : bookDetails ? (
                <div className="p-4 flex-grow overflow-y-auto lg:grid lg:grid-cols-[300px_1fr] lg:gap-10">
                  <div>
                    <img
                      className="w-[120px] h-[182px] lg:w-full lg:h-[90%] object-cover mb-4 rounded-[8px]"
                      src={
                        bookDetails.bookCover &&
                        isValidImageUrl(bookDetails.bookCover)
                          ? bookDetails.bookCover
                          : Book
                      }
                      alt={bookDetails.title}
                      onError={(e) => {
                        e.currentTarget.src = Book;
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-6">
                    <section className="flex flex-col pb-4 gap-3 border-b border-solid border-custom-black-200">
                      <div>
                        <h2 className="text-xl text-custom-text-primary font-bodyBoldFont font-bold">
                          {bookDetails.title}
                        </h2>
                        <p className="text-sm text-custom-text-body font-bodyRegularFont font-normal">
                          {bookDetails.author}
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <p className="text-custom-text-primary text-lg font-bodyBoldFont font-bold">
                          <span className="font-sans">₦</span>
                          {bookDetails.totalPrice}
                        </p>
                        <QuantityControl
                          item={bookDetails as Books}
                          onStopPropagation={false}
                        />
                      </div>
                    </section>
                    <section>
                      <p className="text-sm text-custom-text-body font-bodyRegularFont font-normal text-pretty">
                        {bookDetails.about}
                      </p>
                    </section>
                    <section className="mb-16">
                      <h3 className="text-base text-custom-text-primary font-bodyMediumFont font-medium mb-2">
                        Genre
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {!bookDetails.genre?.length ? (
                          <p className="text-custom-text-body text-sm font-bodyRegularFont font-normal">
                            This book has no genre
                          </p>
                        ) : (
                          bookDetails.genre.map((g, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              onClick={() => handleGenreClick(g)}
                              className="bg-custom-black-100 leading-3 h-[35px] border-white hover:border-custom-black-500 text-custom-text-body rounded-full text-sm py-[2px] px-4 font-bodyMediumFont font-medium capitalize"
                            >
                              {g}
                            </Button>
                          ))
                        )}
                      </div>
                    </section>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <p className="text-custom-text-body text-sm font-bodyRegularFont font-normal">
                    Book not found
                  </p>
                </div>
              )}
            </>
          </div>
          <section className="fixed bottom-4 left-0 right-0 flex justify-center z-10">
            <CartTray />
          </section>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
