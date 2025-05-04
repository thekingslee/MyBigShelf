/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AddressComponent from "./AddressComponent";
import useAddress, { AddressResponse } from "@/hooks/useAddress";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import protectedInstance from "@/services/protected-api-client";
import toast from "react-hot-toast";
import useHaulAddress, { HaulAddressResponse } from "@/hooks/useHaulAddress";
import { useURLParams } from "@/hooks/useURLParams";

type AddressOrHaulAddress = AddressResponse | HaulAddressResponse | undefined;

export function AddressSubTab() {
  const { params, updateParams } = useURLParams<{
    haul: boolean;
  }>({
    haul: { type: "boolean", default: false },
  });

  const activeTab = params.haul ? "haul" : "quick";
  const queryClient = useQueryClient();

  const { data: quickOrderAddress, isLoading: addressLoading } = useAddress();
  const { data: haulAddress, isLoading: haulAddressLoading } = useHaulAddress();

  const handleTabChange = (value: string) => {
    updateParams({ haul: value === "haul" });
  };

  const updateDefaultAddress = useMutation({
    mutationFn: (addressId: string) =>
      protectedInstance
        .put(`/users/address/${addressId}`)
        .then((res) => res.data),
    onMutate: async (newDefaultAddressId) => {
      await queryClient.cancelQueries({ queryKey: ["address"] });
      const previousAddresses = queryClient.getQueryData(["address"]);

      queryClient.setQueryData(["address"], (old: AddressResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            address: old.data.address.map((addr) => ({
              ...addr,
              default: addr.id === newDefaultAddressId,
            })),
          },
        };
      });

      return { previousAddresses };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Default address updated successfully");
    },
    onError: (error: any, _newDefaultAddressId, context) => {
      queryClient.setQueryData(["address"], context?.previousAddresses);
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
    },
  });

  const getAddressData = (isHaulView: boolean): AddressOrHaulAddress => {
    return isHaulView ? haulAddress : quickOrderAddress;
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="bg-custom-black-100 border shadow-none rounded-[12px] border-solid p-[2px]">
        <TabsTrigger
          value="quick"
          className="data-[state=active]:bg-custom-text-primary rounded-[12px] data-[state=active]:text-white text-custom-text-primary px-4 py-2"
        >
          Quick order
        </TabsTrigger>
        <TabsTrigger
          value="haul"
          className="data-[state=active]:bg-custom-text-primary rounded-[12px] data-[state=active]:text-white text-custom-text-primary px-4 py-2"
        >
          Haul
        </TabsTrigger>
      </TabsList>

      <TabsContent value="quick" className="mt-4 text-gray-200">
        <AddressComponent
          address={getAddressData(false)}
          addressLoading={addressLoading}
          updateDefaultAddress={updateDefaultAddress}
          isHaulView={false}
        />
      </TabsContent>
      <TabsContent value="haul" className="mt-4 text-gray-200">
        <AddressComponent
          address={getAddressData(true)}
          addressLoading={haulAddressLoading}
          updateDefaultAddress={updateDefaultAddress}
          isHaulView={true}
        />
      </TabsContent>
    </Tabs>
  );
}

export default AddressSubTab;