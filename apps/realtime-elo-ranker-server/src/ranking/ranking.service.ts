import { Injectable } from '@nestjs/common';
import { CreateRankingDto } from './dto/create-ranking.dto';
import { UpdateRankingDto } from './dto/update-ranking.dto';
import { Player } from 'src/player/entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  create(createRankingDto: CreateRankingDto) {
    return 'This action adds a new ranking';
  }

  findAll() {
    return this.playerRepository.find({ order: { rank: 'DESC' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} ranking`;
  }

  update(id: number, updateRankingDto: UpdateRankingDto) {
    return `This action updates a #${id} ranking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ranking`;
  }
}
