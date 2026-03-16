import { Products } from "./product.interface";

export interface CartItem {
  product: Products;
  quantity: number;
}