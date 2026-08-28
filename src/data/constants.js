export const CURRENCIES = {
  Eswatini: { code: 'SZL', symbol: 'E', name: 'Lilangeni' },
  Botswana: { code: 'BWP', symbol: 'P', name: 'Pula' },
  'South Africa': { code: 'ZAR', symbol: 'R', name: 'Rand' },
  Lesotho: { code: 'LSL', symbol: 'M', name: 'Loti' },
  Zambia: { code: 'ZMW', symbol: 'K', name: 'Kwacha' },
};

export function currencyForCountry(country) {
  return CURRENCIES[country] || { code: '', symbol: 'E', name: '' };
}

export const FLAG_CODES = {
  Eswatini: 'sz',
  Botswana: 'bw',
  'South Africa': 'za',
  Lesotho: 'ls',
  Zambia: 'zm',
};

export const PROGRAMME_INTEREST_MAP = [
  {
    key: 'geomatics',
    keywords: ['geomatics', 'survey', 'surveying', 'gis', 'geospatial', 'geodesy', 'geoinformatics', 'cartography', 'remote sensing', 'land administration'],
    tags: ['GIS', 'Remote Sensing', 'Smart Cities', 'Environmental Management'],
  },
  {
    key: 'tech',
    keywords: ['computer', 'computing', 'software', 'information technology', 'informatics', 'programming', 'data science', 'artificial intelligence', 'cyber security', 'cybersecurity', 'ict', 'computer science'],
    tags: ['Technology', 'AI', 'Software Development', 'Data Science'],
  },
  {
    key: 'engineering',
    keywords: ['engineering', 'civil engineering', 'mechanical', 'electrical', 'chemical engineering', 'industrial engineering', 'mechatronic', 'mining engineering', 'electronic engineering'],
    tags: ['Engineering', 'Technology', 'Infrastructure'],
  },
  {
    key: 'health',
    keywords: ['medicine', 'medical', 'health', 'nursing', 'pharmacy', 'pharmaceutical', 'laboratory', 'lab science', 'biomedical', 'radiography', 'physiotherapy', 'public health', 'dentistry', 'veterinary', 'clinical'],
    tags: ['Health', 'Research'],
  },
  {
    key: 'finance',
    keywords: ['finance', 'financial', 'accounting', 'accountancy', 'economics', 'economic', 'business administration', 'business management', 'commerce', 'banking', 'entrepreneurship'],
    tags: ['Finance', 'Entrepreneurship', 'Economics'],
  },
  {
    key: 'agriculture',
    keywords: ['agriculture', 'agric', 'agronomy', 'horticulture', 'crop science', 'animal science', 'wildlife', 'natural resources', 'natural resource management', 'range management'],
    tags: ['Agriculture', 'Environmental Management'],
  },
  {
    key: 'law',
    keywords: ['law', 'llb', 'legal studies'],
    tags: ['Law', 'Policy'],
  },
  {
    key: 'education',
    keywords: ['education', 'teaching', 'pedagogy'],
    tags: ['Education', 'Youth Development'],
  },
  {
    key: 'architecture',
    keywords: ['architecture', 'urban planning', 'urban and regional planning', 'built environment', 'quantity survey'],
    tags: ['Smart Cities', 'Infrastructure', 'Design'],
  },
  {
    key: 'environment',
    keywords: ['environmental science', 'environmental management', 'ecology', 'climate science'],
    tags: ['Environmental Management', 'Research'],
  },
  {
    key: 'social',
    keywords: ['sociology', 'social work', 'psychology', 'political science', 'public administration', 'human resource', 'development studies'],
    tags: ['Policy', 'Youth Development', 'Research'],
  },
  {
    key: 'media',
    keywords: ['journalism', 'mass communication', 'media studies', 'communication studies', 'public relations', 'marketing'],
    tags: ['Technology', 'Entrepreneurship', 'Youth Development'],
  },
  {
    key: 'science',
    keywords: ['biology', 'chemistry', 'physics', 'mathematics', 'statistics', 'biological science', 'life science'],
    tags: ['Research', 'Data Science', 'Technology'],
  },
  {
    key: 'hospitality',
    keywords: ['tourism', 'hospitality', 'hotel management'],
    tags: ['Entrepreneurship', 'Youth Development'],
  },
];

