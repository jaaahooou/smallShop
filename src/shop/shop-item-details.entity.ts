import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShopItem } from './shop-item.entity';

@Entity()
export class ShopItemDetails extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 15,
  })
  color: string;

  @Column()
  width: number;

  @OneToOne((type) => ShopItem)
  @JoinColumn()
  ShopItem: ShopItem;
}
