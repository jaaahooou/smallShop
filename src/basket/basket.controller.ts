import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { AddProductDto } from './dto/addproduct.dto';
import { BasketService } from './basket.service';
import {
  AddProductToBasketResponse,
  GetTotalPriceResponse,
  ListProductInBasketResponse,
  RemoveProductFromBasketResponse,
} from './../interfaces/baskte';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addProductToBasket(@Body() item: AddProductDto): AddProductToBasketResponse {
    return this.basketService.add(item);
  }

  @Delete('/:index')
  removePRoductFromBAsket(
    @Param('index') index: string,
  ): RemoveProductFromBasketResponse {
    return this.basketService.remove(Number(index));
  }

  @Get('/')
  listProductsInBasket(): ListProductInBasketResponse {
    return this.basketService.list();
  }

  @Get('/total-price')
  getTotalPrice(): Promise<GetTotalPriceResponse> {
    console.log(this.basketService.getTotalPrice());
    return this.basketService.getTotalPrice();
  }
}
