import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { CartDetails } from '@/hooks/useCartDetails';
import { ChevronDown } from 'lucide-react';

const OrderSummaryList = ({
  cartDetails,
}: {
  cartDetails: { data: CartDetails };
}) => {
  return (
    <Collapsible className="w-full" defaultOpen={true}>
      <CollapsibleTrigger className="flex items-center justify-between w-full bg-custom-black-100 rounded-none px-0 pb-2 my-6 border-b border-solid border-black">
        <div className="flex items-center space-x-2">
          <span className="font-bodyBoldFont font-bold text-custom-text-primary text-base sm:text-lg">
            Items in order ({cartDetails?.data.order.itemsNumber})
          </span>
        </div>
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="bg-custom-black-100 rounded-none shadow-none">
        <div className="max-h-[390px] overflow-y-auto pr-2 custom-scrollbar">
          {cartDetails?.data?.order?.items?.map((item) => (
            <div
              key={item.itemId}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_10%_20%] gap-2 sm:gap-4 justify-between items-center py-4 border-b border-solid border-custom-black-300"
            >
              <div className="flex items-center space-x-2 sm:space-x-4 col-span-2 sm:col-span-1">
                <img
                  src={item.bookCover}
                  alt={item.bookTitle}
                  className="max-w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] object-cover rounded-[8px]"
                />
                <div>
                  <p className="font-medium text-sm sm:text-base">
                    {item.bookTitle}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {item.author}
                  </p>
                </div>
              </div>
              <p className="text-right sm:text-center text-sm sm:text-base">
                <span className="text-sm font-normal font-bodyRegularFont md:hidden">
                  x
                </span>
                {item.quantity}
              </p>
              <p className="font-semibold text-right text-sm sm:text-base">
                <span className="font-sans">₦</span>
                {item.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OrderSummaryList;
