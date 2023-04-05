import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BingoCardEntity } from '../../bingo-card/bingo-card.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BingoCardItemEntity } from '../../bingo-card/bingo-card-item.entity';
import { PlayGameEntity } from '../../play-game/play-game.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const MONGO_USER = configService.get('MONGODB_USERNAME');
        const MONGO_PASS = configService.get('MONGODB_PASSWORD');
        const MONGO_HOST = configService.get('MONGODB_HOST');
        const MONGO_PORT = configService.get('MONGODB_PORT');
        const MONGO_DB = configService.get('MONGODB_DATABASE');

        console.log(
          'MONGO_URI',
          `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
        );
        return {
          type: 'mongodb',
          url: `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`,
          entities: [
            BingoCardEntity,
            BingoCardItemEntity,
            PlayGameEntity,
          ],
          synchronize: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
})
export class MongodbModule {}
