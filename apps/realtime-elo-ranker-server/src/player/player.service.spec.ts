import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PlayerService } from './player.service';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('PlayerService', () => {
  let service: PlayerService;
  let repository: Repository<Player>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        {
          provide: getRepositoryToken(Player),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    repository = module.get<Repository<Player>>(getRepositoryToken(Player));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new player', async () => {
      const createPlayerDto = { id: '1', rank: 0 };
      const player = { id: '1', rank: 0 } as Player;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'find').mockResolvedValue([]);
      jest.spyOn(repository, 'create').mockReturnValue(player);
      jest.spyOn(repository, 'save').mockResolvedValue(player);

      expect(await service.create(createPlayerDto)).toEqual(player);
    });

    it('should throw BadRequestException if player already exists', async () => {
      const createPlayerDto = { id: '1', rank: 0 };
      const existingPlayer = { id: '1' } as Player;

      jest.spyOn(repository, 'findOne').mockResolvedValue(existingPlayer);

      await expect(service.create(createPlayerDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return an array of players', async () => {
      const players = [{ id: '1' }, { id: '2' }] as Player[];

      jest.spyOn(repository, 'find').mockResolvedValue(players);

      expect(await service.findAll()).toEqual(players);
    });
  });

  describe('findOne', () => {
    it('should return a player by id', async () => {
      const player = { id: '1' } as Player;

      jest.spyOn(repository, 'findOne').mockResolvedValue(player);

      expect(await service.findOne('1')).toEqual(player);
    });

    it('should throw NotFoundException if player not found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a player', async () => {
      const updatePlayerDto = { rank: 10 };
      const player = { id: '1', rank: 0 } as Player;

      jest.spyOn(service, 'findOne').mockResolvedValue(player);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...player, ...updatePlayerDto });

      expect(await service.update('1', updatePlayerDto)).toEqual({ ...player, ...updatePlayerDto });
    });

    it('should throw NotFoundException if player not found', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(new NotFoundException());

      await expect(service.update('1', { rank: 10 })).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove a player', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1, raw: {} });

      await expect(service.remove('1')).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if player not found', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove('1')).rejects.toThrow(NotFoundException);
    });
  });
});
