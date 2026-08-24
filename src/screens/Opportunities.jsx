import { useState } from 'react';
import { Pill, OpportunityCard } from '../components/shared';

export default function OpportunitiesScreen() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Scholarships', 'Internships', 'Events'];

  const opportunities = [
    {
      category: 'Internship',
      title: 'GIS Intern — Eswatini Water Services Corporation',
      trust: 'Official',
      status: 'Closing Soon',
      statusType: 'warn',
      deadline: 'Closes 30 Aug',
      match: 92,
      why: 'Matches your Geomatics programme and GIS interest',
    },
    {
      category: 'Scholarship',
      title: 'Eswatini National Scholarship — Undergraduate Renewal',
      trust: 'Verified',
      status: 'Open Now',
      statusType: 'success',
      deadline: 'Closes 15 Sept',
      match: 78,
      why: 'Based on your country and study level',
    },
    {
      category: 'Event',
      title: 'Smart Cities & Geospatial Tech Conference — Mbabane',
      trust: 'Community Submitted',
      status: 'Upcoming',
      statusType: 'lock',
      deadline: '12 Sept',
      match: 85,
      why: 'Relevant to your programme, with networking opportunities',
    },
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
    </div>
  );
}
