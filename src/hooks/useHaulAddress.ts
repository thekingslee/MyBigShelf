import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";

export interface HaulAddress {
  _id: string;
  name: string;
  address: string;
  phoneNo: string;
  pickupDate: string;
  city: string;
  state: string;
  country: string;
}

export interface HaulAddressResponse {
  status: string;
  data: {
    bookHauls: HaulAddress[];
    pagination: {
      total: number;
      limit: number;
      page: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

const httpsServices = new HttpsServices<HaulAddressResponse>("/hauls", true);

const useHaulAddress = () => {
  return useQuery<HaulAddressResponse, Error>({
    queryKey: ["haulAddress"],
    queryFn: () => httpsServices.getAll(),
  });
};

export default useHaulAddress;