import { AddProductDto } from './../basket/dto/addproduct.dto';

export type AddProductToBasketResponse =
  | {
      isSuccess: true;
      index?: number;
    }
  | {
      isSuccess: false;
    };

export interface RemoveProductFromBasketResponse {
  isSuccess: boolean;
}

export type ListProductInBasketResponse = AddProductDto[];
export type GetTotalPriceResponse =
  | number
  | {
      isSuccess: false;
      alternativeBasket: AddProductDto[];
    };
