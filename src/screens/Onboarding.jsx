import { useState } from 'react';
import { Sparkles, CheckCircle2, Lock } from 'lucide-react';
import { Pill, Flag, Field } from '../components/shared';
import { ALL_INTERESTS, suggestedInterestsFor, FOUNDER_SIGNATURE } from '../data/constants';

export default function Onboarding({ onFinish, country, setCountry, profile, setProfile }) {
  const [step, setStep] = useState(0);
  const totalSteps = 6;
  const countries = [
    { name: 'Eswatini', available: true },
    { name: 'Botswana', available: false },
    { name: 'South Africa', available: false },
    { name: 'Lesotho', available: false },
    { name: 'Zambia', available: false },
  ];
  const institutions = ['University of Eswatini', 'Limkokwing University (Eswatini)', 'Eswatini Medical Christian University', 'Other'];
  const levels = ['First year', 'Second year', 'Third year', 'Final year', 'Postgraduate'];

  const toggleInterest = (tag) => {
    setProfile((p) => ({
      ...p,
      interests: p.interests.includes(tag) ? p.interests.filter((t) => t !== tag) : [...p.interests, tag],
    }));
  };

  const suggested = suggestedInterestsFor(profile.programme);
  const moreOptions = ALL_INTERESTS.filter((t) => !suggested.includes(t));

  return (
    <div className="flex-1 flex flex-col p-5 overflow-y-auto">
      <div className="flex items-center justify-between mb-5">
        <div className="flex gap-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className="rounded-full"
              style={{ width: 14, height: 4, background: i <= step ? 'var(--teal)' : 'var(--border)' }}
            ></span>
          ))}
        </div>
        {step < totalSteps - 1 && (
          <button onClick={onFinish} className="text-2xs skc-muted skc-body">Skip</button>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {step === 0 && (
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center skc-bg-teal mx-auto">
              <span className="skc-on-accent text-sm font-bold skc-mono">SKC</span>
            </div>
            <h1 className="text-xl font-bold skc-navy skc-display">Welcome to StudentKitCo.</h1>
            <p className="text-sm skc-muted skc-body leading-relaxed">
              Scholarships, internships, events and everyday student admin, filtered down to what's actually relevant to you — so you spend less time searching and more time acting.
            </p>
          </div>
        )}

        {step === 1 && (
          <div className="text-center space-y-3">
            <Sparkles size={30} className="skc-teal mx-auto" />
            <h1 className="text-xl font-bold skc-navy skc-display">Built around one idea: the filter</h1>
            <p className="text-sm skc-muted skc-body leading-relaxed">
              The internet has thousands of opportunities. You don't need all of them — you need those that actually apply to you. Tell us a bit about yourself next, and StudentKitCo. does the filtering.
            </p>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <h1 className="text-lg font-bold skc-navy skc-display text-center mb-1">Where are you studying?</h1>
            <div className="space-y-2">
              {countries.map((c) => (
                <button
                  key={c.name}
                  disabled={!c.available}
                  onClick={() => setCountry(c.name)}
                  className="w-full skc-card flex items-center justify-between px-3 py-2.5"
                  style={{ opacity: c.available ? 1 : 0.55 }}
                >
                  <span className="text-sm skc-navy skc-body font-medium flex items-center gap-2">
                    <Flag country={c.name} style={{ width: 18, height: 13, borderRadius: 2 }} />
                    {c.name}
                  </span>
                  {c.available ? (
                    country === c.name ? (
                      <CheckCircle2 size={16} className="skc-teal" />
                    ) : (
                      <span className="text-3xs skc-muted skc-body">Select</span>
                    )
                  ) : (
                    <span className="text-3xs flex items-center gap-1 px-2 py-0.5 rounded-full skc-bg-lock skc-text-lock font-medium skc-body">
                      <Lock size={9} /> Coming soon
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-2.5">
            <h1 className="text-lg font-bold skc-navy skc-display text-center mb-0.5">A little about you</h1>
            <Field label="Full name" input value={profile.name} onChange={(v) => setProfile((p) => ({ ...p, name: v }))} />
            <Field label="Preferred name (optional)" input value={profile.nickname} onChange={(v) => setProfile((p) => ({ ...p, nickname: v }))} />
            <p className="text-3xs skc-muted skc-body" style={{ marginTop: -6 }}>Leave blank and we'll just use your first name.</p>
            <Field label="Date of birth" input type="date" value={profile.dob} onChange={(v) => setProfile((p) => ({ ...p, dob: v }))} />
          </div>
        )}

        {step === 4 && (
          <div className="space-y-2.5">
            <h1 className="text-lg font-bold skc-navy skc-display text-center mb-0.5">Set up your filter</h1>
            <p className="text-2xs skc-muted skc-body text-center mb-2">
              This is what powers the filter — the more accurate this is, the better your matches.
            </p>
            <label className="block">
              <span className="text-2xs skc-muted skc-body">Institution</span>
              <select
                className="skc-field mt-1 px-3 py-2 text-sm skc-body"
                value={profile.institution}
                onChange={(e) => setProfile((p) => ({ ...p, institution: e.target.value }))}
              >
                {institutions.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
            <Field label="Programme" input value={profile.programme} onChange={(v) => setProfile((p) => ({ ...p, programme: v }))} />
            <label className="block">
              <span className="text-2xs skc-muted skc-body">Study level</span>
              <select
                className="skc-field mt-1 px-3 py-2 text-sm skc-body"
                value={profile.level}
                onChange={(e) => setProfile((p) => ({ ...p, level: e.target.value }))}
              >
                {levels.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </label>
            <div>
              <span className="text-2xs skc-muted skc-body block mb-1.5">Interests</span>
              {suggested.length > 0 && (
                <>
                  <p className="text-3xs skc-teal skc-body font-medium mb-1">Suggested for {profile.programme}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {suggested.map((tag) => (
                      <Pill key={tag} active={profile.interests.includes(tag)} onClick={() => toggleInterest(tag)}>{tag}</Pill>
                    ))}
                  </div>
                </>
              )}
              <p className="text-3xs skc-muted skc-body font-medium mb-1">More interests</p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {moreOptions.map((tag) => (
                  <Pill key={tag} active={profile.interests.includes(tag)} onClick={() => toggleInterest(tag)}>{tag}</Pill>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h1 className="text-lg font-bold skc-navy skc-display text-center mb-3">Before you dive in</h1>
            <ul className="space-y-2.5 mb-3">
              <li className="flex gap-2">
                <CheckCircle2 size={14} className="skc-teal mt-0.5 flex-shrink-0" />
                <span className="text-xs skc-muted skc-body">Your matches get sharper the more you use StudentKitCo. — nothing is final from day one.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={14} className="skc-teal mt-0.5 flex-shrink-0" />
                <span className="text-xs skc-muted skc-body">Opportunities are checked by hand and linked to their official source — always confirm dates before applying.</span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 size={14} className="skc-teal mt-0.5 flex-shrink-0" />
                <span className="text-xs skc-muted skc-body">Your information stays on your device — secure, and seen only by you.</span>
              </li>
            </ul>
            <div className="skc-divider pt-3 mt-3 text-center">
              <p className="text-xs italic skc-navy skc-body">"Built by a student, for students."</p>
              <p className="text-xs skc-teal skc-display font-semibold mt-1">{FOUNDER_SIGNATURE}</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => (step < totalSteps - 1 ? setStep(step + 1) : onFinish())}
        className="w-full py-3 rounded-xl skc-bg-teal skc-on-accent text-sm font-semibold skc-body mt-4"
      >
        {step < totalSteps - 1 ? 'Next' : 'Get Started'}
      </button>
    </div>
  );
}
