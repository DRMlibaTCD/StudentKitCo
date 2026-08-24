import { useState } from 'react';
import { Pill } from '../components/shared';
import GradeCalculator from './tools/GradeCalculator';
import GpaCalculator from './tools/GpaCalculator';
import BudgetCalculator from './tools/BudgetCalculator';
import CitationGenerator from './tools/CitationGenerator';
import ReportBuilder from './tools/ReportBuilder';

export default function ToolsScreen() {
  const [active, setActive] = useState('grade');
  const tools = [
    { key: 'grade', label: 'Grade' },
    { key: 'gpa', label: 'GPA' },
    { key: 'budget', label: 'Budget' },
    { key: 'citation', label: 'Citation' },
    { key: 'report', label: 'Report' },
  ];
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-semibold skc-navy skc-display">Tools</h1>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {tools.map((t) => (
          <Pill key={t.key} active={active === t.key} onClick={() => setActive(t.key)}>{t.label}</Pill>
        ))}
      </div>
      {active === 'grade' && <GradeCalculator />}
      {active === 'gpa' && <GpaCalculator />}
      {active === 'budget' && <BudgetCalculator />}
      {active === 'citation' && <CitationGenerator />}
      {active === 'report' && <ReportBuilder />}
    </div>
  );
}
