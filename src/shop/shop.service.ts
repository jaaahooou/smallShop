import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throwIfEmpty } from 'rxjs';
import {
  CreateProductResponse,
  GetListOfProductsRespone,
} from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { BasketService } from './../basket/basket.service';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) // @InjectRepository(ShopItem)
  // private shopItemRepository: Repository<ShopItem>,
  {}

  async getProducts(): Promise<GetListOfProductsRespone> {
    return await ShopItem.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfPRoduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
  }

  async getOneProduct(id: string): Promise<ShopItem> {
    return await ShopItem.findOneOrFail(id);
  }

  async removeProduct(id: string) {
    await ShopItem.delete(id);
  }

  async createDummyProduct(): Promise<ShopItem> {
    const newItem = new ShopItem();
    newItem.price = 10;
    newItem.name = 'kwiatki';
    newItem.description = 'pachną bardzo ładnie';
    await newItem.save();

    return newItem;
  }

  async addBoughtCounter(id: string) {
    await ShopItem.update(id, {
      wasEverBought: true,
    });
    const item = await ShopItem.findOneOrFail(id);

    item.boughtCounter++;
    await item.save();
  }
}

// [
//   { name: 'Golonka', description: ' Tłusta i smaczna', price: 3 },
//   {
//     name: 'Golonka2',
//     description: ' Tłusta i pyszna',
//     price: 4 - this.basketService.countPromo(),
//   },
//   {
//     name: 'Golonka3',
//     description: ' Tłusta i zdrowa',
//     price: 5 - this.basketService.countPromo(),
//   },
// ];
