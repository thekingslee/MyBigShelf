import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: ReactNode;
  children: ReactNode;
}

const NewOrderDetailCard = ({ title, children }: Props) => {
  return (
    <Card className="bg-white grid gap-4 border border-solid border-custom-black_200 shadow-none rounded-[8px] font-bodyMediumFont">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex items-center justify-between text-2xl font-bodyBoldFont font-bold text-custom-text-primary">
          {title}
        </CardTitle>
        <p className="text-base font-bodyRegularFont text-custom-gray-500 mb-4">
          Enjoy free delivery when you join our haul at checkout.
        </p>
      </CardHeader>
      <CardContent
        className={`items-start grid gap-6 px-4 text-sm font-bodyRegularFont text-custom-gray_500`}
      >
        {children}
      </CardContent>
    </Card>
  );
};

export default NewOrderDetailCard;
