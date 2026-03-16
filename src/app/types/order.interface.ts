export interface Order {
  id: number;
  userId: number;
  status: string;
  totalAmount: number;
  createdAt: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  product: {
    name: string;
    imageUrl: string;
  };
}