import { RankingService } from 'src/ranking/ranking.service';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';
export declare class PlayerService {
    private readonly playerRepository;
    private readonly rankingService;
    RankingService: any;
    constructor(playerRepository: Repository<Player>, rankingService: RankingService);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[]>;
    findOne(id: string): Promise<Player>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player>;
    remove(id: string): Promise<void>;
}
