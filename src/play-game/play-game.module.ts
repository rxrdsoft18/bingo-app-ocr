import { Module } from '@nestjs/common';
import { PlayGameController } from './play-game.controller';
import { PlayGameService } from './play-game.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayGameEntity } from './play-game.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlayGameEntity])],
  controllers: [PlayGameController],
  providers: [PlayGameService],
})
export class PlayGameModule {}
