import { bidType } from './bidsType';
export interface Category {
  _id: string;
  name: string;
}

export interface auth {
  _id: string;
  useName: string;
  email: string;
  role: string;
}

interface Product {
  _id: string;
  title: string;
  desc: string;
  image: string;
  price: number;
  category: Category;
  isShow: boolean;
  bids: bidType[];
  startAt: string;
  endAt: string;
  bidPriceMax: number;
  bidTime: number;
  updatedAt: string;
}

export interface ProductFormData {
  title: string | null | undefined;
  desc: string | null | undefined;
  image: string | null | undefined;
  price: number | null | undefined;
  category: Category | undefined;
  isShow: boolean | null | undefined;
  startAt: string | null | undefined;
  bidTime: number | null | undefined;
}
export default Product;
