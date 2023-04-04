import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BingoCardItemEntity } from './bingo-card-item.entity';

@Entity('bingo_cards')
export class BingoCardEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @OneToMany(() => BingoCardItemEntity, (item) => item.bingoCardId)
  items: BingoCardItemEntity[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
