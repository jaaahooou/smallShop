import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { max, throwIfEmpty } from 'rxjs';
import {
  CreateProductResponse,
  GetListOfProductsRespone,
  GetPaginatedListOfPRoductsResponse,
} from 'src/interfaces/shop';
import { Like, Repository } from 'typeorm';
import { BasketService } from './../basket/basket.service';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService, // @InjectRepository(ShopItem) // private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(
    currentPage: number = 1,
  ): Promise<GetPaginatedListOfPRoductsResponse> {
    const maxPerPage = 3;

    const [items, count] = await ShopItem.findAndCount({
      skip: maxPerPage * (currentPage - 1),
      take: maxPerPage,
    });

    const pagesCount = Math.ceil(count / maxPerPage);
    console.log({ count, pagesCount });

    return {
      items,
      pagesCount,
    };
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).items.some((item) => item.name === name);
  }

  async getPriceOfPRoduct(name: string): Promise<number> {
    return (await this.getProducts()).items.find((item) => item.name === name)
      .price;
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

  async findProducts(searchTerm: string): Promise<GetListOfProductsRespone> {
    return await ShopItem.find({
      where: [{ description: Like(`%${searchTerm}%`) }],
    });
  }
}
