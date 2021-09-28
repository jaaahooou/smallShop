import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Redirect,
} from '@nestjs/common';

import {
  CreateProductResponse,
  GetListOfProductsRespone,
  GetOneProductResponse,
} from 'src/interfaces/shop';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {
  onApplicationBootstrap() {
    console.log('załadowane ');
  }

  constructor(@Inject(ShopService) private shopService: ShopService) {}

  @Get('/')
  getListOfProducts(): Promise<GetListOfProductsRespone> {
    return this.shopService.getProducts();
  }

  @Get('/:id')
  getOneProduct(@Param('id') id: string): Promise<GetOneProductResponse> {
    return this.shopService.getOneProduct(id);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    return this.shopService.removeProduct(id);
  }

  @Post('/')
  createNewProduct(): Promise<CreateProductResponse> {
    return this.shopService.createDummyProduct();
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
