import { Injectable } from '@nestjs/common';

interface RankingUpdateEvent {
  player: Player;
}
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Player } from 'src/player/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class RankingService {
  private readonly rankingEmitter = new EventEmitter2();
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly eventEmitter: EventEmitter2, // Injection de l'EventEmitter
  ) {}

  create(createRankingDto: CreateRankingDto) {
    return 'This action adds a new ranking';
  }

  findAll() {
    return this.playerRepository.find({ order: { rank: 'DESC' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} ranking`;
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
    return `This action updates a #${id} ranking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }

  getRanking(callback: (error: any, ranking?: Player[]) => void): void {
    this.playerRepository.find()
      .then(players => {
        callback(null, players);
      })
      .catch(error => {
        callback(error);
      });
  }

  getRankingUpdates(): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'rankingUpdate').pipe(
      map(player => {
        const messageData = {
          type: 'RankingUpdate',
          player
        };
        return new MessageEvent('message', {
          data: messageData,
          lastEventId: '',
          origin: '',
        });
      })
    );
  }

  emitRankingUpdate(player: { id: string; rank: number }): void {
    this.rankingEmitter.emit('rankingUpdate', player);
  }
}
