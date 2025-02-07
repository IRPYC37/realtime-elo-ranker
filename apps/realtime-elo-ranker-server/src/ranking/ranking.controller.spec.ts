import { Test, TestingModule } from '@nestjs/testing';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

// Mocks
const mockPlayerRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
};

const mockEventEmitter = {
  emit: jest.fn(),
};

describe('RankingController', () => {
  let controller: RankingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RankingController],
      providers: [
        RankingService,
        { provide: getRepositoryToken(Player), useValue: mockPlayerRepository }, // Mock du PlayerRepository
        { provide: EventEmitter2, useValue: mockEventEmitter }, // Mock de l'EventEmitter2 si utilisé
      ],
    }).compile();

    controller = module.get<RankingController>(RankingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
