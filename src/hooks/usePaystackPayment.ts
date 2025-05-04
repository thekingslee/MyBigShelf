/* eslint-disable @typescript-eslint/no-explicit-any */
import protectedInstance from "@/services/protected-api-client";
import { useState } from "react";

const usePaystackPayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (transaction: any) => {
    setLoading(true);
    setError(null);

    try {
      const response = await protectedInstance.get(
        `/api/v1/orders/createorder`,
        {
          params: {
            reference: transaction.reference,
          },
        }
      );

      const data = await response.data;

      if (data.success) {
        // Payment successful, handle accordingly (e.g., show success message, update UI)
        console.log("Order created successfully");
        return data; // You might want to return the order details
      } else {
        setError(data.message || "Order creation failed");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while processing the order"
      );
      console.error("Error processing order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    console.log("Payment cancelled");
  };

  const handleError = (err: any) => {
    setError("An error occurred during payment");
    console.error("Paystack error:", err);
  };

  return {
    loading,
    error,
    handlePayment,
    handleClose,
    handleError,
  };
};

export default usePaystackPayment;
