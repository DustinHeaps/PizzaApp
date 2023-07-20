export type MenuItemType = {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: string[];
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

type Item = {
  name: string;
  quantity: number;
  totalPrice: number;
};

export type CartItem = {
  pizzaId: number;
  unitPrice: number;
} & Item;


export type OrderType = {
  id: number;
  status: string;
  priority: boolean;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartItem[];
  customer: string;
  phone: string;
  address: string;
  position: string;
};


export type CompletedOrderType = {
  address: string;
  cart: CartItemType[];
  customer: string;
  phone: string;
  position: string;
  priority: boolean;
};

export type GeoPosition = {
  latitude: number | undefined;
  longitude: number | undefined;
};


export type UserType = {
  username: string;
  status: string;
  position: GeoPosition
  address: string;
  error: string;
};
