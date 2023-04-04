import { Injectable } from '@nestjs/common';
import { GameResultEntity } from './game-result.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGameResultDto } from './dtos/create-game-result.dto';

@Injectable()
export class GameResultService {
  constructor(
    @InjectRepository(GameResultEntity)
    private readonly gameResultRepository: Repository<GameResultEntity>,
  ) {}

  async create(gameResult: CreateGameResultDto) {
    return this.gameResultRepository.save(gameResult);
  }
}
