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
exports.RankingService = void 0;
const common_1 = require("@nestjs/common");
const player_entity_1 = require("../player/entities/player.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const eventemitter2_1 = require("eventemitter2");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let RankingService = class RankingService {
    constructor(playerRepository, eventEmitter) {
        this.playerRepository = playerRepository;
        this.eventEmitter = eventEmitter;
        this.rankingEmitter = new eventemitter2_1.EventEmitter2();
    }
    create(createRankingDto) {
        return 'This action adds a new ranking';
    }
    findAll() {
        return this.playerRepository.find({ order: { rank: 'DESC' } });
    }
    findOne(id) {
        return `This action returns a #${id} ranking`;
    }
    update(id, updateRankingDto) {
        return `This action updates a #${id} ranking`;
    }
    remove(id) {
        return `This action removes a #${id} ranking`;
    }
    getRanking(callback) {
        this.playerRepository.find()
            .then(players => {
            callback(null, players);
        })
            .catch(error => {
            callback(error);
        });
    }
    getRankingUpdates() {
        return (0, rxjs_1.fromEvent)(this.eventEmitter, 'rankingUpdate').pipe((0, operators_1.map)(player => {
            const messageData = {
                type: 'RankingUpdate',
                player
            };
            return new MessageEvent('message', {
                data: messageData,
                lastEventId: '',
                origin: '',
            });
        }));
    }
    emitRankingUpdate(player) {
        this.rankingEmitter.emit('rankingUpdate', player);
    }
};
exports.RankingService = RankingService;
exports.RankingService = RankingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(player_entity_1.Player)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        eventemitter2_1.EventEmitter2])
], RankingService);
//# sourceMappingURL=ranking.service.js.map