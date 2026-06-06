'use client';

import Link from 'next/link';
import { HeroTitle, Button, Card } from '@padeal/ui';
import { Check, ArrowLeft } from 'lucide-react';
import { pricing } from '@padeal/config/tokens';

const FEATURES = [
  'Swipes illimités chaque jour',
  'Voir qui t\'a liké',
  'Filtres avancés (niveau, distance)',
  'Stats détaillées et historique ELO',
  'Badge Premium sur ton profil',
  'Support prioritaire',
];

export default function PaywallPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-8 max-w-lg mx-auto">
      <Link
        href="/app/profil"
        className="flex items-center gap-2 font-sans text-green-dark font-semibold mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour
      </Link>

      <HeroTitle
        lines={['DEVIENS', 'PREMIUM']}
        highlightLine={1}
        highlightWords={['PREMIUM']}
        size="hero"
        className="mb-4 text-[48px]"
      />

      <p className="font-sans text-gray mb-8">
        Débloque toute la puissance de Padeal et trouve ton partenaire idéal
        plus vite.
      </p>

      <Card className="mb-8">
        <ul className="flex flex-col gap-4">
          {FEATURES.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-dark shrink-0 mt-0.5" />
              <span className="font-sans text-[15px] text-black">{f}</span>
            </li>
          ))}
        </ul>
      </Card>

      <div className="rounded-card border-2 border-green-dark bg-green-light/20 p-6 mb-6 text-center">
        <p className="font-boldonse text-3xl text-green-dark mb-1">
          {pricing.playerAnnual}€
        </p>
        <p className="font-sans text-sm text-gray">par an · Joueur</p>
        <p className="font-sans text-xs text-gray mt-2">
          Coach : {pricing.coachMonthly}€/mois
        </p>
      </div>

      <Button size="xl" fullWidth className="mb-4">
        Essai gratuit 1 mois
      </Button>

      <p className="font-sans text-xs text-gray text-center">
        Annulable à tout moment. Paiement sécurisé via Stripe.
      </p>
    </main>
  );
}
