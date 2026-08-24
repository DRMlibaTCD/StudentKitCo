import { useState, useEffect } from 'react';
import { Home, Compass, Calculator, User, Moon, Sun } from 'lucide-react';
import { usePersistentState } from './hooks/usePersistentState';
import Onboarding from './screens/Onboarding';
import HomeScreen from './screens/Home';
import OpportunitiesScreen from './screens/Opportunities';
import ToolsScreen from './screens/ToolsScreen';
import ProfileScreen from './screens/Profile';

const DEFAULT_PROFILE = {
  name: '',
  nickname: '',
  dob: '',
  institution: 'University of Eswatini',
  programme: '',
  level: 'First year',
  interests: [],
};

export default function App() {
  const [hasOnboarded, setHasOnboarded] = usePersistentState('has-onboarded', false);
  const [view, setView] = useState(hasOnboarded ? 'app' : 'onboarding');
  const [tab, setTab] = useState('home');
  const [theme, setTheme] = usePersistentState('theme', 'light');
  const [country, setCountry] = usePersistentState('country', 'Eswatini');
  const [seenTeaser, setSeenTeaser] = usePersistentState('seen-teaser', false);
  const [profile, setProfile] = usePersistentState('profile', DEFAULT_PROFILE);

  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const finishOnboarding = () => {
    setHasOnboarded(true);
    setView('app');
  };

  const tabs = [
    { key: 'home', label: 'Home', icon: Home },
    { key: 'opportunities', label: 'Opportunities', icon: Compass },
    { key: 'tools', label: 'Tools', icon: Calculator },
    { key: 'profile', label: 'Profile', icon: User },
  ];

  const screens = {
    home: (
      <HomeScreen
        country={country}
        seenTeaser={seenTeaser}
        onDismissTeaser={() => setSeenTeaser(true)}
        profile={profile}
      />
    ),
    opportunities: <OpportunitiesScreen />,
    tools: <ToolsScreen />,
    profile: (
      <ProfileScreen
        country={country}
        theme={theme}
        setTheme={setTheme}
        seenTeaser={seenTeaser}
        profile={profile}
        onReplayOnboarding={() => setView('onboarding')}
      />
    ),
  };

  return (
    <div className={`theme-${theme} skc-bg-page min-h-screen w-full flex flex-col items-center py-6 px-4`}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center skc-bg-teal">
          <span className="skc-on-accent text-3xs font-bold skc-mono">SKC</span>
        </div>
        <span className="text-xl font-bold skc-navy skc-display">StudentKitCo.</span>
      </div>
      <p className="text-xs skc-muted skc-body mb-2 text-center max-w-xs">
        Discover what matters. Plan what matters. Act on what matters.
      </p>

      <div className="flex items-center gap-3 mb-4">
        <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="flex items-center gap-1 text-2xs skc-muted skc-body">
          {theme === 'light' ? <Moon size={12} /> : <Sun size={12} />} {theme === 'light' ? 'Dark' : 'Light'} mode
        </button>
      </div>

      {view === 'app' && (
        <div className="flex gap-1 mb-4 p-1 rounded-full flex-wrap justify-center skc-bg-tealtint">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium skc-body transition-all ${tab === t.key ? 'skc-bg-teal skc-on-accent' : 'skc-teal'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      <div className="w-full flex flex-col flex-1" style={{ maxWidth: 480 }}>
        {view === 'onboarding' ? (
          <div className="skc-screen overflow-hidden flex flex-col flex-1" style={{ minHeight: '640px' }}>
            <Onboarding onFinish={finishOnboarding} country={country} setCountry={setCountry} profile={profile} setProfile={setProfile} />
          </div>
        ) : (
          <div className="skc-screen overflow-hidden flex flex-col flex-1" style={{ minHeight: '640px' }}>
            <div className="flex-1 overflow-y-auto">{screens[tab]}</div>
            <div className="flex items-center justify-around py-2 skc-card" style={{ borderRadius: 0, borderLeft: 'none', borderRight: 'none', borderBottom: 'none' }}>
              {tabs.map((t) => {
                const Icon = t.icon;
                const isActive = tab === t.key;
                return (
                  <button key={t.key} onClick={() => setTab(t.key)} className="flex flex-col items-center gap-0.5">
                    <Icon size={18} className={isActive ? 'skc-teal' : 'skc-muted'} />
                    <span className={`text-3xs skc-body ${isActive ? 'skc-teal font-medium' : 'skc-muted'}`}>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
