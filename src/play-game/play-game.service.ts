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

  async findById(id: string) {
    return this.playGameRepository.findOne({ where: { id } });
  }

  async getBingoCardItemsByColumn(bingoCardId: string, column: string) {
    return this.bingoCardItemRepository.find({
      where: { bingoCardId, tag: column },
    });
  }

  containsValueInColumn(
    value: number,
    items: BingoCardItemEntity[],
  ): BingoCardItemEntity {
    return items.find((item) => item.value == value);
  }

  containsValueInPattern(
    value: BingoCardItemEntity,
    pattern: string[],
  ): string {
    return pattern.find((item) => item == value.position);
  }

  validateValue(
    value: number,
    items: BingoCardItemEntity[],
    pattern: string[],
  ): boolean {
    let resultGameSuccess = false;
    const valueInColumn = this.containsValueInColumn(value, items);

    if (valueInColumn) {
      const valueInPattern = this.containsValueInPattern(
        valueInColumn,
        pattern,
      );
      resultGameSuccess = !!valueInPattern;
    }
    return resultGameSuccess;
  }

  async selectColumn(positionId: string) {
    await this.bingoCardItemRepository.update(
      {
        id: positionId,
      },
      {
        isSelect: true,
      },
    );
  }

  async getBingoCardsByUserId(userId: string) {
    return this.bingoCardRepository.find({ where: { userId } });
  }

  async reviewPlayGame(reviewPlayGameDto: ReviewPlayGameDto) {
    const { playGameId, value } = reviewPlayGameDto;

    const playGame = await this.findById(playGameId);

    if (playGame) {
      const { pattern, userId } = playGame;
      const columnInSearch = BingoRange(value);
      const bingoCards = await this.getBingoCardsByUserId(userId);

      for (const bingoCard of bingoCards) {
        const bingoCardItems = await this.getBingoCardItemsByColumn(
          bingoCard.id,
          columnInSearch,
        );

        const valueInColumn = this.containsValueInColumn(value, bingoCardItems);

        const resultGameSuccess = this.validateValue(
          value,
          bingoCardItems,
          pattern,
        );

        if (resultGameSuccess) {
          await this.selectColumn(valueInColumn.id);
        }
      }
    }
  }
}
