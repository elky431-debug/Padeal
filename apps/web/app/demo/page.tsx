'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { enableDemoSession } from '@/lib/demo';

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    enableDemoSession();
    router.replace('/app/partenaires');
  }, [router]);

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <p className="font-sans text-gray">Chargement du mode démo…</p>
    </main>
  );
}
