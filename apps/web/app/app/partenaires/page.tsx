'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroTitle, Badge, Chip } from '@padeal/ui';
import { X, Heart } from 'lucide-react';

const MOCK_PROFILES = [
  {
    id: '1',
    prenom: 'Lucas',
    age: 28,
    niveau: 4,
    distance: '2.3 km',
    style: 'Attaquant',
    coups: ['Smash', 'Vibora', 'Bandeja'],
    photo: null,
  },
  {
    id: '2',
    prenom: 'Marie',
    age: 32,
    niveau: 5,
    distance: '4.1 km',
    style: 'Polyvalent',
    coups: ['Lob', 'Volée', 'Contre-attaque'],
    photo: null,
  },
  {
    id: '3',
    prenom: 'Thomas',
    age: 24,
    niveau: 3,
    distance: '1.8 km',
    style: 'Défenseur',
    coups: ['Défense mur', 'Globo', 'Chiquita'],
    photo: null,
  },
];

export default function PartenairesPage() {
  const [profiles, setProfiles] = useState(MOCK_PROFILES);
  const [current, setCurrent] = useState(0);

  function handleSwipe(action: 'like' | 'pass') {
    setCurrent((c) => c + 1);
    // Optimistic UI — would sync to Supabase here
    void action;
  }

  const profile = profiles[current];

  return (
    <div className="px-6 py-6">
      <HeroTitle lines={['DÉCOUVRE']} size="h1" className="mb-2" />
      <p className="font-sans text-sm text-gray mb-6">
        Swipe des profils compatibles pour tes prochains matchs et parties.
      </p>

      {current >= profiles.length ? (
        <div className="text-center py-20">
          <HeroTitle lines={['PLUS DE', 'PROFILS']} size="h2" className="mb-4" />
          <p className="font-sans text-gray">
            Reviens demain pour de nouveaux profils !
          </p>
        </div>
      ) : (
        <>
          <AnimatePresence mode="wait">
            <motion.div
              key={profile.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="rounded-swipe border border-border bg-white shadow-swipe overflow-hidden mb-6"
            >
              <div className="aspect-[3/4] bg-green-light flex items-center justify-center">
                <span className="font-boldonse text-6xl text-green-mid/30">
                  {profile.prenom[0]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-boldonse text-2xl text-black">
                    {profile.prenom}, {profile.age}
                  </h3>
                  <Badge variant="level">Niv. {profile.niveau}</Badge>
                </div>
                <p className="font-sans text-sm text-gray mb-3">
                  📍 {profile.distance} · {profile.style}
                </p>
                <div className="flex flex-wrap gap-2">
                  {profile.coups.map((c) => (
                    <Chip key={c} selected className="pointer-events-none text-xs py-1">
                      {c}
                    </Chip>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-8">
            <button
              onClick={() => handleSwipe('pass')}
              className="h-16 w-16 rounded-full border-2 border-danger bg-white flex items-center justify-center hover:bg-danger/5 transition-colors"
              aria-label="Passer"
            >
              <X className="h-8 w-8 text-danger" />
            </button>
            <button
              onClick={() => handleSwipe('like')}
              className="h-16 w-16 rounded-full border-2 border-green-dark bg-green-dark flex items-center justify-center hover:bg-green-deep transition-colors"
              aria-label="Like"
            >
              <Heart className="h-8 w-8 text-white fill-white" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
