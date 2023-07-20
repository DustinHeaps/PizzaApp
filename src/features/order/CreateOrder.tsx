import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/ApiRestaurant";
import Button from "../../components/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store, { useAppDispatch } from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress, getUser } from "../user/userSlice";
import { useState } from "react";
import { CompletedOrderType } from "../../types";

const CreateOrder = () => {
  const [withPriority, setWithPriority] = useState(false);

  const user = useSelector(getUser);
  const isLoadingAddress = user.status === "loading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData() as { phone: string };
  const dispatch = useAppDispatch();

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label id='first-name' className='sm:basis-40'>First Name</label>
          <input
            aria-labelledby='first-name'
            className='input grow'
            type='text'
            name='customer'
            defaultValue={user.username}
            required
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label id='phone' className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input aria-labelledby='phone' className='input w-full' type='tel' name='phone' required />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label id='address' className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              aria-labelledby='address'
              className='input w-full'
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={user.address}
              required
            />
            {user.status === "error" && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {user.error}
              </p>
            )}
          </div>

          {!user.position.latitude && !user.position.longitude && (
            <span className='absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]'>
              <Button
                disabled={isLoadingAddress}
                type='small'
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={String(withPriority)}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              user.position.longitude && user.position.latitude
                ? `${user.position.latitude},${user.position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting
              ? "Placing order...."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order: CompletedOrderType = {
    address: data.address as string,
    cart: JSON.parse(data.cart as string),
    priority: data.priority === "true",
    phone: data.phone as string,
    customer: data.customer as string,
    position: data.position as string,
  };

  const errors: any = {};

  const onChangeValidate = (phoneNumber: string) => {
    if (!phoneNumber.match("[0-9]{10}")) {
      errors.phone =
        "Please give us your correct phone number. We might need it to contact you.";
      return false;
    } else {
      return true;
    }
  };

  onChangeValidate(order.phone);

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect

  const newOrder = await createOrder(order);

  // Do NOT overuse
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
};

export default CreateOrder;
