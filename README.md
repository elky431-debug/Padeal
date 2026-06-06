# PADEAL — Le Tinder du Padel

Application complète de matching padel pour l'Île-de-France et la France.

## Stack

| Couche | Technologie |
|--------|-------------|
| Web | Next.js 14 (App Router) + PWA |
| Mobile | Expo SDK 51 + Expo Router v3 |
| UI | NativeWind + design tokens partagés |
| Backend | Supabase (Auth, PostgreSQL, Realtime, Storage) |
| Paiement | Stripe + RevenueCat (à brancher) |

## Design System

- **Fond** : blanc `#FFFFFF` partout
- **Titres** : Boldonse (impact, style PubMoi)
- **Corps** : Inter
- **Stats** : JetBrains Mono
- **Accent** : vert uniquement (`#3B6D11`)

## Structure

```
padeal/
├── apps/
│   ├── web/          # Next.js PWA
│   └── mobile/       # Expo React Native
├── packages/
│   ├── config/       # Tailwind + tokens
│   ├── types/        # TypeScript partagés
│   ├── ui/           # Composants web
│   └── lib/          # Matching + Supabase
└── supabase/
    ├── migrations/   # Schema + RLS + PostGIS
    ├── functions/    # Edge Functions
    └── seed.sql
```

## Démarrage rapide

### 1. Installer les dépendances

```bash
cd padeal
npm install
```

### 2. Télécharger les polices (mobile)

```bash
node scripts/download-fonts.js
```

### 3. Configurer Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Exécuter les migrations dans `supabase/migrations/`
3. Copier `.env.example` → `.env.local` dans `apps/web`

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

### 4. Lancer le web

```bash
npm run dev:web
```

→ [http://localhost:3000](http://localhost:3000)

### 5. Lancer le mobile

```bash
npm run dev:mobile
```

Puis scanner le QR code avec Expo Go.

## Pages implémentées

| Écran | Web | Mobile |
|-------|-----|--------|
| Splash | — | ✅ |
| Landing hero PubMoi | ✅ | — |
| Auth (login/register) | ✅ | ✅ |
| Onboarding 6 étapes | ✅ | ✅ |
| Partenaires (swipe) | ✅ | ✅ |
| Parties | ✅ | ✅ |
| Ligue + ELO | ✅ | ✅ |
| Chat | ✅ | ✅ |
| Profil | ✅ | ✅ |
| Coachs | ✅ | — |
| Paywall | ✅ | ✅ |

## Algorithme de matching

```
Score = niveau×40% + distance×30% + style×20% + côté×10%
```

ELO : K=32 (niv. 1-3), K=24 (4-5), K=16 (6-7)

## Prochaines étapes

1. Brancher Supabase Auth (Google + Apple)
2. Upload photos → Supabase Storage
3. Chat Realtime
4. Stripe checkout + RevenueCat IAP
5. Push notifications (Expo + OneSignal)

## Tarifs

- **Joueur Premium** : 14,99€/an
- **Coach Pro** : 29,99€/mois
