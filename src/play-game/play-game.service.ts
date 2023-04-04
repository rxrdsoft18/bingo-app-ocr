import { Injectable } from '@nestjs/common';
import { CreatePlayGameDto } from './dtos/create-play-game.dto';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { PlayGameEntity } from './play-game.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PlayGameService {
  constructor(
    @InjectRepository(PlayGameEntity)
    private readonly playGameRepository: Repository<PlayGameEntity>,
  ) {}

  async create(playGameDto: CreatePlayGameDto) {
    Object.assign(playGameDto, { id: uuidv4() });
    return this.playGameRepository.save(playGameDto);
  }
}
