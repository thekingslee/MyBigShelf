import { formatMoney } from '@/utils';
import { Separator } from '@radix-ui/react-select';
import OrderSummaryList from './OrderSummaryList';
import { CartDetails } from '@/hooks/useCartDetails';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ScaleLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import protectedInstance from '@/services/protected-api-client';

type CouponStatus = 'default' | 'success' | 'error' | 'loading';

const OrderSummaryCheckout = ({
  cartDetails,
  className,
  setCouponApplied,
}: {
  cartDetails: CartDetails | undefined;
  className: string;
  setCouponApplied: (coupon: string) => void;
}) => {
  const [coupon, setCoupon] = useState('');
  const [status, setStatus] = useState<CouponStatus>('default');

  const queryClient = useQueryClient();

  const applyCoupon = useMutation({
    mutationFn: (values: { code: string }) =>
      protectedInstance
        .get(`/coupons/validate?code=${values.code}`)
        .then((res) => res.data),
    onSuccess: ({ data }) => {
      if (data?.valid) {
        toast.success('Book request submitted successfully');
        setStatus('success');
        setCouponApplied(coupon); // Throw coupon up after validating to refresh cart details
      } else {
        setStatus('error');
        toast.error('The coupon is invalid');
      }
      queryClient.invalidateQueries({
        queryKey: ['applyCoupon'],
      });
    },
    onError: () => {
      setCouponApplied('');
      toast.error('Something went wrong');
      setStatus('error');
    },
  });

  const handleCoupon = () => {
    setStatus('loading');
    applyCoupon.mutate({ code: coupon });
  };

  return (
    <div className={`order-1 md:order-2 ${className}`}>
      <div className="py-6 rounded-none shadow-none bg-custom-black-100 pt-0">
        <h3 className="text-2xl mb-4 font-bodyBoldFont font-bold text-custom-text-primary">
          Order Summary
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-custom-gray_500">
            <span>Subtotal</span>
            <span className="font-semibold text-custom-text-primary">
              <span className="font-sans">₦</span>
              {formatMoney(cartDetails?.order.totalAmount || 0)}
            </span>
          </div>
          <div className="flex justify-between text-custom-gray_500">
            <span>Delivery cost</span>
            <span className="font-semibold text-custom-text-primary">
              <span className="font-sans">₦</span>
              {formatMoney(cartDetails?.order.deliveryFee || 0)}
            </span>
          </div>
          <Separator />
          <div className="flex justify-between text-custom-gray_500 font-semibold">
            <span>Order Total</span>
            <span className="text-custom-text-primary">
              <span className="font-sans">₦</span>
              {formatMoney(
                (cartDetails?.order.totalAmount || 0) +
                  (cartDetails?.order.deliveryFee || 0)
              )}
            </span>
          </div>
        </div>

        {cartDetails && (
          <OrderSummaryList cartDetails={{ data: cartDetails }} />
        )}

        <div className="mt-4">
          <h4 className="text-2xl mb-4 font-bodyBoldFont font-bold text-custom-text-primary">
            Apply Coupon
          </h4>

          <div className="flex gap-2">
            <div className="block w-full">
              <Input
                type="text"
                placeholder="Enter coupon code"
                value={coupon}
                onChange={(e) => {
                  setCoupon(e.target.value.toUpperCase());
                  setStatus('default');
                  setCouponApplied(' ');
                }}
                className={cn(
                  'pr-10 h-[48px] text-base font-medium font-bodyMediumFont text-custom-black-900 rounded-lg border bg-white placeholder:font-normal placeholder:font-bodyRegularFont placeholder:text-base placeholder:text-custom-text-secondary',
                  status === 'error'
                    ? 'border-custom-error-300 bg-custom-error-200 focus:bg-custom-error-200 focus:border-custom-error-300'
                    : status === 'success'
                    ? ' bg-custom-success-light border-custom-success'
                    : 'border-custom-black-400 focus:bg-white focus:border-custom-text-primary',
                  'focus:outline-none'
                )}
              />
              <p
                className={cn(
                  'text-sm text-custom-gray-500 mt-1',
                  status === 'error'
                    ? 'text-custom-error-300'
                    : status === 'success'
                    ? 'text-custom-success'
                    : ''
                )}
              >
                {status === 'success'
                  ? 'Coupon applied successfully'
                  : status === 'error'
                  ? 'Invalid coupon code'
                  : ''}
              </p>
            </div>

            {status !== 'success' && (
              <Button
                onClick={handleCoupon}
                className="w-auto h-[48px] min-w-16 rounded-[8px] px-4 py-[9px] font-bodyBoldFont font-bold text-base text-custom-black-50 bg-custom-info hover:bg-custom-secondary hover:text-custom-black-50"
              >
                {status === 'loading' ? (
                  <ScaleLoader height={15} color={'#FFFFFF'} />
                ) : (
                  'Apply'
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummaryCheckout;
