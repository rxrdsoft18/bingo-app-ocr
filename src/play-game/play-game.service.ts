import { Injectable } from '@nestjs/common';
import { CreatePlayGameDto } from './dtos/create-play-game.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayGameEntity } from './play-game.entity';
import { Repository } from 'typeorm';
import { ReviewPlayGameDto } from './dtos/review-play-game.dto';
import { BingoCardEntity } from '../bingo-card/bingo-card.entity';
import { BingoCardItemEntity } from '../bingo-card/bingo-card-item.entity';
import { BingoRange } from '../shared/constants/bingo-range.';
@Injectable()
export class PlayGameService {
  constructor(
    @InjectRepository(PlayGameEntity)
    private readonly playGameRepository: Repository<PlayGameEntity>,
    @InjectRepository(BingoCardEntity)
    private readonly bingoCardRepository: Repository<BingoCardEntity>,
    @InjectRepository(BingoCardItemEntity)
    private readonly bingoCardItemRepository: Repository<BingoCardItemEntity>,
  ) {}

  async create(playGameDto: CreatePlayGameDto) {
    Object.assign(playGameDto, { id: uuidv4() });
    return this.playGameRepository.save(playGameDto);
  }

  async reviewPlayGame(reviewPlayGameDto: ReviewPlayGameDto) {
    const { playGameId, value } = reviewPlayGameDto;

    const playGame = await this.playGameRepository.findOne({
      where: { id: playGameId },
    });

    if (playGame) {
      console.log(playGame, 'playGame');
      const { pattern, userId } = playGame;
      const columnInSearch = BingoRange(value);
      console.log(columnInSearch, 'columnInSearch');
      const bingoCards = await this.bingoCardRepository.find({
        where: { userId },
      });

      for (const bingoCard of bingoCards) {
        const bingoCardItems = await this.bingoCardItemRepository.find({
          where: { bingoCardId: bingoCard.id, tag: columnInSearch },
        });

        const containsValueInColumn = bingoCardItems.find(
          (item) => item.value == value,
        );

        console.log(containsValueInColumn, 'containsValueInColumn');

        if (containsValueInColumn) {
          const containsValueInPattern = pattern.find(
            (item) => item === containsValueInColumn.position,
          );

          if (containsValueInPattern) {
            await this.bingoCardItemRepository.update(
              {
                id: containsValueInColumn.id,
              },
              {
                isSelect: true,
              },
            );
          }
          console.log(containsValueInPattern, 'containsValueInPattern');
        }

        console.log(bingoCardItems, 'bingoCardItems');
      }
    }

    console.log(playGame);
  }
}
