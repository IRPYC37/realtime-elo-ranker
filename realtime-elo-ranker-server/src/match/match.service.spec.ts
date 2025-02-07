import { Test, TestingModule } from '@nestjs/testing';
import { MatchService } from './match.service';
import { MatchRepository } from './match.repository'; // Adjust the import path as necessary
import { PlayerRepository } from './player.repository'; // Adjust the import path as necessary
import { RankingService } from './ranking.service'; // Adjust the import path as necessary

describe('MatchService', () => {
  let service: MatchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchService,
        MatchRepository,
        PlayerRepository,
        RankingService,
      ],
    }).compile();

    service = module.get<MatchService>(MatchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});