'use client';

import { HeroTitle, Card, Button, Badge } from '@padeal/ui';
import { Star } from 'lucide-react';

const MOCK_COACHS = [
  {
    id: '1',
    prenom: 'Pierre',
    note: 4.9,
    nbAvis: 47,
    tarif: 55,
    bio: 'Ex-joueur FFT P500. Spécialiste attaque et smash.',
    specialites: ['Attaque', 'Smash', 'Tactique'],
  },
  {
    id: '2',
    prenom: 'Camille',
    note: 4.8,
    nbAvis: 32,
    tarif: 45,
    bio: 'Coach certifiée. Focus défense et placement.',
    specialites: ['Défense', 'Placement', 'Débutants'],
  },
  {
    id: '3',
    prenom: 'Rachid',
    note: 4.7,
    nbAvis: 28,
    tarif: 60,
    bio: '15 ans d\'expérience. Préparation compétition.',
    specialites: ['Compétition', 'Physique', 'Mental'],
  },
];

export default function CoachsPage() {
  return (
    <div className="px-6 py-6">
      <HeroTitle lines={['TROUVE TON COACH']} size="h1" className="mb-6" />

      <div className="flex flex-col gap-4">
        {MOCK_COACHS.map((coach) => (
          <Card key={coach.id}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-boldonse text-xl text-black">
                  {coach.prenom.toUpperCase()}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 text-gold fill-gold" />
                  <span className="font-mono text-sm text-black">
                    {coach.note}
                  </span>
                  <span className="font-sans text-xs text-gray">
                    ({coach.nbAvis} avis)
                  </span>
                </div>
              </div>
              <Badge variant="premium">{coach.tarif}€/h</Badge>
            </div>

            <p className="font-sans text-sm text-gray mb-4">{coach.bio}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {coach.specialites.map((s) => (
                <Badge key={s}>{s}</Badge>
              ))}
            </div>

            <Button fullWidth>Réserver une séance</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
