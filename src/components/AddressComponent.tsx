/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAddressStore } from "@/stores/addressStore";
import Trash from "@/assets/Trash.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Check from "@/assets/checkIcon.svg";
import Location from "@/assets/Location.svg";
import SkeletonAddress from "./SkeletonAddress";
import { Address, AddressResponse } from "@/hooks/useAddress";
import { HaulAddress, HaulAddressResponse } from "@/hooks/useHaulAddress";
import protectedInstance from "@/services/protected-api-client";
import ClipLoader from "react-spinners/ClipLoader";

interface AddressComponentProps {
  address: AddressResponse | HaulAddressResponse | undefined;
  addressLoading: boolean;
  updateDefaultAddress: {
    mutate: (addressId: string) => void;
  };
  isHaulView?: boolean;
}

const AddressComponent: React.FC<AddressComponentProps> = ({
  address,
  addressLoading,
  updateDefaultAddress,
  isHaulView = false,
}) => {
  const [hoveredAddressId, setHoveredAddressId] = useState<string | null>(null);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(
    null
  );
  const { selectedAddressId, setSelectedAddressId } = useAddressStore();
  const queryClient = useQueryClient();

  // Type guard
  const isQuickOrderResponse = (
    addr: AddressResponse | HaulAddressResponse | undefined
  ): addr is AddressResponse => {
    return addr !== undefined && "address" in addr.data;
  };

  // Effect to set initial selected address for quick orders
  useEffect(() => {
    if (!isHaulView && address && isQuickOrderResponse(address)) {
      const defaultAddress = address.data.address.find((addr) => addr.default);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
      }
    }
  }, [address, isHaulView, setSelectedAddressId]);

  const deleteAddress = useMutation({
    mutationFn: (addressId: string) =>
      protectedInstance
        .delete(`/users/address/${addressId}`)
        .then((res) => res.data),
    onMutate: (addressId: string) => {
      setDeletingAddressId(addressId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["address"] });
      toast.success("Address deleted successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while deleting the address";
      toast.error(errorMessage);
    },
    onSettled: () => {
      setDeletingAddressId(null);
    },
  });

  const handleAddressSelection = (addressId: string, isDefault: boolean) => {
    if (isHaulView) {
      setSelectedAddressId(addressId);
    } else if (!isDefault) {
      updateDefaultAddress.mutate(addressId);
      setSelectedAddressId(addressId);
    }
  };

  const renderQuickOrderAddress = (location: Address) => (
    <div className="grid gap-[5.5px]">
      <img src={Location} alt="Location Icon" />
      <p className="text-custom-darkest text-lg font-bodyMediumFont">
        {`${location.name} `}
        <span className="font-bodyBoldFont font-bold text-sm text-custom-info">
          {location.default ? "DEFAULT" : ""}
        </span>
      </p>
      <p className="text-base font-bodyRegularFont text-custom-gray-500">
        {`${location.address} | ${location.city} | ${location.state} | ${location.country} | ${location.phoneNo}`}
      </p>
    </div>
  );

  const renderHaulAddress = (location: HaulAddress) => (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <img src={Location} alt="Location Icon" />
        <p className="text-custom-darkest text-base font-bodyMediumFont">
          {`${location.city}, ${location.state}`}
        </p>
      </div>
      <div className="grid">
        <p className="text-sm text-custom-gray-500">Agent:</p>
        <p className="text-base font-bodyRegularFont">
          {location.name || "Not specified"}
        </p>
      </div>
      <div className="grid">
        <p className="text-sm text-custom-gray-500">Pickup address:</p>
        <p className="text-base font-bodyRegularFont">
          {`${location.address} | ${location.phoneNo}`}
        </p>
      </div>
      <div className="grid">
        <p className="text-sm text-custom-gray-500">Pickup date:</p>
        <p className="text-base font-bodyRegularFont">
          {new Date(location.pickupDate).toLocaleDateString() ||
            "Not specified"}
        </p>
      </div>
    </div>
  );

  const getAddressItems = () => {
    if (!address) return [];
    return isQuickOrderResponse(address)
      ? address.data.address
      : address.data.bookHauls;
  };

  const getAddressId = (location: Address | HaulAddress): string => {
    return "id" in location ? location.id : location._id;
  };

  const isDefaultAddress = (location: Address | HaulAddress): boolean => {
    return "default" in location ? location.default : false;
  };

  if (addressLoading) {
    return <SkeletonAddress />;
  }

  if (!address) {
    return <p>No addresses available.</p>;
  }

  const addresses = getAddressItems();

  if (addresses.length === 0) {
    return <p>No addresses available.</p>;
  }

  return (
    <div className="grid gap-4">
      {addresses.map((location: Address | HaulAddress) => {
        const addressId = getAddressId(location);
        const isDefault = isDefaultAddress(location);
        const isSelected = selectedAddressId === addressId;

        return (
          <Card
            key={addressId}
            className={`p-4 shadow-none rounded-[12px] border border-solid ${
              isSelected || isDefault
                ? "bg-custom-aqua-200 border-custom-info"
                : "bg-custom-black-50 border-custom-black-300"
            } cursor-pointer relative transition-colors duration-200`}
            onClick={() => handleAddressSelection(addressId, isDefault)}
            onMouseEnter={() => setHoveredAddressId(addressId)}
            onMouseLeave={() => setHoveredAddressId(null)}
          >
            <CardContent className="m-0 p-0 flex justify-between items-start">
              {isHaulView
                ? renderHaulAddress(location as HaulAddress)
                : renderQuickOrderAddress(location as Address)}
              {(isSelected || (!isHaulView && isDefault)) && (
                <img src={Check} alt="Check Icon" className="mt-1" />
              )}
            </CardContent>
            {!isHaulView && hoveredAddressId === addressId && !isDefault && (
              <button
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  deleteAddress.mutate(addressId);
                }}
                disabled={deletingAddressId === addressId}
              >
                {deletingAddressId === addressId ? (
                  <ClipLoader size={20} color="#FF0000" />
                ) : (
                  <img src={Trash} alt="Trash Icon" />
                )}
              </button>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default AddressComponent;