/** Whole-word/phrase match so short keywords like "law" don't false-positive inside unrelated words. */
function textContainsKeyword(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
}

/** Returns the first matching category key for a programme string, or null if nothing matches. */
export function categoryForProgramme(programme) {
  const p = programme || '';
  const match = PROGRAMME_INTEREST_MAP.find((row) => row.keywords.some((k) => textContainsKeyword(p, k)));
  return match ? match.key : null;
}

export const OPPORTUNITY_SAMPLES = {
  Eswatini: {
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
  },
  Botswana: {
    geomatics: [
      { category: 'Internship', title: 'GIS & Surveying Intern — Department of Surveys and Mapping', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 92 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Geomatics & Surveying', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
      { category: 'Event', title: 'Smart Cities & Land Administration Forum — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 85 },
    ],
    health: [
      { category: 'Internship', title: 'Laboratory Intern — Ministry of Health, Botswana', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Health Sciences', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 80 },
      { category: 'Event', title: 'Public Health & Diagnostics Symposium — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
    ],
    tech: [
      { category: 'Internship', title: 'Software Development Intern — Botswana Innovation Hub', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 91 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — ICT & Computer Science', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 79 },
      { category: 'Event', title: 'Botswana Tech & Innovation Summit — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 86 },
    ],
    finance: [
      { category: 'Internship', title: 'Finance Intern — Bank of Botswana', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Business, Accounting & Finance', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
      { category: 'Event', title: 'Young Entrepreneurs & Finance Forum — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 83 },
    ],
    engineering: [
      { category: 'Internship', title: 'Engineering Intern — Botswana Power Corporation', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Engineering', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
      { category: 'Event', title: 'Infrastructure & Engineering Careers Expo — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
    ],
    agriculture: [
      { category: 'Internship', title: 'Agricultural Extension Intern — Ministry of Agriculture, Botswana', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Agriculture', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
      { category: 'Event', title: 'Sustainable Agriculture & Food Security Forum — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
    ],
    law: [
      { category: 'Internship', title: 'Legal Intern — Botswana High Court', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Law', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
      { category: 'Event', title: 'Law & Governance Careers Dialogue — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 81 },
    ],
    education: [
      { category: 'Internship', title: 'Teaching Practicum Placement — Ministry of Education and Skills Development', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Education', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
      { category: 'Event', title: 'Future Educators Conference — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
    ],
    general: [
      { category: 'Internship', title: 'Graduate Internship Programme — Directorate of Public Service Management', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 85 },
      { category: 'Scholarship', title: 'DTEF Sponsorship — Undergraduate', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 75 },
      { category: 'Event', title: 'National Student Careers Fair — Gaborone', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 80 },
    ],
  },
  'South Africa': {
    geomatics: [
      { category: 'Internship', title: 'GIS & Land Surveying Intern — Department of Rural Development and Land Reform', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 92 },
      { category: 'Scholarship', title: 'NSFAS Funding — Geomatics & Surveying', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
      { category: 'Event', title: 'Smart Cities & Geospatial Tech Conference — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 85 },
    ],
    health: [
      { category: 'Internship', title: 'Laboratory Intern — National Health Laboratory Service (NHLS)', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
      { category: 'Scholarship', title: 'NSFAS Funding — Health Sciences', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 80 },
      { category: 'Event', title: 'Public Health & Diagnostics Symposium — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
    ],
    tech: [
      { category: 'Internship', title: 'Software Development Intern — Cape Innovation and Technology Initiative (CiTi)', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 91 },
      { category: 'Scholarship', title: 'NSFAS Funding — ICT & Computer Science', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 79 },
      { category: 'Event', title: 'Cape Town Tech & Innovation Summit', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 86 },
    ],
    finance: [
      { category: 'Internship', title: 'Finance Intern — South African Reserve Bank', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
      { category: 'Scholarship', title: 'NSFAS Funding — Business, Accounting & Finance', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
      { category: 'Event', title: 'Young Entrepreneurs & Finance Forum — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 83 },
    ],
    engineering: [
      { category: 'Internship', title: 'Engineering Intern — Eskom', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 90 },
      { category: 'Scholarship', title: 'NSFAS Funding — Engineering', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 78 },
      { category: 'Event', title: 'Infrastructure & Engineering Careers Expo — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 84 },
    ],
    agriculture: [
      { category: 'Internship', title: 'Agricultural Extension Intern — Department of Agriculture, Land Reform and Rural Development', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
      { category: 'Scholarship', title: 'NSFAS Funding — Agriculture', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
      { category: 'Event', title: 'Sustainable Agriculture & Food Security Forum — Stellenbosch', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
    ],
    law: [
      { category: 'Internship', title: 'Legal Intern — Legal Aid South Africa', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 89 },
      { category: 'Scholarship', title: 'NSFAS Funding — Law', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 77 },
      { category: 'Event', title: 'Law & Governance Careers Dialogue — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 81 },
    ],
    education: [
      { category: 'Internship', title: 'Teaching Practicum Placement — Western Cape Education Department', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 88 },
      { category: 'Scholarship', title: 'Funza Lushaka Teacher Bursary (via NSFAS/DHET)', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 76 },
      { category: 'Event', title: 'Future Educators Conference — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 82 },
    ],
    general: [
      { category: 'Internship', title: 'Graduate Internship Programme — Public Service Commission', trust: 'Official', status: 'Closing Soon', statusType: 'warn', deadline: 'Closes 30 Aug', match: 85 },
      { category: 'Scholarship', title: 'NSFAS Funding — Undergraduate', trust: 'Verified', status: 'Open Now', statusType: 'success', deadline: 'Closes 15 Sept', match: 75 },
      { category: 'Event', title: 'National Student Careers Fair — Cape Town', trust: 'Community Submitted', status: 'Upcoming', statusType: 'lock', deadline: '12 Sept', match: 80 },
    ],
  },
};

export const ALL_INTERESTS = [
  'GIS', 'Remote Sensing', 'Smart Cities', 'Environmental Management', 'Technology', 'AI',
  'Software Development', 'Data Science', 'Finance', 'Entrepreneurship', 'Economics', 'Health',
  'Research', 'Engineering', 'Infrastructure', 'Agriculture', 'Law', 'Policy', 'Education',
  'Youth Development', 'Design',
];

export function suggestedInterestsFor(programme) {
  const p = programme || '';
  const matched = PROGRAMME_INTEREST_MAP.filter((row) => row.keywords.some((k) => textContainsKeyword(p, k)));
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

export const NATIONALITIES = [
  'Eswatini', 'Botswana', 'South Africa', 'Lesotho', 'Zambia',
  'Zimbabwe', 'Mozambique', 'Namibia', 'Malawi', 'Kenya',
  'Nigeria', 'Ghana', 'Tanzania', 'Uganda', 'India', 'China',
];

export const GENDER_OPTIONS = ['Female', 'Male', 'Non-binary', 'Prefer to self-describe', 'Prefer not to say'];

export const INSTITUTIONS = [
  // Eswatini
  { name: 'University of Eswatini', country: 'Eswatini', handbookUrl: 'https://www.uneswa.ac.sz', handbookLabel: 'UNESWA Official Handbook' },
  { name: 'Limkokwing University (Eswatini)', country: 'Eswatini', handbookUrl: 'https://www.limkokwing.net/eswatini/', handbookLabel: 'Limkokwing Eswatini — Official Site' },
  { name: 'Eswatini Medical Christian University', country: 'Eswatini', handbookUrl: 'https://emcu.ac.sz', handbookLabel: 'EMCU Official Site' },
  { name: 'Southern Africa Nazarene University (SANU)', country: 'Eswatini', handbookUrl: 'https://www.sanu.ac.sz', handbookLabel: 'SANU Official Site' },
  { name: 'William Pitcher College', country: 'Eswatini', handbookUrl: 'https://www.wpc.ac.sz', handbookLabel: 'William Pitcher College — Official Site' },
  { name: 'Eswatini College of Technology (ECOT)', country: 'Eswatini', handbookUrl: 'https://www.ecot.ac.sz', handbookLabel: 'ECOT Official Site' },
  { name: 'Gwamile VOCTIM', country: 'Eswatini', handbookUrl: 'https://gwamilevoctim.ac.sz', handbookLabel: 'Gwamile VOCTIM — Official Site' },
  { name: 'Ngwane Training College', country: 'Eswatini', handbookUrl: 'https://ngwanecollege.org', handbookLabel: 'Ngwane Training College — Official Site' },
  // Botswana
  { name: 'University of Botswana', country: 'Botswana', handbookUrl: 'https://www.ub.bw', handbookLabel: 'University of Botswana — Official Site' },
  { name: 'Ba Isago University', country: 'Botswana', handbookUrl: 'https://www.baisago.ac.bw', handbookLabel: 'Ba Isago University — Official Site' },
  { name: 'Botho University (Botswana)', country: 'Botswana', handbookUrl: 'https://www.bothouniversity.com/botswana', handbookLabel: 'Botho University Botswana — Official Site' },
  { name: 'Botswana International University of Science and Technology (BIUST)', country: 'Botswana', handbookUrl: 'https://www.biust.ac.bw', handbookLabel: 'BIUST — Official Site' },
  { name: 'Limkokwing University (Botswana)', country: 'Botswana', handbookUrl: 'https://www.limkokwing.net/botswana-join', handbookLabel: 'Limkokwing Botswana — Official Site' },
  { name: 'Botswana Accountancy College (BAC)', country: 'Botswana', handbookUrl: 'https://bac.ac.bw', handbookLabel: 'BAC (Botswana School of Business Sciences) — Official Site' },
  { name: 'Imperial School of Business and Science (ISBS)', country: 'Botswana', handbookUrl: 'https://www.isbs.ac.bw', handbookLabel: 'ISBS — Official Site' },
  // South Africa
  { name: 'University of Cape Town', country: 'South Africa', handbookUrl: 'https://uct.ac.za', handbookLabel: 'University of Cape Town — Official Site' },
  // Available for any country
  { name: 'Other', country: null, handbookUrl: null, handbookLabel: null },
];

export function institutionsForCountry(country) {
  return INSTITUTIONS.filter((i) => i.country === country || i.country === null);
}

// Verified, hand-researched per institution. Every URL here has been checked to actually
// lead to the right official page. Institutions not listed here fall back to the simpler
// Course Structure link instead of a broken/guessed resource hub.
export const UNIVERSITY_RESOURCES = {
  'University of Botswana': {
    library: { url: 'https://linyanti.ub.bw/', label: 'UB Library Portal' },
    eResources: { url: 'https://ub-bw.libguides.com/general', label: 'UB Library Databases & Subject Guides' },
    pastPapers: null,
    studentPortal: { url: 'https://www.ub.bw/study/how-register', label: 'Student Registration & Portal Access' },
    academicCalendar: { url: 'https://www.ub.bw/node/1659', label: 'UB Academic Calendar' },
    contacts: { url: 'https://www.ub.bw/', label: 'UB Website — Contacts & Student Services' },
    accessNote: "You'll need your UB Student ID and password to log into the Student Administration System and most portals.",
  },
  'University of Eswatini': {
    library: { url: 'https://www.library.uneswa.ac.sz/', label: 'UNESWA Library Portal' },
    eResources: { url: 'http://www.library.uneswa.ac.sz/databases.html', label: 'UNESWA E-Resources & Databases' },
    pastPapers: { url: 'https://www.library.uneswa.ac.sz/pastpapers/', label: 'UNESWA Past Exam Papers Archive' },
    studentPortal: { url: 'https://sis.uneswa.ac.sz/', label: 'UNESWA Student Information System' },
    academicCalendar: { url: 'https://www.uneswa.ac.sz/publications/', label: 'UNESWA Calendar & Publications' },
    contacts: { url: 'https://www.uneswa.ac.sz/students/student-services/', label: 'UNESWA Student Services' },
    accessNote: 'Most systems use your UNESWA student number. Off-campus access to some databases requires OpenAthens registration through the library.',
  },
  'Eswatini Medical Christian University': {
    library: { url: 'https://emcu.ac.sz/about-us/', label: 'EMCU Library Info' },
    eResources: null,
    pastPapers: null,
    studentPortal: { url: 'https://reg.emcu.ac.sz/home2/', label: 'myEMCU Student Portal' },
    academicCalendar: null,
    contacts: { url: 'https://emcu.ac.sz/', label: 'EMCU Main Site' },
    accessNote: 'New students: your User ID and password are both your Student Number. Continuing students use your Registration/Access Number for both.',
  },
  'University of Cape Town': {
    library: { url: 'https://lib.uct.ac.za', label: 'UCT Libraries' },
    eResources: { url: 'https://libguides.lib.uct.ac.za', label: 'UCT Library Subject Guides & Databases' },
    pastPapers: { url: 'https://amathuba.uct.ac.za', label: 'Amathuba (past papers are posted inside your individual course sites)' },
    studentPortal: { url: 'https://studentsonline.uct.ac.za', label: 'PeopleSoft Student Self-Service (registration, fees, results)' },
    academicCalendar: { url: 'https://uct.ac.za/academic-calendar', label: 'UCT Academic Calendar' },
    contacts: { url: 'https://uct.ac.za/students/student-systems-support/contact-centre', label: 'UCT Student Systems Support' },
    accessNote: "UCT retired Vula at the end of 2025. Course content now lives on Amathuba, and registration/fees/results are on PeopleSoft — both use your UCT username and network password.",
  },
};

export function resourcesForInstitution(institution) {
  return UNIVERSITY_RESOURCES[institution] || null;
}

export const FUNDING_BODIES = {
  Botswana: {
    name: 'Department of Tertiary Education Financing (DTEF)',
    description: 'Handles government sponsorship, loans and grants for Botswana citizens in tertiary education.',
    url: 'https://tef.gov.bw',
  },
  'South Africa': {
    name: 'National Student Financial Aid Scheme (NSFAS)',
    description: 'South African government bursary and loan scheme funding undergraduate study for eligible students at public universities and TVET colleges.',
    url: 'https://www.nsfas.org.za',
  },
};

export const CONTACT_FORM_URL = 'https://forms.gle/EKBdjwtoj8AVXcGFA';
export const REPORT_PROBLEM_FORM_URL = 'https://forms.gle/5XtfGXM4yNSwsidy7';
export const SUGGEST_FEATURE_FORM_URL = 'https://forms.gle/TiKBcekSLBBEB7QS8';
export const RATE_FORM_URL = 'https://forms.gle/R9g5AyyghEXdCmrP7';

export const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8XUWbADTOBMrhjqz11';

export const FOUNDER_TEASER =
  "I built StudentKitCo. because too many good opportunities were reaching students too late, or not at all.";

export const FOUNDER_STORY_PARAGRAPHS = [
  "I built StudentKitCo. because too many good opportunities were reaching students too late, or not at all. I still remember finding the MEXT Japan scholarship two weeks before its deadline — barely enough time to gather what it needed, let alone do it justice. It wasn't the first time either. Many opportunities weren't even open to Swati students, and the ones that were stayed scattered, always another site to check, another list to keep.",
  "Beyond opportunities, the daily student problems piled up too — budgeting apps I'd abandon within weeks, no simple way to track my grades and know where I stood before it mattered, and during my final year research, more time lost wading through irrelevant papers than spent on the actual work.",
  "And underneath all of it is a harder truth: the job market isn't opening up for us the way it used to. Opportunities are scarcer, so we can't just graduate and hope — we need to be ready for the industry before it's ready for us, coming out with the skills to solve real problems, not just to be hired for a role. Knowing exactly which skills align with your own programme — not generic advice, but what actually sets you apart from everyone graduating alongside you — is part of that readiness. I didn't struggle much finding internships myself, but I've seen how draining that search can be for others — one more thing that shouldn't be this hard to find.",
  "StudentKitCo. is what I wish I'd had — a filter for the opportunities that actually apply to you, a place to keep your grades, budget and deadlines from slipping through the cracks, and a way to build the reports and citations that once cost me hours I didn't have to spare. As it grows, it becomes more than a toolkit — a way to know what the industry expects before you get there, and to find people who share your interests and can help you get ready for it. Not every opportunity is open to us. So we make the most of the ones that are, build real skill while we do, and become the kind of leaders who don't need to be handed a seat at the table to make an impact.",
];
