import { Books } from '@/hooks/useAvailableBooks';
import { isValidImageUrl } from '@/utils';
import Book from '@/assets/picture.png';
import { QuantityControl } from './QuantityControl';
import { useNavigate, useLocation } from 'react-router-dom';
import { generateProductId } from '@/lib/productIdParser';

interface BookCardProps {
  book: Books;
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    const searchParams = new URLSearchParams(location.search);
    const bookId = generateProductId(book);

    if (bookId) {
      searchParams.set('item-id', bookId);
    }
    navigate(
      {
        pathname: location.pathname,
        search: searchParams.toString(),
      },
      { replace: true }
    );
  };

  const handleQuantityControlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="flex flex-col justify-between gap-4 cursor-pointer h-full"
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <img
          className="w-ful h-40 sm:h-44 object-cover rounded-[8px]"
          src={
            book.bookCover && isValidImageUrl(book.bookCover)
              ? book.bookCover
              : Book
          }
          alt={book.title}
          onError={(e) => {
            e.currentTarget.src = Book;
          }}
        />
        <div className="my-2 flex-grow">
          <p className="font-bodyBoldFont font-bold text-custom-text-primary text-base leading-5 line-clamp-2">
            {book.title || '---'}
          </p>
          <p className="font-bodyRegularFont font-normal text-custom-text-body text-xs sm:text-sm line-clamp-1">
            {book.author || '---'}
          </p>
        </div>
        <p className="font-bodyBoldFont font-bold text-custom-text-primary text-sm sm:text-base">
          <span className="font-sans">₦</span>
          {book.totalPrice ?? '--'}
        </p>
      </div>
      <div onClick={handleQuantityControlClick}>
        <QuantityControl item={book} />
      </div>
    </div>
  );
};
