import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { GetListOfProductsRespone } from 'src/interfaces/shop';
import { BasketService } from './../basket/basket.service';

@Injectable()
export class ShopService {
  constructor(
    @Inject(forwardRef(() => BasketService))
    private basketService: BasketService,
  ) {}

  getProducts(): GetListOfProductsRespone {
    return [
      { name: 'Golonka', description: ' Tłusta i smaczna', price: 3 },
      {
        name: 'Golonka2',
        description: ' Tłusta i pyszna',
        price: 4 - this.basketService.countPromo(),
      },
      {
        name: 'Golonka3',
        description: ' Tłusta i zdrowa',
        price: 5 - this.basketService.countPromo(),
      },
    ];
  }

  hasProduct(name: string): boolean {
    return this.getProducts().some((item) => item.name === name);
  }

  getPriceOfPRoduct(name: string): number {
    console.log(this.getProducts().find((item) => item.name === name).price);
    return this.getProducts().find((item) => item.name === name).price;
  }
}
