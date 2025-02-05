import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Player } from 'src/player/entities/player.entity';
import { Repository } from 'typeorm';
export declare class RankingService {
    private readonly playerRepository;
    constructor(playerRepository: Repository<Player>);
    create(createRankingDto: CreateRankingDto): string;
    findAll(): Promise<Player[]>;
    findOne(id: number): string;
    update(id: number, updateRankingDto: UpdateRankingDto): string;
    remove(id: number): string;
}
