import { useState } from 'react';
import {
  Moon, Sun, Mail, Share2, RotateCcw, ChevronRight, ExternalLink,
  CheckCircle2, Lock, Bug, Lightbulb, Star, MessageCircle,
  Library, Database, FileText, LayoutGrid, CalendarDays, Phone,
} from 'lucide-react';
import { Flag, Row, FeedbackRow } from '../components/shared';
import {
  FOUNDER_STORY_PARAGRAPHS, FOUNDER_SIGNATURE, INSTITUTIONS, institutionsForCountry, FUNDING_BODIES,
  resourcesForInstitution,
  CONTACT_FORM_URL, REPORT_PROBLEM_FORM_URL, SUGGEST_FEATURE_FORM_URL, RATE_FORM_URL,
  WHATSAPP_CHANNEL_URL,
} from '../data/constants';

export default function ProfileScreen({ country, theme, setTheme, onReplayOnboarding, seenTeaser, profile }) {
  const [storyOpen, setStoryOpen] = useState(false);
  const [shared, setShared] = useState(false);
  const countries = ['Eswatini', 'Botswana', 'South Africa', 'Lesotho', 'Zambia'];

  const handleShare = async () => {
    const shareData = {
      title: 'StudentKitCo.',
      text: "Scholarships, internships, events and everyday student admin — filtered down to what's actually relevant to you.",
      url: 'https://studentkitco.app',
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      if (navigator.clipboard) await navigator.clipboard.writeText(shareData.url);
    } catch (e) {
      // user cancelled share or clipboard unavailable — no-op
    }
    setShared(true);
    setTimeout(() => setShared(false), 1500);
  };

  const header = (
    <div className="flex items-center justify-between" key="header">
      <h1 className="text-lg font-semibold skc-navy skc-display">Profile</h1>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="skc-card p-2 flex items-center justify-center" aria-label="Toggle theme">
        {theme === 'light' ? <Moon size={15} className="skc-teal" /> : <Sun size={15} className="skc-teal" />}
      </button>
    </div>
  );

  const personalCard = (
    <div className="skc-card p-4" key="personal">
      <p className="text-3xs skc-muted skc-body mb-2 uppercase tracking-wide font-medium">Personal</p>
      <Row label="Name" value={profile.name || '—'} />
      <Row label="Preferred name" value={profile.nickname || 'Same as name'} />
      <Row label="Date of birth" value={profile.dob || 'Not set'} />
      <Row label="Nationality" value={profile.nationality || 'Not set'} />
      <Row label="Gender" value={profile.gender || 'Not set'} />
    </div>
  );

  const academicCard = (
    <div className="skc-card p-4" key="academic">
      <p className="text-3xs skc-muted skc-body mb-2 uppercase tracking-wide font-medium">Academic details</p>
      <Row label="Institution" value={profile.institution} />
      <Row label="Programme" value={profile.programme || '—'} />
      <Row label="Study level" value={profile.level} />
      <div className="flex flex-wrap gap-1.5 mt-2">
        {profile.interests.length > 0 ? (
          profile.interests.map((t) => (
            <span key={t} className="text-3xs px-2 py-1 rounded-full skc-bg-tealtint skc-teal skc-body font-medium">{t}</span>
          ))
        ) : (
          <span className="text-2xs skc-muted skc-body">No interests set yet</span>
        )}
      </div>
    </div>
  );

  const currentInstitution = INSTITUTIONS.find((i) => i.name === profile.institution);
  const handbookUrl = currentInstitution?.handbookUrl;
  const handbookLabel = currentInstitution?.handbookLabel;
  const resources = resourcesForInstitution(profile.institution);

  const ResourceRow = ({ icon: Icon, resource }) =>
    resource ? (
      <a
        href={resource.url}
        target="_blank"
        rel="noreferrer"
        className="skc-divider flex items-center justify-between py-2"
        style={{ textDecoration: 'none' }}
      >
        <div className="flex items-center gap-2">
          <Icon size={14} className="skc-teal" />
          <span className="text-xs skc-navy skc-body">{resource.label}</span>
        </div>
        <ExternalLink size={13} className="skc-muted" />
      </a>
    ) : (
      <div className="skc-divider flex items-center gap-2 py-2">
        <Icon size={14} className="skc-lock" />
        <span className="text-2xs skc-muted skc-body italic">Not publicly available — check with your department</span>
      </div>
    );

  const courseCard = resources ? (
    <div className="skc-card p-4" key="course">
      <p className="text-3xs skc-muted skc-body mb-1 uppercase tracking-wide font-medium">My University</p>
      <p className="text-2xs skc-muted skc-body mb-2">
        Direct links to {profile.institution}'s official systems — verified, not guessed.
      </p>
      <ResourceRow icon={Library} resource={resources.library} />
      <ResourceRow icon={Database} resource={resources.eResources} />
      <ResourceRow icon={FileText} resource={resources.pastPapers} />
      <ResourceRow icon={LayoutGrid} resource={resources.studentPortal} />
      <ResourceRow icon={CalendarDays} resource={resources.academicCalendar} />
      <ResourceRow icon={Phone} resource={resources.contacts} />
      {resources.accessNote && (
        <p className="text-2xs skc-muted skc-body italic mt-2">ℹ️ {resources.accessNote}</p>
      )}
    </div>
  ) : (
    <div className="skc-card p-4" key="course">
      <p className="text-3xs skc-muted skc-body mb-1 uppercase tracking-wide font-medium">Course structure</p>
      <p className="text-2xs skc-muted skc-body mb-2">
        Looking for your full year-by-year course list? We link you straight to the official source rather than guessing.
      </p>
      {handbookUrl ? (
        <a
          href={handbookUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between"
          style={{ textDecoration: 'none' }}
        >
          <span className="text-xs skc-navy skc-body font-medium">{handbookLabel}</span>
          <ExternalLink size={14} className="skc-muted" />
        </a>
      ) : (
        <p className="text-2xs skc-muted skc-body italic">
          We don't have an official link for "{profile.institution || 'this institution'}" yet — check with your faculty office for the current handbook.
        </p>
      )}
    </div>
  );

  const countryCard = (
    <div className="skc-card p-4" key="country">
      <p className="text-3xs skc-muted skc-body mb-2 uppercase tracking-wide font-medium">Country</p>
      {countries.map((c) => (
        <div key={c} className="flex items-center justify-between py-1">
          <span className="text-sm skc-body font-medium flex items-center gap-1.5" style={{ color: c === country ? 'var(--ink)' : 'var(--lock-text)' }}>
            <Flag country={c} style={{ width: 15, height: 11, borderRadius: 2 }} />
            {c}
          </span>
          {c === country ? (
            <CheckCircle2 size={16} className="skc-teal" />
          ) : (
            <span className="text-3xs flex items-center gap-1 px-2 py-0.5 rounded-full skc-bg-lock skc-text-lock font-medium skc-body">
              <Lock size={9} /> Coming soon
            </span>
          )}
        </div>
      ))}
    </div>
  );

  const funding = FUNDING_BODIES[country];
  const fundingCard = funding ? (
    <div className="skc-card p-4" key="funding">
      <p className="text-3xs skc-muted skc-body mb-1 uppercase tracking-wide font-medium">Tertiary Funding</p>
      <p className="text-xs skc-navy skc-body font-medium mb-1">{funding.name}</p>
      <p className="text-2xs skc-muted skc-body mb-2">{funding.description}</p>
      <a
        href={funding.url}
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-between"
        style={{ textDecoration: 'none' }}
      >
        <span className="text-xs skc-teal skc-body font-medium">Visit official site</span>
        <ExternalLink size={14} className="skc-muted" />
      </a>
    </div>
  ) : null;

  const feedbackCard = (
    <div className="skc-card p-4" key="feedback">
      <p className="text-3xs skc-muted skc-body mb-1 uppercase tracking-wide font-medium">Feedback</p>
      <FeedbackRow icon={Bug} label="Report a problem" href={REPORT_PROBLEM_FORM_URL} />
      <FeedbackRow icon={Lightbulb} label="Suggest a feature" href={SUGGEST_FEATURE_FORM_URL} />
      <FeedbackRow icon={Star} label="Rate this" href={RATE_FORM_URL} />
    </div>
  );

  const aboutCard = (
    <div className="skc-card p-4" key="about">
      <p className="text-3xs skc-muted skc-body mb-2 uppercase tracking-wide font-medium">About StudentKitCo.</p>
      <p className="text-xs skc-navy skc-body leading-relaxed mb-1">
        {FOUNDER_STORY_PARAGRAPHS[0]}
      </p>
      {storyOpen && (
        <div className="space-y-2 mb-1">
          {FOUNDER_STORY_PARAGRAPHS.slice(1).map((para, i) => (
            <p key={i} className="text-xs skc-muted skc-body leading-relaxed">{para}</p>
          ))}
        </div>
      )}
      <button onClick={() => setStoryOpen(!storyOpen)} className="text-2xs skc-teal skc-body font-medium mb-2">
        {storyOpen ? 'Show less' : 'Read the full story'}
      </button>
      <p className="text-xs italic skc-navy skc-body">"Built by a student, for students."</p>
      <p className="text-xs skc-teal skc-display font-semibold mb-2">{FOUNDER_SIGNATURE}</p>

      <FeedbackRow icon={Mail} label="Contact the developer" href={CONTACT_FORM_URL} />
      <div className="skc-divider flex items-center justify-between py-2" onClick={handleShare} style={{ cursor: 'pointer' }}>
        <div className="flex items-center gap-2">
          <Share2 size={14} className="skc-teal" />
          <span className="text-xs skc-navy skc-body">{shared ? 'Link copied!' : 'Share StudentKitCo. with a friend'}</span>
        </div>
        <ChevronRight size={14} className="skc-muted" />
      </div>
      <div className="flex items-center justify-between py-2" onClick={onReplayOnboarding} style={{ cursor: 'pointer' }}>
        <div className="flex items-center gap-2">
          <RotateCcw size={14} className="skc-teal" />
          <span className="text-xs skc-navy skc-body">View onboarding again</span>
        </div>
        <ChevronRight size={14} className="skc-muted" />
      </div>

      <a
        href={WHATSAPP_CHANNEL_URL}
        target="_blank"
        rel="noreferrer"
        className="mt-3 skc-bg-tealtint rounded-xl p-3 flex items-center justify-between"
        style={{ textDecoration: 'none' }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle size={15} className="skc-teal" />
          <span className="text-xs skc-navy skc-body font-medium">Join the WhatsApp Channel</span>
        </div>
        <ChevronRight size={15} className="skc-teal" />
      </a>
    </div>
  );

  const orderedCards = seenTeaser
    ? [aboutCard, personalCard, academicCard, courseCard, countryCard, ...(fundingCard ? [fundingCard] : []), feedbackCard]
    : [personalCard, academicCard, courseCard, countryCard, ...(fundingCard ? [fundingCard] : []), feedbackCard, aboutCard];

  return (
    <div className="p-4 space-y-3">
      {header}
      {orderedCards}
    </div>
  );
}
