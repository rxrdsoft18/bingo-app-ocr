import { Module } from '@nestjs/common';
import { BingoCardController } from './bingo-card.controller';
import { BingoCardService } from './bingo-card.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BingoCardEntity } from './bingo-card.entity';
import { BingoCardItemEntity } from './bingo-card-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BingoCardEntity, BingoCardItemEntity])],
  controllers: [BingoCardController],
  providers: [BingoCardService],
})
export class BingoCardModule {}
