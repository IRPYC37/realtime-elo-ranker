import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Player } from 'src/player/entities/player.entity';
import { Repository } from 'typeorm';
import { EventEmitter2 } from 'eventemitter2';
import { Observable } from 'rxjs';
export declare class RankingService {
    private readonly playerRepository;
    private readonly eventEmitter;
    private readonly rankingEmitter;
    private readonly logger;
    constructor(playerRepository: Repository<Player>, eventEmitter: EventEmitter2);
    create(createRankingDto: CreateRankingDto): string;
    findAll(): Promise<Player[]>;
    findOne(id: number): string;
    update(id: number, updateRankingDto: UpdateRankingDto): string;
    remove(id: number): string;
    getRankingUpdates(): Observable<MessageEvent>;
    emitRankingUpdate(player: {
        id: string;
        rank: number;
    }): void;
}
