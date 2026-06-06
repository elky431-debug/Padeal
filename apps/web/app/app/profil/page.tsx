'use client';

import Link from 'next/link';
import { HeroTitle, Card, Badge, Chip, Button } from '@padeal/ui';
import { Settings, Crown } from 'lucide-react';

export default function ProfilPage() {
  return (
    <div className="px-6 py-6">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-green-light border-2 border-border flex items-center justify-center">
            <span className="font-boldonse text-3xl text-green-dark">A</span>
          </div>
          <div>
            <HeroTitle lines={['ALEX, 25']} size="h2" />
            <Badge variant="level" >Niv. 4</Badge>
          </div>
        </div>
        <button className="p-2" aria-label="Paramètres">
          <Settings className="h-6 w-6 text-gray" />
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { label: 'Matchs', value: '12' },
          { label: 'Victoires', value: '15' },
          { label: 'ELO', value: '1285' },
        ].map((stat) => (
          <Card key={stat.label} className="text-center py-4">
            <p className="font-mono text-xl text-green-dark">{stat.value}</p>
            <p className="font-sans text-xs text-gray">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Style & coups */}
      <Card className="mb-4">
        <p className="font-sans font-semibold text-black mb-3">Mon style</p>
        <p className="font-sans text-gray mb-4">Attaquant · Main droite · Drive</p>
        <div className="flex flex-wrap gap-2">
          {['Smash', 'Vibora', 'Bandeja', 'Contre-attaque'].map((c) => (
            <Chip key={c} selected className="pointer-events-none text-xs">
              {c}
            </Chip>
          ))}
        </div>
      </Card>

      {/* Palmarès */}
      <Card className="mb-6">
        <p className="font-sans font-semibold text-black mb-2">Palmarès</p>
        <p className="font-sans text-sm text-gray">
          Vainqueur tournoi club Paris 15 · 2025
        </p>
      </Card>

      {/* Premium CTA */}
      <Link href="/paywall">
        <Card className="bg-green-light/30 border-green-dark mb-4 cursor-pointer hover:bg-green-light/50 transition-colors">
          <div className="flex items-center gap-3">
            <Crown className="h-6 w-6 text-gold" />
            <div>
              <p className="font-sans font-semibold text-black">
                Passe Premium
              </p>
              <p className="font-sans text-sm text-gray">
                Swipes illimités, stats avancées
              </p>
            </div>
          </div>
        </Card>
      </Link>

      <Link href="/app/coachs">
        <Button variant="secondary" fullWidth>
          Trouver un coach
        </Button>
      </Link>
    </div>
  );
}
