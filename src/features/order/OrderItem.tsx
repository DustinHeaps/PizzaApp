import { OrderItemType } from "../../types";
import { formatCurrency } from "../../utils/helpers";

type Props = {
  orderItem: OrderItemType;
  ingredients: any;
  isLoadingIngredients: boolean;
};

const OrderItem = ({ orderItem, ingredients, isLoadingIngredients }: Props) => {


  const { quantity, name, totalPrice } = orderItem;

  return (
    <li className='py-3'>
      <div className='flex items-center justify-between gap-4 text-sm'>
        <p>
          <span className='font-bold'>{quantity}&times;</span> {name}
        </p>
        <p className='font-bold'>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize italic text-stone-500'>
        {isLoadingIngredients ? "Loading..." : ingredients.join(", ")}
      </p>
    </li>
  );
};

export default OrderItem;
