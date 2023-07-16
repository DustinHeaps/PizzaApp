import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { deleteItem } from "./cartSlice";

type Props = { pizzaId: number };

const DeleteItem = ({ pizzaId }: Props) => {
  const dispatch = useDispatch();

  return (
    <Button type='small' onClick={() => dispatch(deleteItem({ pizzaId }))}>
      Delete
    </Button>
  );
};

export default DeleteItem;
