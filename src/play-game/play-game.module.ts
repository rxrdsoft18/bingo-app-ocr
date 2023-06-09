import { Module } from '@nestjs/common';
import { PlayGameController } from './play-game.controller';
import { PlayGameService } from './play-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayGameEntity } from './play-game.entity';
import { BingoCardEntity } from '../bingo-card/bingo-card.entity';
import { BingoCardItemEntity } from '../bingo-card/bingo-card-item.entity';
import { TextractService } from '../shared/services/textract.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlayGameEntity,
      BingoCardEntity,
      BingoCardItemEntity,
    ]),
  ],
  controllers: [PlayGameController],
  providers: [PlayGameService, TextractService],
})
export class PlayGameModule {}
