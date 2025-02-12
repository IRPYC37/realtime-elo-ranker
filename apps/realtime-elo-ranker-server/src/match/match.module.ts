import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { Match } from './entities/match.entity';
import { Player } from 'src/player/entities/player.entity';
import { PlayerModule } from 'src/player/player.module';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match, Player]), // ✅ Ajoute Player ici
    PlayerModule, // ✅ Importe PlayerModule pour accéder à PlayerRepository
    RankingModule, // ✅ Importe RankingService pour accéder à la méthode emitRankingUpdate
  ],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
