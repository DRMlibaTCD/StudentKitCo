import { useState } from 'react';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';
import { Pill, Field } from '../../components/shared';
import { lookupDoi, lookupIsbn } from '../../lib/citationLookup';
import { buildCitation } from '../../lib/citationFormat';
import { usePersistentState } from '../../hooks/usePersistentState';

export default function CitationGenerator() {
  const styles5 = ['APA 7', 'Harvard', 'IEEE', 'MLA', 'Chicago'];
  const modes = [
    { key: 'manual', label: 'Manual' },
    { key: 'doi', label: 'DOI' },
    { key: 'isbn', label: 'ISBN' },
  ];

  const [mode, setMode] = useState('manual');
  const [style, setStyle] = useState('APA 7');
  const [data, setData] = useState({
    author: 'Dlamini, M.',
    year: '2025',
    title: 'Geospatial analysis of urban growth in Eswatini',
    source: 'University of Eswatini',
  });
  const [doiInput, setDoiInput] = useState('10.1038/nature14539');
  const [isbnInput, setIsbnInput] = useState('9780140449136');
  const [looking, setLooking] = useState(false);
  const [lookupError, setLookupError] = useState('');
  const [refList, setRefList] = usePersistentState('citation-list', []);

  const update = (k, v) => setData((d) => ({ ...d, [k]: v }));

  const runLookup = async (kind) => {
    setLooking(true);
    setLookupError('');
    try {
      const result = kind === 'doi' ? await lookupDoi(doiInput) : await lookupIsbn(isbnInput);
      setData(result);
    } catch (e) {
      setLookupError(e.message || 'Lookup failed. Check the input and your connection.');
    } finally {
      setLooking(false);
    }
  };

  const { reference, inText } = buildCitation(style, data);
  const missing = [];
  if (!data.author) missing.push('author');
  if (!data.year) missing.push('year');
  if (!data.title) missing.push('title');

  const addToList = () => setRefList((list) => [...list, { id: Date.now(), ...data, style }]);
  const removeFromList = (id) => setRefList((list) => list.filter((r) => r.id !== id));
  const sortedList = [...refList].sort((a, b) => a.author.localeCompare(b.author));

  return (
    <div className="space-y-3">
      <div className="skc-card p-4 space-y-3">
        <p className="text-sm font-semibold skc-navy skc-body">Citation Generator</p>
        <div className="flex gap-1.5">
          {modes.map((m) => (
            <Pill key={m.key} active={mode === m.key} onClick={() => { setMode(m.key); setLookupError(''); }}>{m.label}</Pill>
          ))}
        </div>

        {mode === 'manual' && (
          <div className="space-y-2">
            <Field label="Author(s)" input value={data.author} onChange={(v) => update('author', v)} />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Year" input value={data.year} onChange={(v) => update('year', v)} />
              <Field label="Source" input value={data.source} onChange={(v) => update('source', v)} />
            </div>
            <Field label="Title" input value={data.title} onChange={(v) => update('title', v)} />
          </div>
        )}

        {mode === 'doi' && (
          <div className="space-y-2">
            <Field label="DOI" input value={doiInput} onChange={setDoiInput} />
            <button onClick={() => runLookup('doi')} disabled={looking} className="w-full py-2 rounded-lg skc-bg-teal skc-on-accent text-xs font-semibold skc-body disabled:opacity-60">
              {looking ? 'Looking up…' : 'Look up via Crossref'}
            </button>
            {lookupError && <p className="text-3xs skc-text-warn skc-body">{lookupError}</p>}
          </div>
        )}

        {mode === 'isbn' && (
          <div className="space-y-2">
            <Field label="ISBN" input value={isbnInput} onChange={setIsbnInput} />
            <button onClick={() => runLookup('isbn')} disabled={looking} className="w-full py-2 rounded-lg skc-bg-teal skc-on-accent text-xs font-semibold skc-body disabled:opacity-60">
              {looking ? 'Looking up…' : 'Look up via Open Library'}
            </button>
            {lookupError && <p className="text-3xs skc-text-warn skc-body">{lookupError}</p>}
          </div>
        )}

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {styles5.map((s) => (
            <Pill key={s} active={style === s} onClick={() => setStyle(s)}>{s}</Pill>
          ))}
        </div>

        {missing.length > 0 && (
          <div className="flex items-start gap-1.5 skc-bg-warn rounded-lg p-2">
            <AlertTriangle size={12} className="skc-text-warn flex-shrink-0 mt-0.5" />
            <p className="text-3xs skc-text-warn skc-body">Missing: {missing.join(', ')}</p>
          </div>
        )}

        <div className="skc-bg-tealtint rounded-xl p-3 space-y-2">
          <div>
            <p className="text-3xs skc-teal skc-body font-medium mb-0.5 uppercase tracking-wide">In-text</p>
            <p className="text-xs skc-navy skc-mono">{inText}</p>
          </div>
          <div>
            <p className="text-3xs skc-teal skc-body font-medium mb-0.5 uppercase tracking-wide">Reference list</p>
            <p className="text-xs skc-navy skc-body leading-snug">{reference}</p>
          </div>
        </div>

        <button onClick={addToList} className="flex items-center justify-center gap-1 w-full py-2 rounded-lg skc-bg-tealtint skc-teal text-xs font-semibold skc-body">
          <Plus size={13} /> Add to reference list
        </button>
      </div>

      {sortedList.length > 0 && (
        <div className="skc-card p-4">
          <p className="text-3xs skc-muted skc-body mb-2 uppercase tracking-wide font-medium">
            Reference list ({sortedList.length}) — alphabetised
          </p>
          <div className="space-y-2">
            {sortedList.map((r) => (
              <div key={r.id} className="flex items-start justify-between gap-2 skc-divider pb-2">
                <p className="text-2xs skc-navy skc-body leading-snug">{buildCitation(r.style, r).reference}</p>
                <button onClick={() => removeFromList(r.id)} aria-label="Remove reference">
                  <Trash2 size={12} className="skc-muted flex-shrink-0" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
