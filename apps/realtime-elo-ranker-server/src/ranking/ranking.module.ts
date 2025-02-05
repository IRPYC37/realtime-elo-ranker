import { Module } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { RankingController } from './ranking.controller';

import { PlayerModule } from '../player/player.module';

@Module({
  imports: [PlayerModule],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
