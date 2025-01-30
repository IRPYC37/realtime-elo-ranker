import { Player } from 'src/player/entities/player.entity';
export declare class Match {
    id: string;
    winner: Player;
    loser: Player;
    draw: boolean;
}
