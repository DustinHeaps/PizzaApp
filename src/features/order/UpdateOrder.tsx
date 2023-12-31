import { ActionFunctionArgs, useFetcher } from "react-router-dom";
import Button from "../../components/Button";
import { updateOrder } from "../../services/ApiRestaurant";

const UpdateOrder = () => {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;



export  const action = async({ params }: ActionFunctionArgs) => {
  const data = { priority: true };
  await updateOrder(params.orderId as string, data);
  return null;
}
