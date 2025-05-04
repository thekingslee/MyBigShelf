/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, CSSProperties } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from '@/components/Footer';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import NavBar from '@/components/NavBar';
import CartIcon from '@/components/CartIcon';
import Bag from '@/assets/Bag1.svg';
import useAddress, { Address } from '@/hooks/useAddress';
import toast from 'react-hot-toast';
import NewOrderDetailCard from '@/components/NewOrderDetailsCard';
import { useCartStore } from '@/stores/cartStore';
import PaystackHandler, {
  OrderResponseData,
} from '@/components/PaystackHandler';
import { formatMoney } from '@/utils';
import AddressFormDrawer from '@/components/AddressFormDrawer';
import Divider from '@/components/Divider';
import { Button } from '@/components/ui/button';
import WhatsappIcon from '@/assets/whatsappIcon.svg';
import { useNavigate } from 'react-router-dom';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import { ScaleLoader } from 'react-spinners';
import useCartDetails from '@/hooks/useCartDetails';
import { useURLParams } from '@/hooks/useURLParams';
import { AddressSubTab } from '@/components/AddressSubTab';
import { useAddressStore } from '@/stores/addressStore';
import useHaulAddress, { HaulAddress } from '@/hooks/useHaulAddress';
import OrderSummaryCheckout from '@/components/OrderSummaryCheckout';

export interface PaystackResponse {
  reference: string;
}

