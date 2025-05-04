import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";
import axios from "axios";

interface ShippingInfo {
  city: string;
  state: string;
  country: string;
  address: string;
  name: string;
}

interface ItemId {
  id: string;
  author: string;
  title: string;
}

export interface OrderItems {
  itemId: ItemId;
  quantity: number;
  amount: number;
}

interface UserOrder {
  id: string;
  email: string;
  username: string;
  name: string;
}

interface OrderByCustomId {
  customId: string;
  user: UserOrder;
  affiliate: string;
  type: string;
  items: OrderItems[];
  status: string;
  paymentReference: string;
  totalAmount: number;
  realProfit: number;
  totalProfit: number;
  affiliateProfit: number;
  createdAt: string;
  shippingInfo: ShippingInfo[];
}

export interface OrderByCustomIdResponse {
  status: string;
  message: string;
  order: OrderByCustomId;
}

const httpsServices = new HttpsServices<OrderByCustomIdResponse>("/track");

const useOrderTracker = (customId: string | undefined) => {
  return useQuery<OrderByCustomIdResponse, Error>({
    queryKey: ["order_details", customId],
    queryFn: async () => {
      if (!customId) {
        throw new Error("No order ID provided");
      }
      try {
        const response = await httpsServices.getAll(customId);
        return response;
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // This is where we handle the error response from the backend
          const errorData = error.response.data as OrderByCustomIdResponse;
          throw new Error(errorData.message);
        }
        throw error; // Re-throw if it's not an Axios error
      }
    },
    enabled: !!customId && customId.length === 7,
    cacheTime: 0,
    staleTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: "always",
  });
};

export default useOrderTracker;
