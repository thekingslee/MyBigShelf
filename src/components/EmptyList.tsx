import React from 'react';
import Empty from "@/assets/Empty.png";
import RequestBookDrawer from "./RequestBookDrawer";

interface Notification {
  header: string;
  reason: string;
}

interface Props {
  notification: Notification;
  showRequestButton?: boolean;
}

const EmptyList: React.FC<Props> = ({ notification, showRequestButton = true }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full pb-[100px] bg-custom-black-100">
      <img className="w-[233.34px]" src={Empty} alt="Empty Icon" />
      <h2 className="text-3xl font-bold text-center font-bodyBoldFont text-custom-text-primary">
        {notification.header}
      </h2>
      <p className="max-w-sm text-base text-center font-bodyRegularFont text-custom-text-body">
        {notification.reason}
      </p>
      {showRequestButton && <RequestBookDrawer />}
    </div>
  );
};

export default EmptyList;