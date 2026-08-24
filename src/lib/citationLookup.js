function formatCrossrefAuthors(authorList) {
  if (!Array.isArray(authorList) || authorList.length === 0) return 'Unknown';
  return authorList
    .map((a) => {
      const family = a.family || '';
      const given = a.given || '';
      const initials = given
        .split(/\s+/)
        .filter(Boolean)
        .map((n) => n[0].toUpperCase() + '.')
        .join(' ');
      return family ? `${family}, ${initials}`.trim() : given;
    })
    .join('; ');
}

export async function lookupDoi(doiRaw) {
  const doi = doiRaw.trim().replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
  const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  if (!res.ok) throw new Error(res.status === 404 ? 'No record found for that DOI.' : 'Crossref lookup failed.');
  const json = await res.json();
  const msg = json.message;
  const year =
    msg?.published?.['date-parts']?.[0]?.[0] ??
    msg?.['published-print']?.['date-parts']?.[0]?.[0] ??
    msg?.['published-online']?.['date-parts']?.[0]?.[0] ??
    '';
  return {
    author: formatCrossrefAuthors(msg?.author),
    year: year ? String(year) : '',
    title: msg?.title?.[0] || '',
    source: msg?.['container-title']?.[0] || msg?.publisher || '',
  };
}

async function fetchOpenLibraryAuthorName(key) {
  try {
    const res = await fetch(`https://openlibrary.org${key}.json`);
    if (!res.ok) return null;
    const json = await res.json();
    return json.name || null;
  } catch {
    return null;
  }
}

export async function lookupIsbn(isbnRaw) {
  const isbn = isbnRaw.trim().replace(/[-\s]/g, '');
  const res = await fetch(`https://openlibrary.org/isbn/${encodeURIComponent(isbn)}.json`);
  if (!res.ok) throw new Error(res.status === 404 ? 'No record found for that ISBN.' : 'Open Library lookup failed.');
  const json = await res.json();

  let authorNames = [];
  if (Array.isArray(json.authors) && json.authors.length > 0) {
    const names = await Promise.all(json.authors.map((a) => fetchOpenLibraryAuthorName(a.key)));
    authorNames = names.filter(Boolean);
  }

  const year = (json.publish_date || '').match(/\d{4}/)?.[0] || json.publish_date || '';

  return {
    author: authorNames.length > 0 ? authorNames.join('; ') : 'Unknown',
    year,
    title: json.title || '',
    source: (json.publishers && json.publishers[0]) || '',
  };
}
