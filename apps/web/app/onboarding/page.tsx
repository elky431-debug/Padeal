'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  HeroTitle,
  Button,
  Input,
  Chip,
  ProgressBar,
} from '@padeal/ui';
import { COUPS_GENIE, NIVEAUX } from '@padeal/types';
import type { OnboardingData, Sexe, StyleJeu, MainDominante, CotePrefere } from '@padeal/types';

const STEPS = 6;

const initialData: OnboardingData = {
  prenom: '',
  nom: '',
  age: 25,
  sexe: 'homme',
  ville: '',
  niveau: 3,
  style_jeu: 'polyvalent',
  main_dominante: 'droite',
  cote_prefere: 'indifferent',
  coups: [],
  photos: [],
};

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(initialData);

  function next() {
    if (step < STEPS) setStep(step + 1);
    else router.push('/app/partenaires');
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  function toggleCoup(coup: string) {
    setData((d) => ({
      ...d,
      coups: d.coups.includes(coup)
        ? d.coups.filter((c) => c !== coup)
        : [...d.coups, coup],
    }));
  }

  return (
    <main className="min-h-screen bg-white px-6 py-8 max-w-lg mx-auto">
      <div className="mb-8">
        <ProgressBar current={step} total={STEPS} />
        <p className="font-sans text-sm text-gray mt-2">
          Étape {step} sur {STEPS}
        </p>
      </div>

      {step === 1 && (
        <>
          <HeroTitle lines={['FAISONS', 'CONNAISSANCE']} size="h2" className="mb-8" />
          <div className="flex flex-col gap-4">
            <Input
              label="Prénom"
              value={data.prenom}
              onChange={(e) => setData({ ...data, prenom: e.target.value })}
              placeholder="Alex"
            />
            <Input
              label="Nom"
              value={data.nom}
              onChange={(e) => setData({ ...data, nom: e.target.value })}
              placeholder="Martin"
            />
            <Input
              label="Âge"
              type="number"
              min={16}
              max={99}
              value={data.age}
              onChange={(e) => setData({ ...data, age: Number(e.target.value) })}
            />
            <div>
              <label className="font-sans font-medium text-sm text-gray mb-2 block">
                Sexe
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['homme', 'femme', 'autre'] as Sexe[]).map((s) => (
                  <Chip
                    key={s}
                    selected={data.sexe === s}
                    onClick={() => setData({ ...data, sexe: s })}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            <Input
              label="Ville"
              value={data.ville}
              onChange={(e) => setData({ ...data, ville: e.target.value })}
              placeholder="Paris"
            />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <HeroTitle lines={['TON NIVEAU']} size="h2" className="mb-8" />
          <div className="flex justify-center gap-3 mb-8">
            {NIVEAUX.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setData({ ...data, niveau: n })}
                className={[
                  'h-14 w-14 rounded-full font-mono text-lg font-medium border-2 transition-all',
                  data.niveau === n
                    ? 'bg-green-dark text-white border-green-dark scale-110'
                    : 'bg-green-light text-green-deep border-border hover:border-green-dark',
                ].join(' ')}
              >
                {n}
              </button>
            ))}
          </div>
          <Input
            label="Classement FFT (optionnel)"
            value={data.fft_ranking ?? ''}
            onChange={(e) => setData({ ...data, fft_ranking: e.target.value })}
            placeholder="P100"
          />
          <Input
            label="Classement FIP (optionnel)"
            value={data.fip_ranking ?? ''}
            onChange={(e) => setData({ ...data, fip_ranking: e.target.value })}
            placeholder="500"
            className="mt-4"
          />
        </>
      )}

      {step === 3 && (
        <>
          <HeroTitle lines={['TON STYLE']} size="h2" className="mb-8" />
          <div className="flex flex-col gap-3">
            {(['attaquant', 'defenseur', 'polyvalent'] as StyleJeu[]).map((s) => (
              <Chip
                key={s}
                selected={data.style_jeu === s}
                onClick={() => setData({ ...data, style_jeu: s })}
                className="w-full"
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Chip>
            ))}
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <HeroTitle lines={['MAIN & CÔTÉ']} size="h2" className="mb-8" />
          <p className="font-sans font-semibold text-black mb-3">Main dominante</p>
          <div className="flex gap-2 mb-6">
            {(['droite', 'gauche'] as MainDominante[]).map((m) => (
              <Chip
                key={m}
                selected={data.main_dominante === m}
                onClick={() => setData({ ...data, main_dominante: m })}
              >
                {m.charAt(0).toUpperCase() + m.slice(1)}
              </Chip>
            ))}
          </div>
          <p className="font-sans font-semibold text-black mb-3">Côté préféré</p>
          <div className="flex gap-2 flex-wrap">
            {(['revers', 'drive', 'indifferent'] as CotePrefere[]).map((c) => (
              <Chip
                key={c}
                selected={data.cote_prefere === c}
                onClick={() => setData({ ...data, cote_prefere: c })}
              >
                {c.charAt(0).toUpperCase() + c.slice(1)}
              </Chip>
            ))}
          </div>
        </>
      )}

      {step === 5 && (
        <>
          <HeroTitle lines={['TES COUPS', 'DE GÉNIE']} size="h2" className="mb-8" />
          <div className="flex flex-wrap gap-2">
            {COUPS_GENIE.map((coup) => (
              <Chip
                key={coup}
                selected={data.coups.includes(coup)}
                onClick={() => toggleCoup(coup)}
              >
                {coup}
              </Chip>
            ))}
          </div>
        </>
      )}

      {step === 6 && (
        <>
          <HeroTitle lines={['TES PHOTOS']} size="h2" className="mb-4" />
          <p className="font-sans text-gray mb-8">
            Ajoute jusqu&apos;à 6 photos et ton palmarès (optionnel).
          </p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-input border-2 border-dashed border-border bg-green-light/30 flex items-center justify-center cursor-pointer hover:border-green-dark transition-colors"
              >
                <span className="font-sans text-2xl text-green-mid">+</span>
              </div>
            ))}
          </div>
          <Input
            label="Palmarès (optionnel)"
            value={data.palmares ?? ''}
            onChange={(e) => setData({ ...data, palmares: e.target.value })}
            placeholder="Vainqueur tournoi club 2025..."
          />
        </>
      )}

      <div className="flex gap-3 mt-10">
        {step > 1 && (
          <Button variant="secondary" onClick={back} className="flex-1">
            Retour
          </Button>
        )}
        <Button onClick={next} className="flex-1">
          {step === STEPS ? 'Terminer →' : 'Continuer →'}
        </Button>
      </div>
    </main>
  );
}
