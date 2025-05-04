import React from "react";
import { OrderByCustomIdResponse } from "@/hooks/useOrderTracker";
import StatusBadge from "./OrderStatus";
import { capitalizeFirstText, formatDate } from "@/utils";
import { ArrowRight, Check } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface OrderDetailsProps {
  orderData: OrderByCustomIdResponse;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orderData }) => {
  const { order } = orderData;

  if (!order) {
    return null;
  }

  const statuses = [
    "pending confirmation",
    "shipped",
    "out for delivery",
    "delivered",
  ];

  const shouldGreyOut = (status: string) => {
    const greyOutStatuses = ["cancelled", "refunded", "processing refund"];
    return greyOutStatuses.includes(status.toLowerCase());
  };

  const currentStatusIndex = statuses.indexOf(order.status);

  return (
    <div className="lg:w-[900px] mx-auto flex flex-col lg:flex-row gap-[50px] lg:gap-[130px] py-[60px]">
      <section
        className={`flex flex-col px-8 lg:px-0 gap-1 mt-1 ${
          shouldGreyOut(order.status) ? "opacity-0" : ""
        }`}
      >
        {statuses.map((status, index) => (
          <React.Fragment key={status}>
            <div className="flex items-center gap-2">
              <div className="w-4">
                {index === currentStatusIndex ? (
                  order.status === "delivered" ? (
                    <Check className="h-4 w-4 text-[#197B90]" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-[#197B90]" />
                  )
                ) : index < currentStatusIndex ? (
                  <Check className="h-4 w-4 text-[#197B90]" />
                ) : null}
              </div>
              <span
                className={`text-sm font-bodyRegularFont ${
                  index <= currentStatusIndex
                    ? "text-custom-info"
                    : "text-custom-text-primary"
                }`}
              >
                {capitalizeFirstText(status)}
              </span>
            </div>
            {index < statuses.length - 1 && ""}
          </React.Fragment>
        ))}
      </section>
      <section className="flex flex-col px-8 gap-10 flex-grow">
        <div className="grid gap-2">
          <h3 className="text-xl text-custom-text-primary font-bodyBoldFont font-semibold">
            Order Status
          </h3>
          <div className="inline-block">
            <StatusBadge status={order.status} />
          </div>
        </div>
        <div className="grid gap-2">
          <h3 className="text-xl text-custom-text-primary font-bodyBoldFont font-semibold">
            Order Date
          </h3>
          <p className="text-custom-gray-500 font-bodyRegularFont text-base">
            {formatDate(order.createdAt)}
          </p>
        </div>
        <div className="grid gap-2">
          <h3 className="text-xl font-semibold text-custom-text-primary font-bodyBoldFont">
            Shipping Information
          </h3>
          <dl className="grid gap-3">
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px]">
                Name
              </h3>
              <dd className="text-custom-gray-500 text-lg">
                {order.shippingInfo.map((location) => location.name)}
              </dd>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px]">
                Address
              </h3>
              <p className="text-custom-gray-500 text-lg">
                {order.shippingInfo.map((location) => location.address)}
              </p>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px]">
                Tracking Number
              </h3>
              <p className="text-custom-gray-500 text-lg">{order.customId}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px]">
                Current Status
              </h3>
              <p className="text-custom-gray-500 text-lg">
                {capitalizeFirstText(order.status)}
              </p>
            </div>
          </dl>
        </div>
        <div className="grid gap-2">
          <h3 className="text-xl font-semibold text-custom-text-primary font-bodyBoldFont">
            Order Summary
          </h3>
          <Table>
            <TableHeader>
              <TableRow className="font-bodyMediumFont text-sm font-medium text-custom-black-20">
                <TableHead className="sm:table-cell  px-0">ITEMS</TableHead>
                <TableHead className="sm:table-cell ">QUANTITY</TableHead>
                <TableHead className="md:table-cell">PRICE</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((order) => (
                <TableRow
                  key={order.itemId.id}
                  className="font-bodyRegularFont text-base text-custom-text-primary"
                >
                  <TableCell className="sm:table-cell font-medium p-0 h-[60px] text-custom-text-primary">
                    <p className="flex items-center w-full h-full">
                      {order.itemId.title}
                    </p>
                  </TableCell>
                  <TableCell className="sm:table-cell font-medium p-0 h-[60px] text-custom-text-primary">
                    <p className="flex items-center px-4 w-full h-full">
                      {order.quantity}
                    </p>
                  </TableCell>
                  <TableCell className="md:table-cell font-medium p-0 h-[60px] text-custom-text-primary">
                    <p className="flex items-center px-4 w-full h-full">
                      <span>N</span>
                      {order.amount}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}></TableCell>
                <TableCell className="text-custom-text-primary text-base font-bodyBoldFont font-bold">
                  <span>N</span>
                  {order.items.reduce((a, b) => a + b.amount, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="grid gap-2 font-bodyRegularFont">
          <h3 className="text-xl font-semibold text-custom-text-primary">
            Customer Service Contact Information
          </h3>
          <dl className="grid gap-3">
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px] font-medium">
                WhatsApp
              </h3>
              <dd className="text-custom-gray-500 text-lg">
                <a href="tel:+2349134152730">+234 913 415 2730</a>
              </dd>
            </div>
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
              <h3 className="text-custom-text-primary text-lg lg:w-[180px] font-medium">
                Email
              </h3>
              <a
                href="mailto:kingslee@mybigshelf.com"
                className="text-custom-gray-500 text-lg"
              >
                kingslee@mybigshelf.com
              </a>
            </div>
          </dl>
        </div>
      </section>
    </div>
  );
};

export default OrderDetails;
