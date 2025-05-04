import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";

export interface Address {
  id: string;
  city: string;
  country: string;
  state: string;
  address: string;
  default: boolean;
  name: string;
  phoneNo: string;
}

export interface AddressResponse {
  status: string;
  data: {
    address: Address[];
  };
}

const httpsServices = new HttpsServices<AddressResponse>("/users/address", true);

const useAddress = () => {
  return useQuery<AddressResponse, Error>({
    queryKey: ["address"],
    queryFn: () => httpsServices.getAll(),
  });
};

export default useAddress;
