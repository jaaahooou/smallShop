import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AddProductDto } from './dto/addproduct.dto';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductInBasketResponse,
  RemoveProductFromBasketResponse,
} from './../interfaces/baskte';

import { ShopService } from './../shop/shop.service';
import { ShopModule } from './../shop/shop.module';

@Injectable()
export class BasketService {
  private items: AddProductDto[] = [];

  constructor(
    @Inject(forwardRef(() => ShopService)) private ShopService: ShopService,
  ) {}

  add(item: AddProductDto): AddProductToBasketResponse {
    const { name, count, id } = item;
    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !this.ShopService.hasProduct(name)
    ) {
      return {
        isSuccess: false,
      };
    }

    this.items.push(item);

    this.ShopService.addBoughtCounter(id);

    return {
      isSuccess: true,
      index: this.items.length - 1,
    };
  }

  remove(index: number): RemoveProductFromBasketResponse {
    const { items } = this;
    if (index < 0 || index >= items.length) {
      return { isSuccess: false };
    }

    items.splice(index, 1);

    return {
      isSuccess: true,
    };
  }

  list(): ListProductInBasketResponse {
    return this.items;
  }

  async getTotalPrice(): Promise<GetTotalPriceResponse> {
    if (!this.items.every((item) => this.ShopService.hasProduct(item.name))) {
      const alternativeBasket = this.items.filter((item) =>
        this.ShopService.hasProduct(item.name),
      );

      return {
        isSuccess: false,
        alternativeBasket,
      };
    }

    return (
      await Promise.all(
        this.items.map(
          async (item) =>
            (await this.ShopService.getPriceOfPRoduct(item.name)) *
            item.count *
            1,
          23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  async countPromo(): Promise<number> {
    return (await this.getTotalPrice()) > 10 ? 1 : 0;
  }
}
