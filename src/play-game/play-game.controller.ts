import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { PlayGameService } from './play-game.service';
import { CreatePlayGameDto } from './dtos/create-play-game.dto';
import { ReviewPlayGameDto } from './dtos/review-play-game.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { TextractService } from '../shared/services/textract.service';

@Controller('play-game')
export class PlayGameController {
  constructor(
    private readonly playGameService: PlayGameService,
    private readonly textractService: TextractService,
  ) {}

  @Post()
  async create(@Body(ValidationPipe) playGameDto: CreatePlayGameDto) {
    playGameDto.userId = 'b7547601-f46c-4e78-b16b-5a15c9bc4116';
    return this.playGameService.create(playGameDto);
  }

  @Post('review')
  async reviewPlayGame(
    @Body(ValidationPipe) reviewPlayGameDto: ReviewPlayGameDto,
  ) {
    return this.playGameService.reviewPlayGame(reviewPlayGameDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    // return this.textractService.detectDocumentText(file);
  }
}
