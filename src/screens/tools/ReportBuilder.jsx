import { useState } from 'react';
import { REPORT_STRUCTURES } from '../../data/constants';

export default function ReportBuilder() {
  const [type, setType] = useState('Lab Report');

  return (
    <div className="skc-card p-4 space-y-3">
      <p className="text-sm font-semibold skc-navy skc-body">Report Builder</p>
      <select
        className="skc-field px-3 py-2 text-sm skc-body"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        {Object.keys(REPORT_STRUCTURES).map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <div className="space-y-1.5">
        {REPORT_STRUCTURES[type].map((s, i) => (
          <div key={s} className="flex items-center gap-2 skc-divider py-1.5">
            <span className="text-3xs skc-teal skc-mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-xs skc-navy skc-body">{s}</span>
          </div>
        ))}
      </div>
      <p className="text-3xs skc-muted skc-body">
        A guided outline for your submission type. A downloadable, pre-formatted document is planned for a later version.
      </p>
    </div>
  );
}
