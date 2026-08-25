export const FLAG_CODES = {
  Eswatini: 'sz',
  Botswana: 'bw',
  'South Africa': 'za',
  Lesotho: 'ls',
  Zambia: 'zm',
};

export const PROGRAMME_INTEREST_MAP = [
  { key: 'geomatics', keywords: ['geomatics', 'survey', 'gis', 'geospatial'], tags: ['GIS', 'Remote Sensing', 'Smart Cities', 'Environmental Management'] },
  { key: 'tech', keywords: ['computer', 'software', 'information technology', 'programming'], tags: ['Technology', 'AI', 'Software Development', 'Data Science'] },
  { key: 'finance', keywords: ['finance', 'accounting', 'economics', 'business'], tags: ['Finance', 'Entrepreneurship', 'Economics'] },
  { key: 'health', keywords: ['medicine', 'health', 'nursing', 'pharmacy', 'medical', 'laboratory', 'lab science', 'radiography'], tags: ['Health', 'Research'] },
  { key: 'engineering', keywords: ['engineering', 'civil', 'mechanical', 'electrical'], tags: ['Engineering', 'Technology', 'Infrastructure'] },
  { key: 'agriculture', keywords: ['agriculture', 'agric'], tags: ['Agriculture', 'Environmental Management'] },
  { key: 'law', keywords: ['law'], tags: ['Law', 'Policy'] },
  { key: 'education', keywords: ['education', 'teaching'], tags: ['Education', 'Youth Development'] },
];

/** Returns the first matching category key for a programme string, or null if nothing matches. */
export function categoryForProgramme(programme) {
  const p = (programme || '').toLowerCase();
  const match = PROGRAMME_INTEREST_MAP.find((row) => row.keywords.some((k) => p.includes(k)));
  return match ? match.key : null;
}

