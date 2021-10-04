import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
