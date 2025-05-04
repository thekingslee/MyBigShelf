import { useState, useEffect, CSSProperties } from 'react';
import { useSearchParams } from 'react-router-dom';
import CustomSearch from '@/components/CustomSearch';
import NavBar from '@/components/NavBar';
import OrderDetails from '@/components/OrderDetails';
import Text from '@/components/Text';
import useOrderTracker from '@/hooks/useOrderTracker';
import { Toaster, toast } from 'react-hot-toast';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Tracker = () => {
  const defaultActionButton = (
    <Link to="/">
      <Button className="w-[248px] h-[48px] text-white text-lg font-bold font-bodyBoldFont px-[16px] py-[13px] bg-custom-black-900 rounded-[12px]">
        Place an order
      </Button>
    </Link>
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const orderIdFromUrl = searchParams.get('order-id') || '';

  const [orderId, setOrderId] = useState<string | undefined>(
    orderIdFromUrl as string
  );
  const [inputValue, setInputValue] = useState<string>(
    orderIdFromUrl as string
  );
  const [isSuccess, setIsSuccess] = useState(false);
  console.log(orderIdFromUrl);

  const {
    data: orderData,
    isLoading,
    isError,
    error,
  } = useOrderTracker(orderId);

  const override: CSSProperties = {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSearchParams({ 'order-id': value }); // Update URL search param
    if (value.length === 7) {
      setOrderId(value);
    } else {
      setOrderId(undefined);
      setIsSuccess(false);
    }
  };

  useEffect(() => {
    if (orderData) {
      if (orderData.status === 'success') {
        toast.success(orderData.message);
        setIsSuccess(true);
      } else if (orderData.status === 'Fail') {
        toast.error(orderData.message);
        setIsSuccess(false);
      }
    }
    if (isError && error instanceof Error) {
      toast.error(error.message);
      setIsSuccess(false);
    }
  }, [orderData, isError, error]);

  useEffect(() => {
    if (inputValue.length === 0) {
      setIsSuccess(false);
    }
  }, [inputValue]);

  return (
    <div>
      <Toaster />
      <section className="w-full bg-custom-gradient">
        <NavBar actionButtons={defaultActionButton} />
        <div className="py-[100px] flex flex-col gap-3 justify-center items-center">
          <Text
            align="center"
            header="Find your Order"
            className="lg:w-[500px]"
          >
            Enter your order ID to see where your books are and when they'll
            arrive.
          </Text>
          <div className="lg:w-[400px]">
            <CustomSearch
              placeholder="Enter order ID"
              onInputChange={handleInputChange}
              value={inputValue}
              isSuccess={isSuccess}
            />
          </div>
        </div>
      </section>
      <section>
        {isLoading && orderId && (
          <div className="text-center mt-4">
            <ScaleLoader
              color="#1E1E1E"
              loading={true}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        )}
        {!isLoading && orderData && orderData.status === 'success' && (
          <div className="bg-custom-black-50">
            <OrderDetails orderData={orderData} />
          </div>
        )}
      </section>
      <section className="flex justify-center">
        <Faq />
      </section>
      <footer className="lg:flex lg:justify-center pt-[150px]">
        <Footer />
      </footer>
    </div>
  );
};

export default Tracker;
