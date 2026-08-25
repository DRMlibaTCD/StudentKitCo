export function buildCitation(style, d) {
  const lastName = (d.author || '').split(',')[0] || d.author || 'Unknown';
  const referenceMap = {
    'APA 7': `${d.author} (${d.year}). ${d.title}. ${d.source}.`,
    Harvard: `${d.author} ${d.year}, ${d.title}, ${d.source}.`,
    IEEE: `${d.author}, "${d.title}," ${d.source}, ${d.year}.`,
    MLA: `${d.author}. "${d.title}." ${d.source}, ${d.year}.`,
    Chicago: `${d.author}. ${d.year}. ${d.title}. ${d.source}.`,
  };
  const inText =
    style === 'IEEE' ? '[1]' : style === 'MLA' ? `(${lastName})` : `(${lastName}, ${d.year})`;
  return { reference: referenceMap[style], inText };
}
