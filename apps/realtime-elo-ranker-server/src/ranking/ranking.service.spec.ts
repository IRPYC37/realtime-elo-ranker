import { Test, TestingModule } from '@nestjs/testing';
import { RankingService } from './ranking.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Player } from '../player/entities/player.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

describe('RankingService', () => {
  let service: RankingService;
  let playerRepository: Repository<Player>;

  // Mock du PlayerRepository
  const mockPlayerRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RankingService,
        { provide: getRepositoryToken(Player), useValue: mockPlayerRepository }, // Mock du repo Player
        { provide: EventEmitter2, useValue: { emit: jest.fn() } }, // Mock EventEmitter2 si utilisé
      ],
    }).compile();

    service = module.get<RankingService>(RankingService);
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
