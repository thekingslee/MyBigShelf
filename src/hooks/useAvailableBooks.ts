import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";

export interface Books {
  id: string;
  title: string;
  author: string;
  bookCover: string;
  totalPrice: number;
  // available: boolean;
}

export interface Pagination {
  totalBooks: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface BookResponse {
  msg: string;
  status: string;
  data: {
    books: Books[];
    pagination: Pagination;
  };
}

const httpsServices = new HttpsServices<BookResponse>("books/available");

interface AvailableBookParams {
  pageNumber?: number;
  query?: string;
  pageSize?: number;
  genre?: string;
}

const useAvailableBook = (params: AvailableBookParams = {}) => {
  return useQuery<BookResponse, Error>({
    queryKey: ["available_books", params],
    queryFn: () =>
      httpsServices.getAll(undefined, {
        ...params,
        ...(params.genre && { genre: params.genre }),
      }),
  });
};

export default useAvailableBook;