export const OPPORTUNITY_SAMPLES = {
  geomatics: [
    { category: 'Internship', title: 'GIS Intern — Eswatini Water Services Corporation', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 92 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
    { category: 'Event', title: 'Smart Cities & Geospatial Tech Conference — Mbabane', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 85 },
  ],
  health: [
    { category: 'Internship', title: 'Laboratory Intern — Eswatini Ministry of Health', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Health Sciences Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 80 },
    { category: 'Event', title: 'Public Health & Diagnostics Symposium — Manzini', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
  ],
  tech: [
    { category: 'Internship', title: 'Software Development Intern — Royal Science & Technology Park', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 91 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — ICT Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 79 },
    { category: 'Event', title: 'Eswatini Tech & Innovation Summit — Mbabane', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 86 },
  ],
  finance: [
    { category: 'Internship', title: 'Finance Intern — Central Bank of Eswatini', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Business & Finance Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
    { category: 'Event', title: 'Young Entrepreneurs & Finance Forum — Manzini', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 83 },
  ],
  engineering: [
    { category: 'Internship', title: 'Engineering Intern — Eswatini Electricity Company', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Engineering Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
    { category: 'Event', title: 'Infrastructure & Engineering Careers Expo — Mbabane', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
  ],
  agriculture: [
    { category: 'Internship', title: 'Agricultural Extension Intern — Ministry of Agriculture', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Agriculture Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
    { category: 'Event', title: 'Sustainable Agriculture & Food Security Forum — Luyengo', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
  ],
  law: [
    { category: 'Internship', title: 'Legal Intern — Eswatini High Court', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Law Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
    { category: 'Event', title: 'Law & Governance Careers Dialogue — Mbabane', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 81 },
  ],
  education: [
    { category: 'Internship', title: 'Teaching Practicum Placement — Ministry of Education and Training', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Education Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
    { category: 'Event', title: 'Future Educators Conference — Nhlangano', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
  ],
  general: [
    { category: 'Internship', title: 'Graduate Internship Programme — Public Service Commission', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 85 },
    { category: 'Scholarship', title: 'Eswatini National Scholarship — Undergraduate Renewal', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 75 },
    { category: 'Event', title: 'National Student Careers Fair — Mbabane', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 80 },
  ],
};

export const ALL_INTERESTS = [
  'GIS', 'Remote Sensing', 'Smart Cities', 'Environmental Management', 'Technology', 'AI',
  'Software Development', 'Data Science', 'Finance', 'Entrepreneurship', 'Economics', 'Health',
  'Research', 'Engineering', 'Infrastructure', 'Agriculture', 'Law', 'Policy', 'Education', 'Youth Development',
];

export function suggestedInterestsFor(programme) {
  const p = (programme || '').toLowerCase();
  const matched = PROGRAMME_INTEREST_MAP.filter((row) => row.keywords.some((k) => p.includes(k)));
  return [...new Set(matched.flatMap((m) => m.tags))];
}

export const REPORT_STRUCTURES = {
  Assignment: ['Introduction', 'Body', 'Conclusion', 'References'],
  'Practical / Field Report': ['Cover Page', 'Introduction', 'Site / Field Description', 'Methodology', 'Observations', 'Discussion', 'Conclusion', 'References', 'Appendices'],
  'Lab Report': ['Cover Page', 'Abstract', 'Introduction', 'Methodology', 'Results', 'Discussion', 'Conclusion', 'References', 'Appendices'],
  'Research Proposal': ['Cover Page', 'Introduction', 'Problem Statement', 'Literature Review', 'Methodology', 'Expected Outcomes', 'References'],
  'Research Report': ['Cover Page', 'Declaration', 'Abstract', 'Table of Contents', 'Introduction', 'Literature Review', 'Methodology', 'Results', 'Discussion', 'Conclusion', 'References', 'Appendices'],
  'Internship Report': ['Cover Page', 'Declaration', 'Acknowledgements', 'Executive Summary', 'Introduction', 'Company Overview', 'Duties & Responsibilities', 'Skills Gained', 'Conclusion', 'References', 'Appendices'],
  'Final-Year Project': ['Cover Page', 'Declaration', 'Abstract', 'Table of Contents', 'List of Figures', 'Introduction', 'Literature Review', 'Methodology', 'Results', 'Discussion', 'Conclusion', 'References', 'Appendices'],
};

export const FOUNDER_SIGNATURE = '— Mlibatisi Dlamini (2026) ©';

export const INSTITUTIONS = [
  { name: 'University of Eswatini', handbookUrl: 'https://www.uneswa.ac.sz', handbookLabel: 'UNESWA Official Handbook' },
  { name: 'Limkokwing University (Eswatini)', handbookUrl: 'https://www.limkokwing.net/eswatini/', handbookLabel: 'Limkokwing Eswatini — Official Site' },
  { name: 'Eswatini Medical Christian University', handbookUrl: 'https://emcu.ac.sz', handbookLabel: 'EMCU Official Site' },
  { name: 'Southern Africa Nazarene University (SANU)', handbookUrl: 'https://www.sanu.ac.sz', handbookLabel: 'SANU Official Site' },
  { name: 'William Pitcher College', handbookUrl: 'https://www.wpc.ac.sz', handbookLabel: 'William Pitcher College — Official Site' },
  { name: 'Eswatini College of Technology (ECOT)', handbookUrl: 'https://www.ecot.ac.sz', handbookLabel: 'ECOT Official Site' },
  { name: 'Gwamile VOCTIM', handbookUrl: 'https://gwamilevoctim.ac.sz', handbookLabel: 'Gwamile VOCTIM — Official Site' },
  { name: 'Ngwane Training College', handbookUrl: 'https://ngwanecollege.org', handbookLabel: 'Ngwane Training College — Official Site' },
  { name: 'Other', handbookUrl: null, handbookLabel: null },
];

// TODO: replace these three with the real Google Form links once created.
export const CONTACT_FORM_URL = 'https://forms.google.com/REPLACE_WITH_CONTACT_FORM';
export const REPORT_PROBLEM_FORM_URL = 'https://forms.google.com/REPLACE_WITH_REPORT_PROBLEM_FORM';
export const SUGGEST_FEATURE_FORM_URL = 'https://forms.google.com/REPLACE_WITH_SUGGEST_FEATURE_FORM';
export const RATE_FORM_URL = 'https://forms.google.com/REPLACE_WITH_RATE_FORM';

export const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8XUWbADTOBMrhjqz11';

export const FOUNDER_TEASER =
  "I built StudentKitCo. because too many good opportunities were reaching students too late, or not at all.";

export const FOUNDER_STORY_PARAGRAPHS = [
  "I built StudentKitCo. because too many good opportunities were reaching students too late, or not at all. I still remember finding the MEXT Japan scholarship two weeks before its deadline — barely enough time to gather what it needed, let alone do it justice. It wasn't the first time either. Many opportunities weren't even open to Swati students, and the ones that were stayed scattered, always another site to check, another list to keep.",
  "Beyond opportunities, the daily student problems piled up too — budgeting apps I'd abandon within weeks, no simple way to track my grades and know where I stood before it mattered, and during my final year research, more time lost wading through irrelevant papers than spent on the actual work.",
  "And underneath all of it is a harder truth: the job market isn't opening up for us the way it used to. Opportunities are scarcer, so we can't just graduate and hope — we need to be ready for the industry before it's ready for us, coming out with the skills to solve real problems, not just to be hired for a role. Knowing exactly which skills align with your own programme — not generic advice, but what actually sets you apart from everyone graduating alongside you — is part of that readiness. I didn't struggle much finding internships myself, but I've seen how draining that search can be for others — one more thing that shouldn't be this hard to find.",
  "StudentKitCo. is what I wish I'd had — a filter for the opportunities that actually apply to you, a place to keep your grades, budget and deadlines from slipping through the cracks, and a way to build the reports and citations that once cost me hours I didn't have to spare. As it grows, it becomes more than a toolkit — a way to know what the industry expects before you get there, and to find people who share your interests and can help you get ready for it. Not every opportunity is open to us. So we make the most of the ones that are, build real skill while we do, and become the kind of leaders who don't need to be handed a seat at the table to make an impact.",
];
