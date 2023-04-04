import { Column, CreateDateColumn, Entity } from 'typeorm';

@Entity('game_results')
export class GameResultEntity {
  @Column()
  playGameId: string;

  @Column()
  value: number;

  @Column()
  position: string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;
}
