import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Match } from './entities/match.entity';
import { Player } from '../player/entities/player.entity';
import { RankingService } from '../ranking/ranking.service';

describe('MatchService', () => {
  let service: MatchService;
  let matchRepository: Repository<Match>;
  let playerRepository: Repository<Player>;
  let rankingService: RankingService;

  // Création de mocks pour les dépendances
  const mockMatchRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockPlayerRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockRankingService = {
    emitRankingUpdate: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        { provide: getRepositoryToken(Match), useValue: mockMatchRepository },
        { provide: getRepositoryToken(Player), useValue: mockPlayerRepository },
        { provide: RankingService, useValue: mockRankingService },
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    playerRepository = module.get<Repository<Player>>(getRepositoryToken(Player));
    rankingService = module.get<RankingService>(RankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
