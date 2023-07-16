import { formatCurrency } from "../../utils/helpers";
import { CartItemType } from "../../types";
import { getCurrentQuantityById } from './cartSlice';
import { useSelector } from 'react-redux';
import UpdateItemQuantity from './UpdateItemQuantity';
import DeleteItem from './DeleteItem';

type Props = {
  cartItem: CartItemType;
};

const CartItem = ({ cartItem }: Props) => {
  const { pizzaId, name, quantity, totalPrice } = cartItem;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
<li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;
