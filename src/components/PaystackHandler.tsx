/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PaystackResponse } from '@/pages/Checkout';
import PaystackIcon from '@/assets/PaystackIcon.svg';
import protectedInstance from '@/services/protected-api-client';
import useAddress from '@/hooks/useAddress';
import { useURLParams } from '@/hooks/useURLParams';
import { useAddressStore } from '@/stores/addressStore';
import { Alert, AlertDescription } from './ui/alert';

interface CartDetails {
  order: {
    customId: string;
    items: Array<{
      itemId: string;
      quantity: number;
      amount: number;
      profit: number;
      bookTitle: string;
    }>;
    totalAmount: number;
    totalProfit: number;
    shippingInfo: {
      city: string;
      country: string;
      state: string;
      address: string;
      name: string;
    };
  };
  user_name: string;
  userId: string;
}

export interface OrderResponseData {
  order: {
    customId: string;
    user: string;
    userId: string;
    deliveryFee: number;
    items: Array<{
      itemId: string;
      quantity: number;
      amount: number;
      profit: number;
    }>;
    itemsChanged: boolean;
    itemsNumber: number;
    paymentReference: string;
    shippingInfo: any[];
    status: string;
    statusPriority: number;
    totalAmount: number;
    totalProfit: number;
    type: string;
    createdAt: string;
    updatedAt: string;
    userImage: string;
    userName: string;
    _id: string;
    __v: number;
  };
  message: string;
  status: string;
}

interface PaystackHandlerProps {
  email: string;
  amount: number;
  coupon: string;
  onSuccess: (
    reference: PaystackResponse,
    orderDetails: OrderResponseData
  ) => void;
  onClose: () => void;
}

const PaystackHandler: React.FC<PaystackHandlerProps> = ({
  onSuccess,
  coupon,
}) => {
  const [loading, setLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState<CartDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: address, isLoading: addressLoading } = useAddress();
  const { selectedAddressId } = useAddressStore();

  const getCurrentURL = () => {
    return window.location.href;
  };

  const { params: urlParams } = useURLParams<{
    affiliate: string;
    haul: boolean;
  }>({
    affiliate: { type: 'string' },
    haul: { type: 'boolean', default: false },
  });

  // Fetch cart details
  useEffect(() => {
    const fetchCartDetails = async () => {
      if (!selectedAddressId) return;

      try {
        const response = await protectedInstance.post('/orders/cart-details', {
          ...(urlParams.affiliate && {
            affiliateUsername: urlParams.affiliate,
          }),
          bookHaul: urlParams.haul,
          shippingAddress: selectedAddressId,
          code: coupon,
        });

        if (!response.data?.data) {
          throw new Error('Invalid cart details received');
        }

        setCartDetails(response.data.data);
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || 'Failed to fetch cart details';
        setError(errorMessage);
        console.error('Cart details error:', errorMessage);
      }
    };

    if (selectedAddressId) {
      fetchCartDetails();
    }
  }, [urlParams.affiliate, urlParams.haul, selectedAddressId, coupon]);

  const handlePaymentInitiation = async () => {
    if (!cartDetails) {
      setError('Cart details not available');
      return;
    }

    if (!selectedAddressId) {
      setError('Please select a shipping address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const callbackURL = getCurrentURL();
      // Initialize payment with backend
      const initResponse = await protectedInstance.post('/orders/createorder', {
        affiliateUsername: urlParams.affiliate,
        bookHaul: urlParams.haul,
        shippingAddress: selectedAddressId,
        callback_url: callbackURL,
        code: coupon,
      });

      const paymentRef = initResponse.data.data.paymentReference;
      if (
        !paymentRef?.data?.authorization_url ||
        !paymentRef?.data?.reference
      ) {
        throw new Error('Invalid payment initialization response');
      }

      // Store reference for verification
      localStorage.setItem('paystack_payment_ref', paymentRef.data.reference);

      // Redirect to Paystack checkout
      window.location.href = paymentRef.data.authorization_url;
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'Failed to initialize payment';
      setError(errorMessage);
      setLoading(false);
    }
  };

  // Check for payment reference on component mount
  useEffect(() => {
    const checkPaymentReference = async () => {
      const storedRef = localStorage.getItem('paystack_payment_ref');
      if (storedRef) {
        try {
          const orderDetails = await protectedInstance.get<{
            data: OrderResponseData;
          }>(`/orders/createorder?reference=${storedRef}`);

          console.log('orderDetails:::::::::', orderDetails);

          if (orderDetails.data?.data) {
            onSuccess(
              { reference: storedRef } as PaystackResponse,
              orderDetails.data.data
            );
          }

          localStorage.removeItem('paystack_payment_ref');
        } catch (err) {
          console.error('Error verifying payment:', err);
        }
      }
    };

    checkPaymentReference();
  }, [onSuccess]);

  const getButtonText = () => {
    if (addressLoading) return 'Loading address...';
    if (!address || address.data.address.length === 0)
      return 'Add shipping address to continue';
    if (!selectedAddressId) return 'Select shipping address';
    if (loading) return 'Processing...';
    if (!cartDetails) return 'Loading cart...';
    return 'Make Payment';
  };

  const isButtonDisabled =
    loading ||
    !cartDetails ||
    !address ||
    !selectedAddressId ||
    address.data.address.length === 0;

  if (error) {
    return (
      <Alert variant="destructive" className="mb-4">
        <AlertDescription className="flex flex-col gap-4 items-center">
          <p>{error}</p>
          <Button
            onClick={() => setError(null)}
            variant="outline"
            className="mt-2"
          >
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 justify-center">
      <Button
        onClick={handlePaymentInitiation}
        disabled={isButtonDisabled}
        className="w-full sm:w-[500px] h-12 bg-custom-text-primary text-white hover:bg-opacity-90 font-bold"
      >
        {getButtonText()}
      </Button>
      <div className="flex items-center gap-1 justify-center">
        <p className="text-custom-text-body text-xs">Payment secured by</p>
        <img src={PaystackIcon} alt="Paystack Icon" className="h-4" />
      </div>
    </div>
  );
};

export default PaystackHandler;
