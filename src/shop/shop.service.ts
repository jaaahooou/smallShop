import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GetListOfProductsRespone } from 'src/interfaces/shop';
import { Repository } from 'typeorm';
import { BasketService } from './../basket/basket.service';
import { ShopItem } from './shop-item.entity';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,

    @InjectRepository(ShopItem)
    private shopItemRepository: Repository<ShopItem>,
  ) {}

  async getProducts(): Promise<GetListOfProductsRespone> {
    return await this.shopItemRepository.find();
  }

  async hasProduct(name: string): Promise<boolean> {
    return (await this.getProducts()).some((item) => item.name === name);
  }

  async getPriceOfPRoduct(name: string): Promise<number> {
    return (await this.getProducts()).find((item) => item.name === name).price;
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
