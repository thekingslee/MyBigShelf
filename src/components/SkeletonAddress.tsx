import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonAddress = () => {
  return (
    <div className="m-0 flex justify-between items-center border border-solid border-custom-black-300 bg-custom-black-100 p-5 rounded-[8px]">
      <div className="flex-grow grid gap-[5.5px] max-w-full">
        <Skeleton circle width={24} height={24} />
        <div className="flex items-center flex-wrap">
          <Skeleton width={100} height={24} />
          <Skeleton width={50} height={16} className="ml-2" />
        </div>
        <Skeleton width="100%" height={20} />
      </div>
      <div className="flex-shrink-0 ml-4">
        <Skeleton circle width={24} height={24} />
      </div>
    </div>
  );
};

export default SkeletonAddress;