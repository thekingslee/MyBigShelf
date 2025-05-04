import { Card, CardContent } from "./ui/card";
import Check from "@/assets/Check.svg";

interface Props {
  price: number;
}

const CreditCard = ({price}: Props) => {
  return (
    <div
      className={`absolute`}
    >
      <Card className="w-[260px] rounded-[7.08px]">
        <CardContent className="p-0 py-[11.5px] px-[14.2px] flex gap-2">
          <img src={Check} alt="Check Logo" />
          <div>
            <h3 className="text-custom-credit-green">N{price} Credited</h3>
            <p className="text-custom-text-body font-bodyRegularFont text-xs">
              Your account has been credited with earnings from our affiliate
              program.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreditCard;
