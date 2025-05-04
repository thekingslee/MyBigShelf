import { capitalizeFirstText } from "@/utils";

interface StatusBadgeProps {
  status?: string | undefined;
}

type StatusClassesType = Record<string, string>;

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusClasses: StatusClassesType = {
    "pending confirmation":
      "bg-custom-black_200 text-custom-gray-500 border-custom-gray-500",
    shipped: "bg-custom-info-100 text-custom-info border-custom-info",
    "out for delivery":
      "bg-custom-card-hover text-custom-secondary border-custom-secondary",
    delivered:
      "bg-custom-green-100 text-custom-badge-text border-custom-badge-text",
    "processing refund":
      "bg-custom-warning-100 text-custom-warning border-custom-warning",
    refunded: "bg-custom-green-200 text-custom-green-300 border-custom-green-300",
    cancelled: "bg-red-300 text-red-500 border-red-500",
  };

  const classes = status
    ? statusClasses[status] || "bg-gray-300 text-gray-800 border-gray-400"
    : "";

  return status ? (
    <span
      className={`h-[35px] font-bodyRegularFont text-[16.396px] border border-solid inline-flex items-center px-[12.3px] py-[4.1px] rounded-[24.6px] ${classes}`}
    >
      {capitalizeFirstText(status)}
    </span>
  ) : null;
};

export default StatusBadge;
