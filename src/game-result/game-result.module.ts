import { Module } from '@nestjs/common';
import { GameResultService } from './game-result.service';
import { GameResultController } from './game-result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameResultEntity } from './game-result.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameResultEntity])],
  controllers: [GameResultController],
  providers: [GameResultService],
})
export class GameResultModule {}
