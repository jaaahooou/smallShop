import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShopItem {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 60,
  })
  name: string;
  @Column({
    type: 'text',
    default: 'brak',
  })
  description: string;
  @Column({
    type: 'float',
    precision: 6,
    scale: 2,
  })
  price: number;
}
