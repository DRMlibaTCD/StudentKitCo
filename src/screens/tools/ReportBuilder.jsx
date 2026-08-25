import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { REPORT_STRUCTURES } from '../../data/constants';
import { Field } from '../../components/shared';
import { usePersistentState } from '../../hooks/usePersistentState';
import { buildCitation } from '../../lib/citationFormat';

export default function ReportBuilder({ profile }) {
  const [type, setType] = useState('Lab Report');
  const [meta, setMeta] = useState({
    title: '',
    studentName: profile?.name || '',
    studentNumber: '',
    programme: profile?.programme || '',
    institution: profile?.institution || '',
    courseCode: '',
    supervisor: '',
    date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
  });
  const [generating, setGenerating] = useState(false);
  const [refList] = usePersistentState('citation-list', []);

  const update = (k, v) => setMeta((m) => ({ ...m, [k]: v }));
  const structure = REPORT_STRUCTURES[type];

  const handleDownload = async () => {
    setGenerating(true);
    try {
      const { buildReportDocx, downloadBlob } = await import('../../lib/reportDoc');
      const references = refList.map((r) => buildCitation(r.style, r).reference);
      const blob = await buildReportDocx({ reportType: type, structure, meta, references });
      const safeTitle = (meta.title || type).replace(/[^a-z0-9]+/gi, '_').slice(0, 60);
      downloadBlob(blob, `${safeTitle || 'Report'}.docx`);
    } finally {
      setGenerating(false);
    }
  };

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
        {structure.map((s, i) => (
          <div key={s} className="flex items-center gap-2 skc-divider py-1.5">
            <span className="text-3xs skc-teal skc-mono">{String(i + 1).padStart(2, '0')}</span>
            <span className="text-xs skc-navy skc-body">{s}</span>
          </div>
        ))}
      </div>

      <div className="pt-1 space-y-2">
        <p className="text-3xs skc-muted skc-body uppercase tracking-wide font-medium">Cover page details</p>
        <Field label="Report title" input value={meta.title} onChange={(v) => update('title', v)} />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Student name" input value={meta.studentName} onChange={(v) => update('studentName', v)} />
          <Field label="Student number" input value={meta.studentNumber} onChange={(v) => update('studentNumber', v)} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Programme" input value={meta.programme} onChange={(v) => update('programme', v)} />
          <Field label="Course code" input value={meta.courseCode} onChange={(v) => update('courseCode', v)} />
        </div>
        <Field label="Institution" input value={meta.institution} onChange={(v) => update('institution', v)} />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Supervisor / Lecturer" input value={meta.supervisor} onChange={(v) => update('supervisor', v)} />
          <Field label="Date" input value={meta.date} onChange={(v) => update('date', v)} />
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={generating}
        className="w-full py-2.5 rounded-lg skc-bg-teal skc-on-accent text-xs font-semibold skc-body flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {generating ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
        {generating ? 'Preparing document…' : 'Download as Word Document (.docx)'}
      </button>

      <p className="text-3xs skc-muted skc-body">
        Generates a pre-formatted outline with your cover page, headings for each section, and a references
        page{refList.length > 0 ? ` (${refList.length} saved reference${refList.length === 1 ? '' : 's'} included automatically)` : " — add references in the Citation tool and they'll be pulled in automatically"}.
      </p>
    </div>
  );
}
