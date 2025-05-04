interface Books {
  id: string;
  title: string;
  author: string;
  bookCover: string;
  totalPrice: number;
  // available: boolean;
}

export const generateProductId = (book: Books) => {
  if (!book) return;
  return (
    book?.title?.toLowerCase()?.replace(/ /g, '-') + // Replace all spaces globally
    '-by-' +
    book?.author?.toLowerCase()?.replace(/ /g, '-') + // Replace all spaces globally
    '-' +
    book?.id
  );
};

export const extractProductId = (meaningfulId: string) => {
  if (!meaningfulId) return;
  const idArr = meaningfulId?.split('-');
  return idArr[idArr?.length - 1]; // Return last item
};
