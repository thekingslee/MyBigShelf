import protectedInstance from '@/services/protected-api-client';
import { useQuery } from '@tanstack/react-query';
import { useURLParams } from '@/hooks/useURLParams';

export interface CartDetails {
  order: {
    customId: string;
    totalAmount: number;
    itemsNumber: number;
    deliveryFee: number;
    items: Array<{
      itemId: string;
      quantity: number;
      bookCover: string;
      amount: number;
      profit: number;
      bookTitle: string;
      author: string;
    }>;
  };
  user_name: string;
  userId: string;
}

const useCartDetails = ({ coupon }: { coupon: string }) => {
  const { params } = useURLParams<{
    haul: boolean;
    affiliate: string;
  }>({
    haul: { type: 'boolean', default: false },
    affiliate: { type: 'string' },
  });

  return useQuery<{
    data: CartDetails;
  }>({
    queryKey: ['cart-details', params.haul, params.affiliate],

    queryFn: () =>
      protectedInstance
        .post('/orders/cart-details', {
          ...(params.affiliate && {
            affiliateUsername: params.affiliate,
          }),
          bookHaul: params.haul,
          code: coupon || '',
        })
        .then((res) => res.data),
  });
};

export default useCartDetails;
