import { CheckCircle2, ChevronRight } from 'lucide-react';
import { FLAG_CODES } from '../data/constants';

export function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-3 py-1.5 rounded-full font-medium skc-body transition-all whitespace-nowrap ${active ? 'skc-bg-teal skc-on-accent' : 'skc-bg-tealtint skc-teal'}`}
    >
      {children}
    </button>
  );
}

export function Flag({ country, style }) {
  const code = FLAG_CODES[country];
  if (!code) return null;
  return (
    <img
      src={`/flags/${code}.svg`}
      alt=""
      className="skc-flag"
      style={{ width: 20, height: 15, borderRadius: 2, objectFit: 'cover', ...style }}
    />
  );
}

export function StatBox({ icon: Icon, label, value, sub }) {
  return (
    <div className="skc-card p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon size={14} className="skc-teal" />
        <p className="text-3xs font-medium skc-muted skc-body">{label}</p>
      </div>
      <p className="text-xl font-semibold skc-navy skc-mono">{value}</p>
      <p className="text-2xs skc-muted skc-body mt-1">{sub}</p>
    </div>
  );
}

export function MatchMeter({ match }) {
  return (
    <div className="flex items-center gap-2">
      <div className="match-track flex-1">
        <div className="match-fill" style={{ width: `${match}%` }}></div>
      </div>
      <span className="text-xs font-semibold skc-teal skc-mono">{match}%</span>
    </div>
  );
}

export function OpportunityCard({ category, title, trust, status, statusType, deadline, match, why }) {
  const statusClass =
    statusType === 'success' ? 'skc-bg-success skc-text-success' :
    statusType === 'warn' ? 'skc-bg-warn skc-text-warn' :
    'skc-bg-lock skc-text-lock';
  return (
    <div className="skc-card p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-3xs font-semibold uppercase tracking-wide skc-teal skc-body">{category}</span>
        <span className={`text-3xs px-2 py-0.5 rounded-full font-medium skc-body ${statusClass}`}>{status}</span>
      </div>
      <p className="text-sm font-semibold skc-navy skc-body leading-snug mb-1">{title}</p>
      <p className="text-2xs skc-muted skc-body mb-2">{why}</p>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1">
          <CheckCircle2 size={12} className="skc-teal" />
          <span className="text-3xs skc-muted skc-body">{trust}</span>
        </div>
        <span className="text-3xs skc-muted skc-body">{deadline}</span>
      </div>
      <MatchMeter match={match} />
    </div>
  );
}

export function Field({ label, value, input, onChange, type = 'text' }) {
  return (
    <label className="block">
      <span className="text-2xs skc-muted skc-body">{label}</span>
      {input ? (
        <input
          type={type}
          className="skc-field mt-1 px-3 py-2 text-sm skc-body"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className="skc-field mt-1 px-3 py-2 text-sm skc-body">{value}</div>
      )}
    </label>
  );
}

export function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs skc-muted skc-body">{label}</span>
      <span className="text-xs skc-navy skc-body font-medium">{value}</span>
    </div>
  );
}

export function FeedbackRow({ icon: Icon, label, onClick }) {
  return (
    <div className="skc-divider flex items-center justify-between py-2" onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined}>
      <div className="flex items-center gap-2">
        <Icon size={14} className="skc-teal" />
        <span className="text-xs skc-navy skc-body">{label}</span>
      </div>
      <ChevronRight size={14} className="skc-muted" />
    </div>
  );
}
