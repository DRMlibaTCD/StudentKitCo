import { useState } from 'react';
import { Pill } from '../../components/shared';

export default function GpaCalculator() {
  const [scale, setScale] = useState('4.0');
  const scales = ['Percentage', '4.0', '5.0'];
  const pointsMap = {
    '4.0': { A: 4, B: 3, C: 2, D: 1, F: 0 },
    '5.0': { A: 5, B: 4, C: 3, D: 2, F: 1 },
  };
  const [courses, setCourses] = useState([
    { id: 1, name: 'Surveying II', credits: 12, grade: 'A', pct: 74 },
    { id: 2, name: 'GIS Fundamentals', credits: 10, grade: 'B', pct: 68 },
    { id: 3, name: 'Remote Sensing', credits: 8, grade: 'B', pct: 71 },
  ]);

  const updateCourse = (id, field, value) =>
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, [field]: value } : c)));

  const totalCredits = courses.reduce((s, c) => s + Number(c.credits || 0), 0);
  const totalPoints = courses.reduce((s, c) => {
    const val = scale === 'Percentage' ? Number(c.pct || 0) : (pointsMap[scale][c.grade] ?? 0);
    return s + val * Number(c.credits || 0);
  }, 0);
  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

  return (
    <div className="skc-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold skc-navy skc-body">GPA Calculator</p>
      </div>
      <div className="flex gap-1.5">
        {scales.map((s) => (
          <Pill key={s} active={scale === s} onClick={() => setScale(s)}>{s}</Pill>
        ))}
      </div>
      <div className="space-y-2">
        {courses.map((c) => (
          <div key={c.id} className="flex items-center gap-1.5">
            <input
              className="skc-field px-2 py-1.5 text-xs skc-body"
              style={{ flex: 1.7 }}
              value={c.name}
              onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
            />
            <input
              type="number"
              className="skc-field px-2 py-1.5 text-xs skc-mono text-center"
              style={{ width: 44 }}
              value={c.credits}
              onChange={(e) => updateCourse(c.id, 'credits', e.target.value)}
            />
            {scale === 'Percentage' ? (
              <input
                type="number"
                className="skc-field px-2 py-1.5 text-xs skc-mono text-center"
                style={{ width: 54 }}
                value={c.pct}
                onChange={(e) => updateCourse(c.id, 'pct', e.target.value)}
              />
            ) : (
              <select
                className="skc-field px-2 py-1.5 text-xs skc-mono text-center"
                style={{ width: 54 }}
                value={c.grade}
                onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
              >
                {Object.keys(pointsMap[scale]).map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
      <div className="skc-bg-tealtint rounded-xl p-3 text-center">
        <p className="text-2xs skc-teal skc-body font-medium mb-1">Weighted average ({scale} scale)</p>
        <p className="text-2xl font-bold skc-navy skc-mono">{gpa.toFixed(2)}{scale === 'Percentage' ? '%' : ''}</p>
      </div>
    </div>
  );
}
