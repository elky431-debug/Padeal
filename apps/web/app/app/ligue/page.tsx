'use client';

import { HeroTitle, Card, Badge } from '@padeal/ui';
import { RANK_LABELS } from '@padeal/lib';
import type { LigueRank } from '@padeal/types';

const MOCK_LEADERBOARD = [
  { rank: 1, prenom: 'Antoine', elo: 1842, wins: 47, losses: 12, ligue: 'diamond' as LigueRank },
  { rank: 2, prenom: 'Sophie', elo: 1798, wins: 41, losses: 15, ligue: 'diamond' as LigueRank },
  { rank: 3, prenom: 'Karim', elo: 1654, wins: 38, losses: 18, ligue: 'platinum' as LigueRank },
  { rank: 4, prenom: 'Julie', elo: 1520, wins: 32, losses: 20, ligue: 'gold' as LigueRank },
  { rank: 5, prenom: 'Marc', elo: 1410, wins: 28, losses: 22, ligue: 'gold' as LigueRank },
  { rank: 6, prenom: 'Toi', elo: 1285, wins: 15, losses: 10, ligue: 'silver' as LigueRank, isMe: true },
];

const podiumColors = ['text-gold', 'text-gray', 'text-gold/70'];

export default function LiguePage() {
  const top3 = MOCK_LEADERBOARD.slice(0, 3);
  const rest = MOCK_LEADERBOARD.slice(3);

  return (
    <div className="px-6 py-6">
      <HeroTitle lines={['LE CLASSEMENT']} size="h1" className="mb-6" />

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[top3[1], top3[0], top3[2]].map((player, i) => {
          const actualRank = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = ['h-24', 'h-32', 'h-20'];
          return (
            <Card
              key={player.prenom}
              className={`text-center ${heights[i]} flex flex-col justify-end`}
            >
              <span className={`font-boldonse text-2xl ${podiumColors[actualRank - 1]}`}>
                #{actualRank}
              </span>
              <p className="font-boldonse text-sm mt-1">{player.prenom}</p>
              <p className="font-mono text-sm text-green-dark">{player.elo}</p>
            </Card>
          );
        })}
      </div>

      {/* My stats */}
      <Card className="mb-6 bg-green-light/30">
        <p className="font-sans font-semibold text-black mb-3">Tes stats</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-mono text-2xl text-green-dark">1285</p>
            <p className="font-sans text-xs text-gray">ELO</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-green-dark">15</p>
            <p className="font-sans text-xs text-gray">Victoires</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-green-dark">60%</p>
            <p className="font-sans text-xs text-gray">Win rate</p>
          </div>
        </div>
      </Card>

      {/* List */}
      <div className="flex flex-col gap-2">
        {rest.map((player) => (
          <div
            key={player.prenom}
            className={[
              'flex items-center gap-4 rounded-input border border-border px-4 py-3',
              player.isMe ? 'bg-green-light/50 border-green-dark' : 'bg-white',
            ].join(' ')}
          >
            <span className="font-mono text-sm text-gray w-6">
              {player.rank}
            </span>
            <span className="font-sans font-semibold text-black flex-1">
              {player.prenom}
              {player.isMe && ' (toi)'}
            </span>
            <Badge variant="level">{RANK_LABELS[player.ligue]}</Badge>
            <span className="font-mono text-sm text-green-dark">
              {player.elo}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
