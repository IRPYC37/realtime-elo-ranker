import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { PlayerController } from './player.controller';
import { Player } from './entities/player.entity';
import { RankingModule } from 'src/ranking/ranking.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player]),RankingModule,],
  controllers: [PlayerController],
  providers: [PlayerService],
  exports: [TypeOrmModule, PlayerService], // ✅ Ajoute cette ligne pour rendre PlayerRepository accessible
})
export class PlayerModule {}
