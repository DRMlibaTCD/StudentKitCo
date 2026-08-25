import { useState } from 'react';
import { Sparkles, Bell, BookOpen, FileText, Calendar, Wallet, MessageCircle, ChevronRight } from 'lucide-react';
import { Flag, StatBox, MatchMeter } from '../components/shared';
import { FOUNDER_TEASER, FOUNDER_SIGNATURE, WHATSAPP_CHANNEL_URL } from '../data/constants';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen({ country, seenTeaser, onDismissTeaser, profile }) {
  const [showFuture, setShowFuture] = useState(false);
  const displayName = (profile.nickname || '').trim() || (profile.name || '').trim().split(' ')[0] || 'Student';

  return (
    <div className="relative overflow-hidden" style={{ minHeight: '100%' }}>
      <Flag
        country={country}
        style={{
          position: 'absolute', top: -30, right: -50, width: 230, height: 230,
          borderRadius: 0, opacity: 0.07, filter: 'grayscale(0.25)', pointerEvents: 'none', zIndex: 0,
        }}
      />
      <div className="p-4 space-y-3 relative" style={{ zIndex: 1 }}>
        {!seenTeaser && (
          <div className="skc-card p-4" style={{ borderColor: 'var(--teal)', borderWidth: 1.5 }}>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles size={13} className="skc-teal" />
              <p className="text-3xs skc-teal skc-body font-semibold uppercase tracking-wide">A note before you start</p>
            </div>
            <p className="text-xs skc-navy skc-body leading-relaxed mb-2">{FOUNDER_TEASER}</p>
            <p className="text-2xs italic skc-muted skc-body mb-1">"Built by a student, for students."</p>
            <p className="text-2xs skc-teal skc-display font-semibold mb-3">{FOUNDER_SIGNATURE}</p>
            <button onClick={onDismissTeaser} className="w-full py-2 rounded-lg skc-bg-teal skc-on-accent text-xs font-semibold skc-body">
              Got it
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xs skc-muted skc-body">{greeting()}</p>
            <h1 className="text-lg font-semibold skc-navy skc-display">{displayName}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xs px-2 py-1 rounded-full skc-bg-tealtint skc-teal skc-body font-medium flex items-center gap-1">
              <Flag country={country} style={{ width: 13, height: 10, borderRadius: 2 }} />
              {country}
            </span>
            <Bell size={18} className="skc-muted" />
          </div>
        </div>

        <div className="skc-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold skc-navy skc-body">3 new matches this week</p>
            <Sparkles size={16} className="skc-teal" />
          </div>
          <MatchMeter match={82} />
          <p className="text-2xs skc-muted skc-body mt-1.5">
            Based on {profile.programme || 'your programme'}, {(profile.level || '').toLowerCase()} and your interests
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <StatBox
            icon={BookOpen}
            label="ACADEMIC"
            value="71.2%"
            sub={profile.programme ? `${profile.programme} Assignment · 4 days` : 'Add your programme in Profile'}
          />
          <StatBox icon={FileText} label="APPLICATIONS" value="2" sub="Submitted · 1 awaiting" />
          <StatBox icon={Calendar} label="EVENTS" value="2" sub="This month" />
          <StatBox icon={Wallet} label="MONEY" value="E1,850" sub="E61 / day suggested" />
        </div>

        <p className="text-3xs skc-muted skc-body text-center -mt-1">Sample stats shown for illustration — live tracking is on the roadmap.</p>

        <a
          href={WHATSAPP_CHANNEL_URL}
          target="_blank"
          rel="noreferrer"
          className="skc-card p-3 flex items-center justify-between"
          style={{ textDecoration: 'none' }}
        >
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="skc-teal" />
            <p className="text-xs skc-navy skc-body font-medium">Join the StudentKitCo. WhatsApp Channel</p>
          </div>
          <ChevronRight size={16} className="skc-muted" />
        </a>

        <div className="skc-card p-4" style={{ borderStyle: 'dashed', borderColor: 'var(--teal)' }}>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="skc-teal" />
              <p className="text-xs font-semibold skc-navy skc-body">StudentKitCo. Daily & Connect</p>
            </div>
            <span className="text-3xs px-2 py-0.5 rounded-full skc-bg-warn skc-text-warn font-medium skc-body">Future phase</span>
          </div>
          <p className="text-2xs skc-muted skc-body mb-2">
            A useful daily drop, and expert sessions based on what students actually ask for.
          </p>
          <button onClick={() => setShowFuture(!showFuture)} className="text-2xs skc-teal skc-body font-medium">
            {showFuture ? 'Hide concept preview' : 'See concept preview'}
          </button>
          {showFuture && (
            <div className="mt-3 space-y-2">
              <div className="skc-bg-tealtint rounded-lg p-3">
                <p className="text-3xs skc-teal skc-body font-semibold uppercase tracking-wide mb-1">Today's Drop — concept</p>
                <p className="text-xs skc-navy skc-body leading-snug">Three things I wish I knew about money before graduating.</p>
              </div>
              <div className="skc-bg-tealtint rounded-lg p-3">
                <p className="text-3xs skc-teal skc-body font-semibold uppercase tracking-wide mb-1">What do you need? — concept</p>
                <p className="text-xs skc-navy skc-body leading-snug">"I'd like to understand investing." — 87 students asked something similar this month.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
