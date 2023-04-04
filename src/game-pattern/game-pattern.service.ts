import { Injectable } from '@nestjs/common';
import { CreateGamePatternDto } from './dtos/create-game-pattern.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GamePatternEntity } from './game-pattern.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class GamePatternService {
  constructor(
    @InjectRepository(GamePatternEntity)
    private readonly gamePatternRepository: Repository<GamePatternEntity>,
  ) {}

  async createGamePattern(createGamePatternDto: CreateGamePatternDto) {
    console.log('createGamePattern');
    Object.assign(createGamePatternDto, { id: uuidv4() });
    return this.gamePatternRepository.save(createGamePatternDto);
  }
}
