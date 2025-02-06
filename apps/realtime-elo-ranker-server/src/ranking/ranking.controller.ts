import { Controller,NotFoundException, Get, Post, Body, Patch, Param, Delete, Sse } from '@nestjs/common';
import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

@Controller('api/ranking')
export class RankingController {
  private readonly eventEmitter = new EventEmitter();

  constructor(private readonly rankingService: RankingService) {}

  @Post()
  create(@Body() createRankingDto: CreateRankingDto) {
    return this.rankingService.create(createRankingDto);
  }

  @Get()
  getRanking() {
    return new Promise((resolve, reject) => {
      this.rankingService.getRanking((error, ranking) => {
        if (error) {
          return reject(new Error(error));
        }
        if (!ranking || ranking.length === 0) {
          return reject(new NotFoundException({
            code: 404,
            message: "Le classement n'est pas disponible car aucun joueur n'existe.",
          }));
        }
        resolve(ranking);
      });
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rankingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRankingDto: UpdateRankingDto) {
    return this.rankingService.update(+id, updateRankingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rankingService.remove(+id);
  }

  @Sse('events')
  subscribeToRankingUpdates(): Observable<MessageEvent> {
    return this.rankingService.getRankingUpdates();
  }

}
