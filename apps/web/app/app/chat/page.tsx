'use client';

import { useState } from 'react';
import { HeroTitle } from '@padeal/ui';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    name: 'Lucas',
    lastMessage: 'Dispo samedi 18h au Padel Horizon ?',
    time: '14:32',
    unread: 2,
  },
  {
    id: '2',
    name: 'Marie',
    lastMessage: 'Super match hier ! On remet ça ?',
    time: 'Hier',
    unread: 0,
  },
  {
    id: '3',
    name: 'Thomas',
    lastMessage: 'Match confirmé ✅',
    time: 'Lun.',
    unread: 0,
  },
];

const MOCK_MESSAGES = [
  { id: '1', sender: 'them', content: 'Salut ! Tu joues quel niveau ?', time: '14:20' },
  { id: '2', sender: 'me', content: 'Niveau 4, je cherche un partenaire pour samedi', time: '14:25' },
  { id: '3', sender: 'them', content: 'Dispo samedi 18h au Padel Horizon ?', time: '14:32' },
];

export default function ChatPage() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  if (activeChat) {
    return (
      <div className="flex flex-col h-[calc(100vh-8rem)]">
        <div className="px-6 py-4 border-b border-gray-light flex items-center gap-3">
          <button
            onClick={() => setActiveChat(null)}
            className="font-sans text-green-dark font-semibold"
          >
            ← Retour
          </button>
          <span className="font-boldonse text-lg">LUCAS</span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
          {MOCK_MESSAGES.map((msg) => (
            <div
              key={msg.id}
              className={[
                'max-w-[80%] rounded-card px-4 py-3',
                msg.sender === 'me'
                  ? 'bg-green-dark text-white self-end'
                  : 'bg-surface text-black self-start',
              ].join(' ')}
            >
              <p className="font-sans text-[15px]">{msg.content}</p>
              <p
                className={[
                  'font-sans text-[11px] mt-1',
                  msg.sender === 'me' ? 'text-white/70' : 'text-gray',
                ].join(' ')}
              >
                {msg.time}
              </p>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-gray-light flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Écris un message..."
            className="flex-1 h-[52px] rounded-input border-[1.5px] border-border px-4 font-sans text-base focus:border-green-dark focus:outline-none"
          />
          <button className="h-[52px] px-6 rounded-pill bg-green-dark text-white font-sans font-semibold">
            Envoyer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <HeroTitle lines={['MESSAGES']} size="h1" className="mb-6" />

      <div className="flex flex-col gap-2">
        {MOCK_CONVERSATIONS.map((conv) => (
          <button
            key={conv.id}
            onClick={() => setActiveChat(conv.id)}
            className="flex items-center gap-4 rounded-card border border-border bg-white p-4 text-left hover:bg-surface transition-colors w-full"
          >
            <div className="h-12 w-12 rounded-full bg-green-light flex items-center justify-center">
              <span className="font-boldonse text-lg text-green-dark">
                {conv.name[0]}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <span className="font-sans font-semibold text-black">
                  {conv.name}
                </span>
                <span className="font-sans text-xs text-gray">{conv.time}</span>
              </div>
              <p className="font-sans text-sm text-gray truncate">
                {conv.lastMessage}
              </p>
            </div>
            {conv.unread > 0 && (
              <span className="h-5 w-5 rounded-full bg-green-dark text-white font-sans text-xs flex items-center justify-center">
                {conv.unread}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
