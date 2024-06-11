import { auth } from './productType';
export interface bidForm {
  productId: string | undefined;
  bids: string[] | null | undefined;
  userId: string;
  price: number | null | undefined;
  bidPriceMax: number | null | undefined;
}

export interface bidType {
  _id: string;
  productId: string;
  bids: string[];
  userId: userId;
  price: number;
  isWinBid: boolean;
  createdAt: string;
}

export interface bidsDetail {
  createdAt: string;
  isWinBid: boolean;
  price: number;
  productId: string;
  userId: auth;
  updatedAt: string;
}

export interface userId {
  _id: string;
  useName: string;
  email: string;
}
