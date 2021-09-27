import { Controller, Get, Inject, Param, Redirect } from '@nestjs/common';

import { GetListOfProductsRespone } from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller({
  path: '/',
  host: 'zzz.lvh.me',
})
export class ShopController {
  onApplicationBootstrap() {
    console.log('załadowane ');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): GetListOfProductsRespone {
    return this.shopService.getProducts();
  }

  @Get('/test/:age')
  @Redirect()
  testRedirect(@Param('age') age: string) {
    const url = Number(age) >= 18 ? '/age18' : '/under18';
    return {
      url,
    };
  }
}
