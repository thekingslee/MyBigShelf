export interface Genre {
  _id: string;
  name: string;
  color?: string;
  image?: string;
}

export interface GenreResponse {
  status: string;
  data: {
    genre: Genre[];
  };
}

import { useQuery } from "@tanstack/react-query";
import HttpsServices from "@/services/https-services";

const httpsServices = new HttpsServices<GenreResponse>("/genre", true);

const useGenres = () => {
  return useQuery<GenreResponse, Error>({
    queryKey: ["genres"],
    queryFn: () => httpsServices.getAll(),
  });
};

export default useGenres;
