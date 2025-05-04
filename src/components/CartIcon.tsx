import { useCartStore } from "@/stores/cartStore";
import { Button } from "./ui/button";

interface Props {
  icon: string;
  onClick?: () => void;
}

const CartIcon = ({ icon, onClick }: Props) => {
  const { getTotalItems } = useCartStore();
  return (
    <Button
      variant="ghost"
      className="p-0 relative hover:bg-transparent"
      onClick={onClick}
    >
      <img className="block" src={icon} alt="Bag Icon" />
      <span className="absolute -top-1 -right-[14px] bg-custom-cart text-custom-text-primary text-xs rounded-full w-6 h-6 flex items-center justify-center">
        {getTotalItems()}
      </span>
    </Button>
  );
};

export default CartIcon;
