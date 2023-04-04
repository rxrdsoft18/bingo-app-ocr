import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('game_patterns')
export class GamePatternEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  pattern: [];


  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
