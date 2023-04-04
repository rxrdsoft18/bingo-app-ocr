import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { GamePatternService } from './game-pattern.service';
import { CreateGamePatternDto } from './dtos/create-game-pattern.dto';

@Controller('game-pattern')
export class GamePatternController {
  constructor(private readonly gamePatternService: GamePatternService) {}

  @Post()
  async createGamePattern(
    @Body(ValidationPipe) createGamePatternDto: CreateGamePatternDto,
  ) {
    console.log('createGamePattern', createGamePatternDto);
    return this.gamePatternService.createGamePattern(createGamePatternDto);
  }
}
