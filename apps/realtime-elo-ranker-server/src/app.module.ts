import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Importation de TypeOrmModule
import { AppController } from './app.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { MatchModule } from './match/match.module';
import { Player } from './player/entities/player.entity'; // Assure-toi que ton entité Player est importée
import { Match } from './match/entities/match.entity';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite', // Remplace par le type de ta base de données (MySQL, SQLite, etc.)
      database: 'bd.sqlite3', // Le nom de ta base de données
      entities: [Player,Match], // Liste des entités utilisées par TypeORM
      synchronize: true, // À utiliser en développement, attention en production !
    }),
    EventEmitterModule.forRoot(),
    PlayerModule, // Assure-toi que PlayerModule est bien importé
    MatchModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
