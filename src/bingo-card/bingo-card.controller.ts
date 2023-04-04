import { Body, Controller, Get, Param, Post, ValidationPipe } from "@nestjs/common";
import { BingoCardService } from './bingo-card.service';
import { CreateBingoCardDto } from './dtos/create-bingo-card.dto';

@Controller('bingo-card')
export class BingoCardController {
  constructor(private readonly bingoCardService: BingoCardService) {}

  @Get(':userId')
  async getBingoCardsByUserId(@Param('userId') userId: string) {
    console.log('getBingoCardByUserId', userId);
    return this.bingoCardService.getBingoCardsByUserId(userId);
  }

  @Post()
  createBingoCard(@Body(ValidationPipe) bingoCard: CreateBingoCardDto) {
    console.log('createBingoCard', bingoCard);
    return this.bingoCardService.createBingoCard(bingoCard);
  }
}
