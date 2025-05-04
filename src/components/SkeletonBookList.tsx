import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const SkeletonBookCard = () => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-col">
        <Skeleton height={128} className="mb-2 rounded-[8px]" />
        <div className="my-2 flex flex-col">
          <Skeleton height={16} />
          <Skeleton height={10} width="40%" />
          <Skeleton height={16} width="20%" />
        </div>
      </div>
      <Skeleton height={35} width="60%" />
    </div>
  );
};

const SkeletonBookList = () => {
  return (
    <div className="space-y-4 pb-20">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8">
        {[...Array(10)].map((_, index) => (
          <SkeletonBookCard key={index} />
        ))}
      </div>
    </div>
  );
};

export default SkeletonBookList;
