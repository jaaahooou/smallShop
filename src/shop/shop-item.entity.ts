import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItemDetails } from './shop-item-details.entity';

@Entity()
export class ShopItem extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 30,
  })
  name: string;
  @Column({
    type: 'text',
    default: '',
  })
  description: string;
  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({ default: 0 })
  boughtCounter: number;

  @Column({
    default: false,
  })
  wasEverBought: boolean;

  @OneToOne((type) => ShopItemDetails)
  @JoinColumn()
  details: ShopItemDetails;

  //Subprodukt
  @ManyToOne((type) => ShopItem, (entity) => entity.subShopItems)
  mainShopItem: ShopItem;

  // Produkt główny
  @OneToMany((type) => ShopItem, (entity) => entity.mainShopItem)
  subShopItems: ShopItem[];
}
