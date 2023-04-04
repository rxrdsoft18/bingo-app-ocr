import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PlayGameService } from './play-game.service';
import { CreatePlayGameDto } from './dtos/create-play-game.dto';

@Controller('play-game')
export class PlayGameController {
  constructor(private readonly playGameService: PlayGameService) {}

  @Post()
  async create(@Body(ValidationPipe) playGameDto: CreatePlayGameDto) {
    return this.playGameService.create(playGameDto);
  }
}
