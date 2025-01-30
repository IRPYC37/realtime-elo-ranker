import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Player } from 'src/player/entities/player.entity';
export declare class MatchService {
    private readonly matchRepository;
    private readonly playerRepository;
    constructor(matchRepository: Repository<Match>, playerRepository: Repository<Player>);
    create(createMatchDto: CreateMatchDto): Promise<Match>;
    findAll(): Promise<Match[]>;
    findOne(id: string): Promise<Match>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match>;
    remove(id: string): Promise<void>;
    private calculateElo;
}
