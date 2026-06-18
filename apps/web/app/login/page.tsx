'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeroTitle, Button, Input } from '@padeal/ui';
import {
  DEMO_EMAIL,
  DEMO_PASSWORD,
  isDemoCredentials,
} from '@padeal/lib';
import { createClient } from '@/lib/supabase/client';
import {
  enableDemoSession,
  isDemoModeEnabled,
} from '@/lib/demo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const demoMode = isDemoModeEnabled();

  function enterDemo() {
    enableDemoSession();
    router.push('/app/partenaires');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (demoMode && isDemoCredentials(email, password)) {
      enterDemo();
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    router.push('/app/partenaires');
  }

  return (
    <main className="min-h-screen bg-white px-6 py-12 max-w-md mx-auto">
      <Link
        href="/"
        className="font-boldonse text-xl text-green-dark mb-12 inline-block"
      >
        PADEAL
      </Link>

      <HeroTitle lines={['RECONNECTE-TOI']} size="h2" className="mb-2" />
      <p className="font-sans text-gray mb-8">
        Content de te revoir sur le court.
      </p>

      {demoMode && (
        <div className="mb-6 rounded-card border border-border bg-green-light/40 p-4">
          <p className="font-sans text-sm font-semibold text-green-deep mb-2">
            Mode démo
          </p>
          <p className="font-sans text-sm text-gray mb-3">
            Utilise ces identifiants pour explorer l&apos;app sans Supabase :
          </p>
          <div className="font-mono text-xs text-black space-y-1 mb-4">
            <p>Email : {DEMO_EMAIL}</p>
            <p>Mot de passe : {DEMO_PASSWORD}</p>
          </div>
          <Button type="button" fullWidth onClick={enterDemo}>
            Entrer en mode démo
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ton@email.com"
          required
        />
        <Input
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && (
          <p className="font-sans text-sm text-danger">{error}</p>
        )}

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Connexion...' : 'Se connecter'}
        </Button>
      </form>

      <p className="font-sans text-sm text-gray text-center mt-8">
        Pas encore de compte ?{' '}
        <Link href="/register" className="text-green-dark font-semibold">
          Rejoins le game
        </Link>
      </p>
    </main>
  );
}
