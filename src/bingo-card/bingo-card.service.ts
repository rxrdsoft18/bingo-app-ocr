import { Injectable } from '@nestjs/common';
import { CreateBingoCardDto } from './dtos/create-bingo-card.dto';
import { BingoCardEntity } from './bingo-card.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BingoCardItemEntity } from './bingo-card-item.entity';

@Injectable()
export class BingoCardService {
  constructor(
    @InjectRepository(BingoCardEntity)
    private readonly bingoCardRepository: Repository<BingoCardEntity>,

    @InjectRepository(BingoCardItemEntity)
    private readonly bingoCardItemRepository: Repository<BingoCardItemEntity>,
  ) {}

  async getBingoCardsByUserId(userId: string) {
    const bingoCard = await this.bingoCardRepository.findOne({
      where: { userId },
    });

    // bingoCard.items = await this.bingoCardItemRepository.find({
    //   where: { bingoCardId: bingoCard.id },
    // });

    return bingoCard;
  }

  async createBingoCard(bingoCard: CreateBingoCardDto) {
    const bingoCardEntity = new BingoCardEntity();
    bingoCardEntity.id = uuidv4();
    bingoCardEntity.name = bingoCard.name;
    bingoCardEntity.userId = bingoCard.userId;

    await this.bingoCardRepository.save(bingoCardEntity);

    for (let i = 0; i < bingoCard.items.length; i++) {
      const item = bingoCard.items[i];
      const bingoCardItemEntity = new BingoCardItemEntity();
      bingoCardItemEntity.id = uuidv4();
      bingoCardItemEntity.bingoCardId = bingoCardEntity.id;
      bingoCardItemEntity.value = item.value;
      bingoCardItemEntity.position = item.position;
      bingoCardItemEntity.tag = item.tag;
      await this.bingoCardItemRepository.save(bingoCardItemEntity);
    }

    return bingoCardEntity;
  }
}
