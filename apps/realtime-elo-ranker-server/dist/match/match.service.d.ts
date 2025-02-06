import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Player } from 'src/player/entities/player.entity';
import { RankingService } from 'src/ranking/ranking.service';
export declare class MatchService {
    private readonly matchRepository;
    private readonly playerRepository;
    private readonly rankingService;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>, rankingService: RankingService);
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    findAll(): Promise<Match[]>;
    findOne(id: string): Promise<Match>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match>;
    remove(id: string): Promise<void>;
    private calculateElo;
}
