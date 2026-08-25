import { useState } from 'react';
import { Pill, OpportunityCard } from '../components/shared';
import { OPPORTUNITY_SAMPLES, categoryForProgramme } from '../data/constants';

export default function OpportunitiesScreen({ profile, country }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Scholarships', 'Internships', 'Events'];

  const programme = profile?.programme || 'your programme';
  const topInterest = profile?.interests?.[0];
  const interestPhrase = topInterest ? ` and ${topInterest} interest` : '';

  const category = categoryForProgramme(profile?.programme) || 'general';
  const countrySet = OPPORTUNITY_SAMPLES[country] || OPPORTUNITY_SAMPLES.Eswatini;
  const baseSet = countrySet[category] || countrySet.general;

  const opportunities = [
    { ...baseSet[0], why: `Matches ${programme}${interestPhrase}` },
    { ...baseSet[1], why: `Based on your country${profile?.level ? ` and ${profile.level.toLowerCase()}` : ' and study level'}` },
    { ...baseSet[2], why: `Relevant to ${programme}, with networking opportunities` },
  ];

  const categoryMap = { Scholarships: 'Scholarship', Internships: 'Internship', Events: 'Event' };
  const visible = filter === 'All' ? opportunities : opportunities.filter((o) => o.category === categoryMap[filter]);

  return (
    <div className="p-4 space-y-3">
      <h1 className="text-lg font-semibold skc-navy skc-display">Opportunities</h1>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>
        ))}
      </div>

      {visible.map((o) => (
        <OpportunityCard key={o.title} {...o} />
      ))}

      {visible.length === 0 && (
        <p className="text-xs skc-muted skc-body text-center py-6">
          No {filter.toLowerCase()} to show right now — check back soon.
        </p>
      )}

      <p className="text-3xs skc-muted skc-body text-center pt-1">
        Sample listings shown for illustration — a live, filtered feed is on the roadmap.
      </p>
    </div>
  );
}
