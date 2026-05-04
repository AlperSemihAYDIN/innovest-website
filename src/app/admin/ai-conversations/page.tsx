'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { adminApi } from '@/lib/adminApi';
import { ChevronDown, ChevronUp, Search, Bot, User, RefreshCw } from 'lucide-react';

interface ConvDoc {
  id: string;
  session_id: string;
  conversation_id: string;
  user_message: string;
  ai_response: string;
  timestamp: string;
}

interface Session {
  session_id: string;
  messages: ConvDoc[];
  firstAt: string;
  lastAt: string;
  durationSec: number;
}

function groupBySessions(docs: ConvDoc[]): Session[] {
  const map = new Map<string, ConvDoc[]>();
  for (const d of docs) {
    const arr = map.get(d.session_id) || [];
    arr.push(d);
    map.set(d.session_id, arr);
  }
  const sessions: Session[] = [];
  for (const [sid, msgs] of map) {
    const sorted = [...msgs].sort((a, b) => a.timestamp.localeCompare(b.timestamp));
    const firstAt = sorted[0]?.timestamp ?? '';
    const lastAt = sorted[sorted.length - 1]?.timestamp ?? '';
    const durationSec = firstAt && lastAt
      ? Math.round((new Date(lastAt).getTime() - new Date(firstAt).getTime()) / 1000)
      : 0;
    sessions.push({ session_id: sid, messages: sorted, firstAt, lastAt, durationSec });
  }
  return sessions.sort((a, b) => b.firstAt.localeCompare(a.firstAt));
}

function formatTime(iso: string) {
  try {
    return new Intl.DateTimeFormat('tr-TR', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function formatDuration(sec: number) {
  if (sec < 60) return `${sec}s`;
  if (sec < 3600) return `${Math.floor(sec / 60)}dk`;
  return `${Math.floor(sec / 3600)}sa ${Math.floor((sec % 3600) / 60)}dk`;
}

function renderMarkdown(content: string): React.ReactNode {
  const lines = content.split('\n');
  return lines.map((line, li) => {
    const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = tokenRegex.exec(line)) !== null) {
      if (match.index > lastIndex) parts.push(line.slice(lastIndex, match.index));
      const token = match[0];
      if (token.startsWith('**')) {
        parts.push(<strong key={`b${li}-${match.index}`} style={{ fontWeight: 600 }}>{token.slice(2, -2)}</strong>);
      } else {
        const lm = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (lm) parts.push(<a key={`a${li}-${match.index}`} href={lm[2]} style={{ color: '#C9A84C', textDecoration: 'underline', textUnderlineOffset: '3px' }} target="_blank" rel="noopener noreferrer">{lm[1]}</a>);
      }
      lastIndex = match.index + token.length;
    }
    if (lastIndex < line.length) parts.push(line.slice(lastIndex));
    return (
      <React.Fragment key={li}>
        {parts.length ? parts : line}
        {li < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function AiConversationsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [filtered, setFiltered] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('');
  const [kwFilter, setKwFilter] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (dateFilter) params.date = dateFilter;
      if (kwFilter) params.q = kwFilter;
      const docs: ConvDoc[] = await adminApi.getAiConversations(params);
      const grouped = groupBySessions(docs);
      setSessions(grouped);
      setFiltered(grouped);
    } catch {
      setSessions([]);
      setFiltered([]);
    } finally {
      setLoading(false);
    }
  }, [dateFilter, kwFilter]);

  useEffect(() => { load(); }, [load]);

  return (
    <div>
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-white tracking-wide">AI Konuşmaları</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.40)' }}>
            {filtered.length} oturum
          </p>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 text-sm px-4 py-2 rounded-lg transition-colors"
          style={{ border: '1px solid rgba(255,255,255,0.10)', color: 'rgba(255,255,255,0.60)' }}
        >
          <RefreshCw size={14} />
          Yenile
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.30)' }} />
          <input
            type="text"
            placeholder="Mesajda ara..."
            value={kwFilter}
            onChange={e => setKwFilter(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && load()}
            className="admin-input w-full pl-8"
          />
        </div>
        <input
          type="date"
          value={dateFilter}
          onChange={e => setDateFilter(e.target.value)}
          className="admin-input w-44"
          style={{ colorScheme: 'dark' }}
        />
        <button
          onClick={load}
          className="admin-btn-primary px-5"
          style={{ minWidth: 0 }}
        >
          Filtrele
        </button>
      </div>

      {/* Sessions list */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C9A84C]/30 border-t-[#C9A84C] rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20" style={{ color: 'rgba(255,255,255,0.30)' }}>
          <p className="text-sm">Henüz kayıtlı konuşma yok.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(session => {
            const isOpen = expandedId === session.session_id;
            return (
              <div
                key={session.session_id}
                className="admin-card overflow-hidden"
                style={{ padding: 0 }}
              >
                {/* Session row */}
                <button
                  className="w-full flex items-center gap-4 text-left transition-colors hover:bg-white/[0.02]"
                  style={{ padding: '16px 20px' }}
                  onClick={() => setExpandedId(isOpen ? null : session.session_id)}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <Bot size={14} style={{ color: '#C9A84C' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {session.messages[0]?.user_message || '—'}
                    </p>
                    <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      {formatTime(session.firstAt)} · {session.messages.length} mesaj · {formatDuration(session.durationSec)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.35)' }}>
                      {session.session_id.slice(0, 8)}
                    </span>
                    {isOpen ? <ChevronUp size={16} style={{ color: 'rgba(255,255,255,0.30)' }} /> : <ChevronDown size={16} style={{ color: 'rgba(255,255,255,0.30)' }} />}
                  </div>
                </button>

                {/* Expanded conversation */}
                {isOpen && (
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '20px', background: 'rgba(0,0,0,0.15)' }}>
                    <div className="space-y-4">
                      {session.messages.map((msg, idx) => (
                        <div key={msg.id} className="space-y-2">
                          {/* User message */}
                          <div className="flex items-start gap-2.5 justify-end">
                            <div style={{ maxWidth: '75%', background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.18)', borderRadius: '12px 4px 12px 12px', padding: '10px 14px' }}>
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <User size={10} style={{ color: '#C9A84C' }} />
                                <span className="text-xs font-medium" style={{ color: '#C9A84C' }}>Kullanıcı</span>
                                <span className="text-xs ml-auto" style={{ color: 'rgba(255,255,255,0.25)' }}>{formatTime(msg.timestamp)}</span>
                              </div>
                              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.80)', lineHeight: 1.6 }}>{renderMarkdown(msg.user_message)}</p>
                            </div>
                          </div>
                          {/* AI response */}
                          <div className="flex items-start gap-2.5">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.20)' }}>
                              <Bot size={11} style={{ color: '#C9A84C' }} />
                            </div>
                            <div style={{ maxWidth: '80%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '4px 12px 12px 12px', padding: '10px 14px' }}>
                              <p className="text-xs font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.35)' }}>Innovest AI</p>
                              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>{renderMarkdown(msg.ai_response)}</p>
                            </div>
                          </div>
                          {idx < session.messages.length - 1 && (
                            <div style={{ height: '1px', background: 'rgba(255,255,255,0.04)', margin: '8px 0' }} />
                          )}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs mt-4" style={{ color: 'rgba(255,255,255,0.20)' }}>
                      Session ID: {session.session_id} · Süre: {formatDuration(session.durationSec)}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
