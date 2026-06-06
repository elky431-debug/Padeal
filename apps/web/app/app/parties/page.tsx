'use client';

import { HeroTitle, Card, Button, Badge } from '@padeal/ui';
import { MapPin, Clock, Users } from 'lucide-react';

const MOCK_PARTIES = [
  {
    id: '1',
    titre: 'Double mixte Paris 15',
    lieu: 'Padel Horizon Paris 15',
    date: 'Sam. 8 juin · 18h00',
    niveau: '3-5',
    joueurs: 2,
    max: 4,
  },
  {
    id: '2',
    titre: 'Session matinale Versailles',
    lieu: 'Forest Hill Versailles',
    date: 'Dim. 9 juin · 10h00',
    niveau: '4-6',
    joueurs: 3,
    max: 4,
  },
  {
    id: '3',
    titre: 'Tournoi amical Boulogne',
    lieu: 'Urban Padel Boulogne',
    date: 'Mer. 12 juin · 19h30',
    niveau: '2-4',
    joueurs: 1,
    max: 4,
  },
];

export default function PartiesPage() {
  return (
    <div className="px-6 py-6">
      <HeroTitle lines={['TROUVE UN MATCH']} size="h1" className="mb-6" />

      <div className="flex flex-col gap-4">
        {MOCK_PARTIES.map((party) => (
          <Card key={party.id} accent>
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-boldonse text-lg text-black">
                {party.titre.toUpperCase()}
              </h3>
              <Badge variant="level">Niv. {party.niveau}</Badge>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <p className="font-sans text-sm text-gray flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-dark" />
                {party.lieu}
              </p>
              <p className="font-sans text-sm text-gray flex items-center gap-2">
                <Clock className="h-4 w-4 text-green-dark" />
                {party.date}
              </p>
              <p className="font-sans text-sm text-gray flex items-center gap-2">
                <Users className="h-4 w-4 text-green-dark" />
                {party.joueurs}/{party.max} joueurs
              </p>
            </div>

            <Button size="md" fullWidth>
              REJOINDRE
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
