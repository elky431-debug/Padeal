import Link from 'next/link';
import { HeroTitle, Button } from '@padeal/ui';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <HeroTitle lines={['404', 'PAGE INTROUVABLE']} size="h1" className="mb-6" />
      <Link href="/">
        <Button>Retour à l&apos;accueil</Button>
      </Link>
    </main>
  );
}
