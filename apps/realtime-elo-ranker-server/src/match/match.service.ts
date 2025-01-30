import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Match } from './entities/match.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Player } from 'src/player/entities/player.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,

    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createMatchDto: CreateMatchDto): Promise<Match> {
    const { winner: winnerId, loser: loserId, draw } = createMatchDto

    // Vérifier que les joueurs existent
    const winner = await this.playerRepository.findOne({ where: { id: winnerId } });
    const loser = await this.playerRepository.findOne({ where: { id: loserId } });

    if (!winner) {
      throw new NotFoundException(`Player with id ${winnerId} not found`);
    }
    if (!loser) {
      throw new NotFoundException(`Player with id ${loserId} not found`);
    }
    if (winnerId === loserId) {
      throw new BadRequestException("Winner and loser cannot be the same player");
    }

    // Création du match
    const newMatch = this.matchRepository.create({
      winner,
      loser,
      draw,
    });

    const { newWinnerRank, newLoserRank } = this.calculateElo(
        winner.rank,
        loser.rank,
        draw,
    );

    winner.rank = newWinnerRank;
    loser.rank = newLoserRank;

    this.playerRepository.save(winner);
    this.playerRepository.save(loser);

    return await this.matchRepository.save(newMatch);

  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['winner', 'loser'] });
  }

  async findOne(id: string): Promise<Match> {
    const match = await this.matchRepository.findOne({ where: { id }, relations: ['winner', 'loser'] });
    if (!match) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
    return match;
  }

  async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
    const match = await this.findOne(id);

    // Mise à jour du match
    Object.assign(match, updateMatchDto);

    return this.matchRepository.save(match);
  }

  async remove(id: string): Promise<void> {
    const result = await this.matchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Match with id ${id} not found`);
    }
  }


private calculateElo(
    winnerRank: number,
    loserRank: number,
    draw: boolean = false,
  ): { newWinnerRank: number; newLoserRank: number } {
    const k = 32; // Facteur de mise Ã  jour
    const expectedWinner =
      1 / (1 + Math.pow(10, (loserRank - winnerRank) / 400));
    const expectedLoser =
      1 / (1 + Math.pow(10, (winnerRank - loserRank) / 400));

    let newWinnerRank, newLoserRank;

    if (draw) {
      newWinnerRank = Math.round(winnerRank + k * (0.5 - expectedWinner));
      newLoserRank = Math.round(loserRank + k * (0.5 - expectedLoser));
    } else {
      newWinnerRank = Math.round(winnerRank + k * (1 - expectedWinner));
      newLoserRank = Math.round(loserRank + k * (0 - expectedLoser));
    }

    return { newWinnerRank, newLoserRank };
}
}
