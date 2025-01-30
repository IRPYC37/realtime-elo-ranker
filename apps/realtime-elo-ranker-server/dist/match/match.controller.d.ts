import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
export declare class MatchController {
    private readonly matchService;
    constructor(matchService: MatchService);
    create(createMatchDto: CreateMatchDto): Promise<import("./entities/match.entity").Match>;
    findAll(): Promise<import("./entities/match.entity").Match[]>;
    findOne(id: string): Promise<import("./entities/match.entity").Match>;
    update(id: string, updateMatchDto: UpdateMatchDto): Promise<import("./entities/match.entity").Match>;
    remove(id: string): Promise<void>;
}
