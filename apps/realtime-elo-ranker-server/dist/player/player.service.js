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
exports.PlayerService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const player_entity_1 = require("./entities/player.entity");
let PlayerService = class PlayerService {
    constructor(playerRepository) {
        this.playerRepository = playerRepository;
    }
    async create(createPlayerDto) {
        const { id } = createPlayerDto;
        const existingPlayer = await this.playerRepository.findOne({ where: { id: id } });
        if (existingPlayer) {
            throw new common_1.BadRequestException(`A player with id ${id} already exists`);
        }
        const players = await this.playerRepository.find();
        const totalRank = players.reduce((sum, player) => sum + player.rank, 0);
        const averageRank = players.length ? totalRank / players.length : 0;
        const startRank = averageRank;
        const newPlayer = this.playerRepository.create({
            id: id,
            rank: startRank,
        });
        return await this.playerRepository.save(newPlayer);
    }
    async findAll() {
        return this.playerRepository.find();
    }
    async findOne(id) {
        const player = await this.playerRepository.findOne({ where: { id } });
        if (!player) {
            throw new common_1.NotFoundException(`Player with id ${id} not found`);
        }
        return player;
    }
    async update(id, updatePlayerDto) {
        const player = await this.findOne(id);
        Object.assign(player, updatePlayerDto);
        return this.playerRepository.save(player);
    }
    async remove(id) {
        const result = await this.playerRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Player with id ${id} not found`);
        }
    }
};
exports.PlayerService = PlayerService;
exports.PlayerService = PlayerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PlayerService);
//# sourceMappingURL=player.service.js.map