import { Test, TestingModule } from '@nestjs/testing';
import { PlayerController } from '../player.controller';
import { PlayerService } from '../player.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../entities/player.entity';
import { RankingService } from '../../ranking/ranking.service';

// Mocks
const mockPlayerRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

const mockRankingService = {
  // Mock des méthodes de RankingService que PlayerService pourrait utiliser
  getRankings: jest.fn(),
};

describe('PlayerController', () => {
  let controller: PlayerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayerController],
      providers: [
        PlayerService,
        { provide: getRepositoryToken(Player), useValue: mockPlayerRepository }, // Mock de PlayerRepository
        { provide: RankingService, useValue: mockRankingService }, // Mock de RankingService
      ],
    }).compile();

    controller = module.get<PlayerController>(PlayerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
