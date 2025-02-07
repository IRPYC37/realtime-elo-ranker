import { RankingService } from './ranking.service';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Observable } from 'rxjs';
export declare class RankingController {
    private readonly rankingService;
    private readonly logger;
    constructor(rankingService: RankingService);
    subscribeToRankingUpdates(): Observable<MessageEvent>;
    create(createRankingDto: CreateRankingDto): string;
    findAll(): Promise<import("../player/entities/player.entity").Player[]>;
    findOne(id: string): string;
    update(id: string, updateRankingDto: UpdateRankingDto): string;
    remove(id: string): string;
}
