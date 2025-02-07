import { Test, TestingModule } from '@nestjs/testing';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Player } from '../player/entities/player.entity';
import { RankingService } from '../ranking/ranking.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

// Mocks
const mockMatchRepository = {
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
};

const mockPlayerRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockRankingService = {
  emitRankingUpdate: jest.fn(),
};

describe('MatchController', () => {
  let controller: MatchController;
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchController],
      providers: [
        MatchService,
        { provide: getRepositoryToken(Match), useValue: mockMatchRepository }, // Mock du MatchRepository
        { provide: getRepositoryToken(Player), useValue: mockPlayerRepository }, // Mock du PlayerRepository
        { provide: RankingService, useValue: mockRankingService }, // Mock du RankingService
        { provide: EventEmitter2, useValue: { emit: jest.fn() } }, // Mock du EventEmitter2 si utilisé
      ],
    }).compile();

    controller = module.get<MatchController>(MatchController);
    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
