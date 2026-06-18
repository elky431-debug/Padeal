'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HeroTitle, Button } from '@padeal/ui';
import {
  ArrowRight,
  Users,
  Trophy,
  MessageCircle,
  MapPin,
  Star,
  Zap,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-hidden">
      {/* ===== NAV ===== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-light">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-boldonse font-extrabold text-2xl text-green-dark tracking-tight">
            PADEAL
          </span>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="font-sans text-sm font-semibold text-black hover:text-green-dark transition-colors px-3 py-2"
            >
              Se connecter
            </Link>
            <Link href="/register">
              <Button size="md">S&apos;inscrire</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative">
        {/* soft green glow */}
        <div className="pointer-events-none absolute -top-40 -right-40 h-[480px] w-[480px] rounded-full bg-green-light/60 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-6 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <motion.div
            initial="initial"
            animate="animate"
            transition={{ duration: 0.6 }}
            variants={fadeUp}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-pill bg-green-light border border-border px-4 py-2">
              <span className="h-2 w-2 rounded-full bg-green-dark animate-pulse" />
              <span className="font-sans text-sm font-medium text-green-deep">
                Île-de-France → France
              </span>
            </div>

            <HeroTitle
              lines={['Tout ton padel', 'dans une', 'seule app']}
              highlightLine={0}
              highlightWords={['padel']}
              size="hero"
              className="mb-6"
            />

            <p className="font-sans text-base text-gray max-w-md mb-8 leading-relaxed">
              Trouve avec qui jouer, réserve tes parties, suis ton classement et
              échange avec ta communauté. Le padel, du premier swipe au dernier
              point.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/register">
                <Button size="xl">
                  Commencer maintenant
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="xl">
                  Se connecter
                </Button>
              </Link>
            </div>

            <Link
              href="/demo"
              className="inline-flex items-center gap-1 font-sans text-sm font-semibold text-green-dark hover:underline mb-10"
            >
              Essayer la démo sans compte →
            </Link>

            {/* social proof */}
            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {['A', 'M', 'T', 'S'].map((c) => (
                  <span
                    key={c}
                    className="h-9 w-9 rounded-full bg-green-light border-2 border-white flex items-center justify-center font-boldonse font-extrabold text-sm text-green-dark"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-sans text-xs text-gray mt-0.5">
                  +2 400 joueurs déjà inscrits
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right — image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-[28px] overflow-hidden border border-border shadow-swipe">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hero-player.png"
                alt="Joueur de padel en action"
                className="w-full h-[460px] lg:h-[560px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* floating match card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-5 -left-5 bg-white rounded-2xl border border-border shadow-swipe p-4 w-[210px]"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="h-9 w-9 rounded-full bg-green-dark flex items-center justify-center">
                  <Zap className="h-4 w-4 text-white fill-white" />
                </span>
                <div>
                  <p className="font-boldonse font-extrabold text-sm text-black leading-none">
                    Nouveau match
                  </p>
                  <p className="font-sans text-xs text-gray mt-1">
                    Lucas · Niv. 4 · 2,3 km
                  </p>
                </div>
              </div>
              <div className="h-1 rounded-full bg-green-light overflow-hidden">
                <div className="h-full w-[88%] rounded-full bg-green-dark" />
              </div>
              <p className="font-mono text-xs text-green-dark mt-1.5">
                88% compatible
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== STATS STRIP ===== */}
      <section className="border-y border-gray-light bg-surface">
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '2 400+', label: 'Joueurs actifs' },
            { value: '180+', label: 'Clubs partenaires' },
            { value: '12 000', label: 'Matchs créés' },
            { value: '4,9★', label: 'Note moyenne' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-mono text-2xl md:text-3xl text-green-dark">
                {s.value}
              </p>
              <p className="font-sans text-sm text-gray mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <HeroTitle
            lines={['Pourquoi Padeal ?']}
            highlightLine={0}
            highlightWords={['Padeal']}
            size="h1"
            className="mb-4"
          />
          <p className="font-sans text-gray max-w-lg mb-14">
            Matchs, parties, ligue et chat — tout ce qu&apos;il faut pour vivre
            le padel au quotidien.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: 'Matching intelligent',
                desc: 'Algorithme basé sur niveau, distance, style et côté préféré.',
              },
              {
                icon: Trophy,
                title: 'Ligue & ELO',
                desc: 'Classement compétitif avec rangs Bronze à Elite.',
              },
              {
                icon: MessageCircle,
                title: 'Chat en direct',
                desc: 'Organise tes parties en temps réel avec tes matchs.',
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-card bg-white border border-border p-7 hover:border-green-dark hover:shadow-swipe transition-all"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-light mb-5 group-hover:bg-green-dark transition-colors">
                  <f.icon className="h-6 w-6 text-green-dark group-hover:text-white transition-colors" />
                </span>
                <h3 className="font-boldonse font-extrabold text-xl text-black mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="font-sans text-sm text-gray leading-relaxed">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOWCASE — partners ===== */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-[28px] overflow-hidden border border-border shadow-swipe"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/partners-highfive.png"
              alt="Deux partenaires de padel"
              className="w-full h-[380px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <HeroTitle
              lines={['Des matchs', 'à ton niveau']}
              highlightLine={1}
              highlightWords={['niveau']}
              size="h1"
              className="mb-5"
            />
            <p className="font-sans text-gray leading-relaxed mb-6 max-w-md">
              Fini les parties déséquilibrées. Padeal calcule la compatibilité
              entre joueurs pour des matchs toujours intenses et fun.
            </p>
            <ul className="flex flex-col gap-3 mb-8">
              {[
                'Profils vérifiés par niveau FFT / FIP',
                'Distance et créneaux en temps réel',
                'Styles complémentaires attaquant / défenseur',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-6 w-6 rounded-full bg-green-light flex items-center justify-center shrink-0">
                    <MapPin className="h-3.5 w-3.5 text-green-dark" />
                  </span>
                  <span className="font-sans text-sm text-black">{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button>
                Rejoindre Padeal
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto relative rounded-[32px] overflow-hidden border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/court-topdown.png"
            alt="Court de padel vu du dessus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]" />
          <div className="relative px-6 py-20 text-center">
            <HeroTitle
              lines={['Prêt à', 'rejoindre le game ?']}
              highlightLine={1}
              highlightWords={['game']}
              size="hero"
              className="mb-6 mx-auto max-w-2xl"
            />
            <p className="font-sans text-gray max-w-md mx-auto mb-8">
              Crée ton profil en 2 minutes et lance ton premier match dès
              aujourd&apos;hui.
            </p>
            <Link href="/register">
              <Button size="xl">
                Créer mon profil
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="px-6 py-12 border-t border-gray-light">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-boldonse font-extrabold text-2xl text-green-dark">PADEAL</span>
          <p className="font-sans text-sm text-gray">
            © 2026 Padeal — Tout ton padel, une seule app
          </p>
        </div>
      </footer>
    </main>
  );
}
