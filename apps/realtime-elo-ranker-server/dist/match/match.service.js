"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const match_entity_1 = require("./entities/match.entity");
const player_entity_1 = require("../player/entities/player.entity");
let MatchService = class MatchService {
    constructor(matchRepository, playerRepository) {
        this.matchRepository = matchRepository;
        this.playerRepository = playerRepository;
    }
    async create(createMatchDto) {
        const { winner: winnerId, loser: loserId, draw } = createMatchDto;
        const winner = await this.playerRepository.findOne({ where: { id: winnerId } });
        const loser = await this.playerRepository.findOne({ where: { id: loserId } });
        if (!winner) {
            throw new common_1.NotFoundException(`Player with id ${winnerId} not found`);
        }
        if (!loser) {
            throw new common_1.NotFoundException(`Player with id ${loserId} not found`);
        }
        if (winnerId === loserId) {
            throw new common_1.BadRequestException("Winner and loser cannot be the same player");
        }
        const newMatch = this.matchRepository.create({
            winner,
            loser,
            draw,
        });
        const { newWinnerRank, newLoserRank } = this.calculateElo(winner.rank, loser.rank, draw);
        winner.rank = newWinnerRank;
        loser.rank = newLoserRank;
        this.playerRepository.save(winner);
        this.playerRepository.save(loser);
        return await this.matchRepository.save(newMatch);
    }
    async findAll() {
        return this.matchRepository.find({ relations: ['winner', 'loser'] });
    }
    async findOne(id) {
        const match = await this.matchRepository.findOne({ where: { id }, relations: ['winner', 'loser'] });
        if (!match) {
            throw new common_1.NotFoundException(`Match with id ${id} not found`);
        }
        return match;
    }
    async update(id, updateMatchDto) {
        const match = await this.findOne(id);
        Object.assign(match, updateMatchDto);
        return this.matchRepository.save(match);
    }
    async remove(id) {
        const result = await this.matchRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Match with id ${id} not found`);
        }
    }
    calculateElo(winnerRank, loserRank, draw = false) {
        const k = 32;
        const expectedWinner = 1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
        const expectedLoser = 1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));
        let newWinnerRank, newLoserRank;
        if (draw) {
            newWinnerRank = Math.round(winnerRank + k * (0.5 - expectedWinner));
            newLoserRank = Math.round(loserRank + k * (0.5 - expectedLoser));
        }
        else {
            newWinnerRank = Math.round(winnerRank + k * (1 - expectedWinner));
            newLoserRank = Math.round(loserRank + k * (0 - expectedLoser));
        }
        return { newWinnerRank, newLoserRank };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(match_entity_1.Match)),
    __param(1, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MatchService);
//# sourceMappingURL=match.service.js.map