export type MenuItemType = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: any;
  soldOut: boolean;
  imageUrl: string;
};

export type CartItemType = {
  pizzaId: number;
  name: string;
  quantity: number;
  totalPrice: number;
  unitPrice: number;
};

export type CartType = {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export type OrderItemType = {
  quantity: number;
  name: string;
  totalPrice: number;
  pizzaId: number;
};

export type OrderType = {
  id: number;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: any;
};

export type CompletedOrderType = {
  address: string;
  cart: CartItemType[];
  customer: string;
  phone: string;
  position: string;
  priority: boolean;
};

export type UserType = {
  username: string;
  status: string;
  position: {
    latitude: string;
    longitude: string;
  };
  address: string;
  error: string;
};
