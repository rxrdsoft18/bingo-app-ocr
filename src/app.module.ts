import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongodbModule } from './shared/modules/mongodb.module';
import { ConfigModule } from '@nestjs/config';
import { BingoCardModule } from './bingo-card/bingo-card.module';
import { PlayGameModule } from './play-game/play-game.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongodbModule,
    BingoCardModule,
    PlayGameModule,
  ],
  providers: [AppService],
})
export class AppModule {}
