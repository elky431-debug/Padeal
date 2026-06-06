'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Calendar,
  Trophy,
  MessageCircle,
  User,
} from 'lucide-react';

const tabs = [
  { href: '/app/partenaires', label: 'Partenaires', icon: Users },
  { href: '/app/parties', label: 'Parties', icon: Calendar },
  { href: '/app/ligue', label: 'Ligue', icon: Trophy },
  { href: '/app/chat', label: 'Chat', icon: MessageCircle },
  { href: '/app/profil', label: 'Profil', icon: User },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white pb-20">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-light px-6 py-4">
        <Link href="/app/partenaires" className="font-boldonse text-xl text-green-dark">
          PADEAL
        </Link>
      </header>

      <main>{children}</main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-light z-50">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {tabs.map((tab) => {
            const active = pathname.startsWith(tab.href);
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={[
                  'flex flex-col items-center gap-0.5 min-w-[44px] min-h-[44px] justify-center',
                  active ? 'text-green-dark' : 'text-[#999]',
                ].join(' ')}
              >
                <tab.icon className="h-6 w-6" strokeWidth={active ? 2.5 : 2} />
                <span className="font-sans text-[10px] font-medium">
                  {tab.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
