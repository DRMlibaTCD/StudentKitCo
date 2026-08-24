import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function GradeCalculator() {
  const [components, setComponents] = useState([
    { id: 1, label: 'CA', weight: 40, mark: 64 },
    { id: 2, label: 'Exam', weight: 60, mark: '' },
  ]);
  const [target, setTarget] = useState(70);

  const update = (id, field, value) => {
    setComponents((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  };
  const addComponent = () => {
    setComponents((cs) => [...cs, { id: Date.now(), label: 'Component', weight: 0, mark: '' }]);
  };
  const removeComponent = (id) => setComponents((cs) => cs.filter((c) => c.id !== id));

  const known = components.filter((c) => c.mark !== '' && c.mark !== null);
  const knownWeight = known.reduce((s, c) => s + Number(c.weight || 0), 0);
  const knownWeightedSum = known.reduce((s, c) => s + (Number(c.weight || 0) * Number(c.mark || 0)) / 100, 0);
  const remainingWeight = Math.max(0, 100 - knownWeight);
  const rawNeeded = remainingWeight > 0 ? ((Number(target) - knownWeightedSum) / remainingWeight) * 100 : null;

  return (
    <div className="skc-card p-4 space-y-3">
      <p className="text-sm font-semibold skc-navy skc-body">What mark do I need?</p>
      <div className="space-y-2">
        {components.map((c) => (
          <div key={c.id} className="flex items-center gap-1.5">
            <input
              className="skc-field px-2 py-1.5 text-xs skc-body"
              style={{ flex: 1.5 }}
              value={c.label}
              onChange={(e) => update(c.id, 'label', e.target.value)}
            />
            <input
              type="number"
              className="skc-field px-2 py-1.5 text-xs skc-mono text-center"
              style={{ width: 50 }}
              value={c.weight}
              onChange={(e) => update(c.id, 'weight', e.target.value)}
            />
            <span className="text-3xs skc-muted">wt%</span>
            <input
              type="number"
              placeholder="—"
              className="skc-field px-2 py-1.5 text-xs skc-mono text-center"
              style={{ width: 50 }}
              value={c.mark}
              onChange={(e) => update(c.id, 'mark', e.target.value)}
            />
            <span className="text-3xs skc-muted">mk%</span>
            <button onClick={() => removeComponent(c.id)} aria-label={`Remove ${c.label}`}>
              <Trash2 size={13} className="skc-muted" />
            </button>
          </div>
        ))}
      </div>
      <button onClick={addComponent} className="flex items-center gap-1 text-2xs skc-teal skc-body font-medium">
        <Plus size={12} /> Add component
      </button>

      <label className="block">
        <span className="text-2xs skc-muted skc-body">Target final grade (%)</span>
        <input
          type="number"
          className="skc-field mt-1 px-3 py-2 text-sm skc-mono"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
        />
      </label>

      <div className="skc-bg-tealtint rounded-xl p-3 text-center mt-1">
        {remainingWeight > 0 ? (
          <>
            <p className="text-2xs skc-teal skc-body font-medium mb-1">You need, on the remaining {remainingWeight}%</p>
            <p className="text-2xl font-bold skc-navy skc-mono">
              {isFinite(rawNeeded) ? Math.max(0, rawNeeded).toFixed(0) : '—'}%
            </p>
          </>
        ) : (
          <>
            <p className="text-2xs skc-teal skc-body font-medium mb-1">All components entered — current total</p>
            <p className="text-2xl font-bold skc-navy skc-mono">{knownWeightedSum.toFixed(1)}%</p>
          </>
        )}
      </div>
    </div>
  );
}
