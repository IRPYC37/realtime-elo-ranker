import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    private readonly eventEmitter;
    constructor(rankingService: RankingService);
    create(createRankingDto: CreateRankingDto): string;
    getRanking(): Promise<unknown>;
    findOne(id: string): string;
    update(id: string, updateRankingDto: UpdateRankingDto): string;
    remove(id: string): string;
    subscribeToRankingUpdates(): Observable<MessageEvent>;
}
