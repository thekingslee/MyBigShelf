import { AddressResponse } from "@/hooks/useAddress";
import Skeleton from "react-loading-skeleton";
import React from "react";

interface ShippingInformationProps {
  address: AddressResponse | undefined;
  addressLoading: boolean;
}

const ShippingInformation: React.FC<ShippingInformationProps> = ({
  address,
  addressLoading,
}) => {
  const defaultAddress = address?.data.address.find(
    (location) => location.default
  );

  return (
    <div className="grid gap-2">
      <h3 className="text-2xl font-semibold text-custom-text-primary font-interFont">
        Shipping Information
      </h3>
      <dl className="grid gap-3">
        <div className="grid grid-cols-[150px_1fr] items-center">
          <dt className="text-custom-text-primary text-lg">Name</dt>
          <dd className="text-custom-gray_500 text-lg">
            {addressLoading ? (
              <Skeleton className="h-[20px] w-[100px]" />
            ) : (
              `${defaultAddress?.name}` || "N/A"
            )}
          </dd>
        </div>
        <div className="grid grid-cols-[150px_1fr] items-center">
          <dt className="text-custom-text-primary text-lg">
            Address
          </dt>
          <dd className="text-custom-gray_500 text-lg text-left text-balance">
            {addressLoading ? (
              <Skeleton className="h-[20px] w-[100px]" />
            ) : (
              defaultAddress?.address || "N/A"
            )}
          </dd>
        </div>
        <div className="grid grid-cols-[150px_1fr]">
          <dt className="text-custom-text-primary text-lg">
            Phone number
          </dt>
          <dd className="text-custom-gray_500 text-lg text-left">
            {addressLoading ? (
              <Skeleton className="h-[20px] w-[100px]" />
            ) : (
              defaultAddress?.phoneNo || "N/A"
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default ShippingInformation;
