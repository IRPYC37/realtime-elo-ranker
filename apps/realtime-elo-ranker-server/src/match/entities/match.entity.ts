import { Player } from 'src/player/entities/player.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Match {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column(() => Player)
    winner: Player;

    @Column(() => Player)
    loser: Player;

    @Column()
    draw: boolean;
}