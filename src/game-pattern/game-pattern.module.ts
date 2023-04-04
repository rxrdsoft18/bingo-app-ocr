import { Module } from '@nestjs/common';
import { GamePatternController } from './game-pattern.controller';
import { GamePatternService } from './game-pattern.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GamePatternEntity } from './game-pattern.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GamePatternEntity])],
  controllers: [GamePatternController],
  providers: [GamePatternService],
})
export class GamePatternModule {}