const Checkout = () => {
  const { userProfile, clearCart } = useCartStore();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [completedOrderId, setCompletedOrderId] = useState<string>('');
  const navigate = useNavigate();
  const [email, setEmail] = useState(userProfile?.email || '');
  const [couponApplied, setCouponApplied] = useState('');

  const { params } = useURLParams<{
    affiliate: string;
    haul: boolean;
  }>({
    affiliate: { type: 'string' },
    haul: { type: 'boolean', default: false },
  });

  const override: CSSProperties = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const { data: address } = useAddress();
  const { data: haulAddress } = useHaulAddress();

  const {
    data: cartDetails,
    isLoading: cartLoading,
    refetch,
  } = useCartDetails({ coupon: couponApplied });

  useEffect(() => {
    if (couponApplied) {
      refetch();
    }
  }, [couponApplied, refetch]);

  useEffect(() => {
    if (userProfile?.email) {
      setEmail(userProfile.email);
    }
  }, [userProfile]);

  const handleSuccess = async (
    _reference: PaystackResponse,
    orderDetails: OrderResponseData
  ) => {
    try {
      toast.success('Payment successful!');
      setCompletedOrderId(orderDetails.order.customId);
      console.log(orderDetails.order.customId);
      setShowSuccessModal(true);
      clearCart();
    } catch (error: any) {
      toast.error(error.message || 'Failed to process order');
    }
  };

  const handleClose = () => {
    toast.error('Payment cancelled');
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/');
  };

  const generateWhatsAppMessage = () => {
    if (!cartDetails) return '';
    const { selectedAddressId } = useAddressStore.getState();
    // Find the selected address based on order type
    let selectedAddress = null;
    if (params.haul && haulAddress?.data.bookHauls) {
      selectedAddress = haulAddress.data.bookHauls.find(
        (addr) => addr._id === selectedAddressId
      );
    } else if (address?.data.address) {
      selectedAddress = address.data.address.find(
        (addr) => addr.id === selectedAddressId
      );
    }

    console.log(selectedAddress);

    let message = `Hello! I'd like to place an order for the following items:\n\n`;
    cartDetails.data.order.items.forEach((item) => {
      message += `${item.bookTitle} - Quantity: ${
        item.quantity
      } - Price: ₦${formatMoney(item.amount)}\n`;
    });

    message += `\nSubtotal: ₦${formatMoney(
      cartDetails.data.order.totalAmount
    )}`;
    message += `\nDelivery Fee: ₦${formatMoney(
      cartDetails.data.order.deliveryFee
    )}`;
    message += `\nTotal: ₦${formatMoney(
      cartDetails.data.order.totalAmount + cartDetails.data.order.deliveryFee
    )}`;

    // Add delivery address details based on order type
    if (selectedAddress) {
      message += `\n\nDelivery Address:`;
      message += `\nName: ${selectedAddress.name}`;
      message += `\nPhone: ${selectedAddress.phoneNo}`;

      if (params.haul) {
        // Haul address format
        message += `\nPickup Location: ${
          (selectedAddress as HaulAddress).address
        }`;
        message += `\nPickup Date: ${new Date(
          (selectedAddress as HaulAddress).pickupDate
        ).toLocaleDateString()}`;
      } else {
        // Regular address format
        message += `\nAddress: ${selectedAddress.address}`;
        message += `\nCity: ${(selectedAddress as Address).city}`;
        message += `\nState: ${(selectedAddress as Address).state}`;
        message += `\nCountry: ${(selectedAddress as Address).country}`;
      }
    } else {
      message += `\n\nNo delivery address selected. Please select a delivery address.`;
    }

    // Add affiliate information if available
    if (params.affiliate || params.haul !== undefined) {
      message += '\n\nOrder Details:';
      if (params.affiliate) {
        message += `\nAffiliate: ${params.affiliate.replace(/['"]+/g, '')}`;
      }
      if (params.haul !== undefined) {
        message += `\nOrder Type: ${params.haul ? 'Haul' : 'Quick Order'}`;
      }
    }

    return encodeURIComponent(message);
  };

  const openWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const whatsappNumber = '+2349134152730';
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const bookshopActionButton = (
    <>
      <div className="relative">
        <CartIcon icon={Bag} />
      </div>
      <GoogleSignInButton />
    </>
  );

  if (cartLoading) {
    return (
      <div>
        <ScaleLoader
          color="#1E1E1E"
          loading={true}
          cssOverride={override}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="font-bodyRegularFont bg-custom-black-100 min-h-screen flex flex-col">
      <Toaster />
      <header className="bg-white">
        <NavBar actionButtons={bookshopActionButton} />
      </header>
      <main className="flex-grow max-w-[970px] mx-auto w-full px-4 py-14">
        <div className="grid gap-2 md:grid-cols-[1fr_375px]">
          <div className="order-1 md:order-1">
            <NewOrderDetailCard title="Shipping Address">
              <AddressSubTab />
              <AddressFormDrawer />
            </NewOrderDetailCard>

            <OrderSummaryCheckout
              cartDetails={cartDetails?.data}
              className="block md:hidden my-8 px-0"
              setCouponApplied={(coupon: string) => setCouponApplied(coupon)}
            />

            <div className="mt-6 flex flex-col gap-4">
              {cartDetails && (
                <PaystackHandler
                  email={email}
                  coupon={couponApplied}
                  amount={
                    cartDetails.data.order.totalAmount +
                    cartDetails.data.order.deliveryFee
                  }
                  onSuccess={handleSuccess}
                  onClose={handleClose}
                />
              )}
              <Divider />
              <Button
                variant="outline"
                className="flex gap-1 items-center border border-solid border-custom-black-300 justify-center lg:w-auto h-[48px] mx-auto bg-custom-black-50 text-custom-text-primary font-bodyBoldFont font-bold text-base rounded-[8px] px-4 py-[13px]"
                onClick={openWhatsApp}
              >
                <img src={WhatsappIcon} alt="Whatsapp Icon" />
                <p>Complete order via WhatsApp</p>
              </Button>
            </div>
          </div>
          <OrderSummaryCheckout
            cartDetails={cartDetails?.data}
            className="hidden md:block px-4"
            setCouponApplied={(coupon: string) => setCouponApplied(coupon)}
          />
        </div>
      </main>
      <footer className="lg:flex lg:justify-center bg-white pt-[150px]">
        <Footer />
      </footer>
      <OrderSuccessModal
        isOpen={showSuccessModal}
        orderId={completedOrderId}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default Checkout;
