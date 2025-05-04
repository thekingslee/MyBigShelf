import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";

export interface BookById {
  id?: string;
  title?: string;
  author?: string;
  bookCover?: string;
  about?: string;
  ogPrice?: number;
  profit?: number;
  language?: string;
  ageRating?: number;
  genre?: string[];
  available?: true;
  pageCount?: number;
  totalPrice?: number;
}

interface BookByIdResponse {
  message: string;
  data: {
    bookId: string;
    book: BookById;
  };
}

const httpsServices = new HttpsServices<BookByIdResponse>("books/open");

const useBookById = (id: string | undefined) => {
  return useQuery<BookByIdResponse, Error>({
    queryKey: ["book_details", id],
    queryFn: () => {
      if (!id) throw new Error("Book ID is required");
      return httpsServices.getAll(id);
    },
    enabled: !!id, // Only fetch when ID is provided
    cacheTime: 5 * 60 * 1000, // Cache for 5 minutes
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });
};

export default useBookById;