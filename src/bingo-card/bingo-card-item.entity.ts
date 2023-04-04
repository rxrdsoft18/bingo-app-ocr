import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BingoCardEntity } from './bingo-card.entity';

@Entity('bingo_card_items')
export class BingoCardItemEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  value: number;

  @Column()
  position: string;

  @ManyToOne(() => BingoCardEntity, (bingoCard) => bingoCard.items)
  bingoCardId: string;

  @Column()
  tag: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
