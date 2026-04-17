import { Product } from "@/services/api/productsApi";

export interface CartItem extends Product {
  quantity: number;
}

export type FavoriteItem = Product;

export interface NavLink {
  path: string;
  name: string;
  icon?: React.ReactNode;
}
