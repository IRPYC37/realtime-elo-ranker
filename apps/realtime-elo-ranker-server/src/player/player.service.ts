import { RankingService } from 'src/ranking/ranking.service';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { Player } from './entities/player.entity';

@Injectable()
export class PlayerService {
  RankingService: any;
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
    private readonly rankingService: RankingService
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    // On utilise `id` comme `id` pour le joueur
    const { id } = createPlayerDto;

    // Vérifie si un joueur avec cet ID existe déjà
    const existingPlayer = await this.playerRepository.findOne({ where: { id: id } });
    if (existingPlayer) {
      throw new BadRequestException({
        code: 422,
        message: `A player with id ${id} already exists`
    });
    }

    // Calculer la moyenne de tous les rangs
    const players = await this.playerRepository.find();
    const totalRank = players.reduce((acc, player) => acc + player.rank, 0);
    const averageRank = players.length ? totalRank / players.length : 0;
    const startRank = averageRank;

    const newPlayer = this.playerRepository.create({
      id: id,  // Utilisation de `id` comme ID
      rank: startRank,
    });

    this.rankingService.emitRankingUpdate({
      id: newPlayer.id,
      rank: newPlayer.rank
  });

    return await this.playerRepository.save(newPlayer);
  }

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: string): Promise<Player> {
    const player = await this.playerRepository.findOne({ where: { id } });
    if (!player) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
    return player;
  }

  async update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);  // Vérifie si le joueur existe

    Object.assign(player, updatePlayerDto);  // Met à jour les propriétés
    return this.playerRepository.save(player);
  }

  async remove(id: string): Promise<void> {
    const result = await this.playerRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Player with id ${id} not found`);
    }
  }
}
