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
exports.RankingController = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("./ranking.service");
const create_ranking_dto_1 = require("./dto/create-ranking.dto");
const update_ranking_dto_1 = require("./dto/update-ranking.dto");
const rxjs_1 = require("rxjs");
const events_1 = require("events");
let RankingController = class RankingController {
    constructor(rankingService) {
        this.rankingService = rankingService;
        this.eventEmitter = new events_1.EventEmitter();
    }
    create(createRankingDto) {
        return this.rankingService.create(createRankingDto);
    }
    getRanking() {
        return new Promise((resolve, reject) => {
            this.rankingService.getRanking((error, ranking) => {
                if (error) {
                    return reject(new Error(error));
                }
                if (!ranking || ranking.length === 0) {
                    return reject(new common_1.NotFoundException({
                        code: 404,
                        message: "Le classement n'est pas disponible car aucun joueur n'existe.",
                    }));
                }
                resolve(ranking);
            });
        });
    }
    findOne(id) {
        return this.rankingService.findOne(+id);
    }
    update(id, updateRankingDto) {
        return this.rankingService.update(+id, updateRankingDto);
    }
    remove(id) {
        return this.rankingService.remove(+id);
    }
    subscribeToRankingUpdates() {
        return this.rankingService.getRankingUpdates();
    }
};
exports.RankingController = RankingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ranking_dto_1.CreateRankingDto]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "getRanking", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ranking_dto_1.UpdateRankingDto]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RankingController.prototype, "remove", null);
__decorate([
    (0, common_1.Sse)('events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], RankingController.prototype, "subscribeToRankingUpdates", null);
exports.RankingController = RankingController = __decorate([
    (0, common_1.Controller)('api/ranking'),
    __metadata("design:paramtypes", [ranking_service_1.RankingService])
], RankingController);
//# sourceMappingURL=ranking.controller.js.map