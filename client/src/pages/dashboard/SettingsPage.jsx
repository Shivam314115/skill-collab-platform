import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Bell, Github, Link as LinkIcon, Linkedin, Palette, Save, Search, Shield, User, Zap } from 'lucide-react';
import { AtlasButton, AtlasCard, AtlasTag, PageFrame, PageHeader } from '../../components/common/AgileUI';

const settingsCategories = [
  { id: 'profile', title: 'Profile & Account', icon: User, description: 'Personal information and profile links' },
  { id: 'skills', title: 'Skills & Verification', icon: Award, description: 'Skill checks, endorsements, and proof signals' },
  { id: 'privacy', title: 'Privacy & Security', icon: Shield, description: 'Login security and profile visibility' },
  { id: 'notifications', title: 'Notifications', icon: Bell, description: 'Push and email preferences' },
  { id: 'integrations', title: 'Integrations', icon: Zap, description: 'Connect GitHub and professional networks' },
  { id: 'appearance', title: 'Appearance', icon: Palette, description: 'Theme and accent controls' },
];

const mockUserSettings = {
  profile: {
    personalInfo: {
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      bio: 'Full-stack developer passionate about AI and blockchain technologies.',
    },
  },
  skills: {
    verification: {
      autoGithubAnalysis: true,
      allowPeerEndorsements: true,
      skillDecayEnabled: true,
    },
  },
  privacy: {
    account: {
      twoFactorEnabled: false,
      loginAlerts: true,
    },
  },
  notifications: {
    push: {
      enabled: true,
      messages: true,
      projectUpdates: true,
    },
    email: {
      enabled: true,
    },
  },
  integrations: {
    connected: [
      { service: 'GitHub', username: 'alexjohnson', connected: true },
      { service: 'LinkedIn', username: 'alex-johnson-dev', connected: false },
    ],
  },
  appearance: {
    theme: 'dark',
    accentColor: 'green',
    animations: true,
  },
};

function ToggleSwitch({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#242424] p-4">
      <div>
        <p className="font-black text-white">{label}</p>
        {description ? <p className="mt-1 text-sm font-semibold text-[#999]">{description}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative h-7 w-14 rounded-full transition ${enabled ? 'bg-[#3fbe8c]' : 'bg-[#555]'}`}
        aria-pressed={enabled}
      >
        <span className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${enabled ? 'left-8' : 'left-1'}`} />
      </button>
    </div>
  );
}

function SettingsSection({ title, icon: Icon, children }) {
  return (
    <AtlasCard className="p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="rounded-xl bg-[#173d2d] p-2 text-[#3fbe8c]">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="text-2xl font-black">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </AtlasCard>
  );
}

function CategoryButton({ category, active, onClick }) {
  const Icon = category.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl p-4 text-left transition ${active ? 'bg-[#3fbe8c] text-[#111]' : 'bg-[#2b2b2b] text-white hover:bg-[#303030]'}`}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-black">{category.title}</p>
          <p className={`mt-1 text-xs font-semibold ${active ? 'text-[#17402f]' : 'text-[#999]'}`}>{category.description}</p>
        </div>
      </div>
    </button>
  );
}

function IntegrationCard({ integration }) {
  const Icon = integration.service === 'GitHub' ? Github : integration.service === 'LinkedIn' ? Linkedin : LinkIcon;
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-[#242424] p-4">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-[#173d2d] p-2 text-[#3fbe8c]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="font-black">{integration.service}</p>
          <p className="text-sm font-semibold text-[#999]">{integration.connected ? `@${integration.username}` : 'Not connected'}</p>
        </div>
      </div>
      <AtlasTag className={integration.connected ? '' : 'bg-[#463119] text-[#f2b35d]'}>
        {integration.connected ? 'Connected' : 'Connect'}
      </AtlasTag>
    </div>
  );
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('profile');
  const [settings, setSettings] = useState(mockUserSettings);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleSettingsChange = (path, value) => {
    const keys = path.split('.');
    setSettings((prev) => {
      const next = structuredClone(prev);
      let current = next;
      for (let index = 0; index < keys.length - 1; index += 1) {
        current = current[keys[index]];
      }
      current[keys[keys.length - 1]] = value;
      return next;
    });
    setHasUnsavedChanges(true);
  };

  const filteredCategories = settingsCategories.filter((category) =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch (activeCategory) {
      case 'profile':
        return (
          <SettingsSection title="Personal Information" icon={User}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="atlas-label">First Name</label>
                <input value={settings.profile.personalInfo.firstName} onChange={(e) => handleSettingsChange('profile.personalInfo.firstName', e.target.value)} className="atlas-input" />
              </div>
              <div>
                <label className="atlas-label">Last Name</label>
                <input value={settings.profile.personalInfo.lastName} onChange={(e) => handleSettingsChange('profile.personalInfo.lastName', e.target.value)} className="atlas-input" />
              </div>
            </div>
            <div>
              <label className="atlas-label">Email</label>
              <input value={settings.profile.personalInfo.email} onChange={(e) => handleSettingsChange('profile.personalInfo.email', e.target.value)} className="atlas-input" />
            </div>
            <div>
              <label className="atlas-label">Bio</label>
              <textarea value={settings.profile.personalInfo.bio} onChange={(e) => handleSettingsChange('profile.personalInfo.bio', e.target.value)} rows={4} className="atlas-input resize-none" />
            </div>
            <AtlasButton onClick={() => navigate('/profile/edit')} showIcon={false}>
              Edit Profile
            </AtlasButton>
          </SettingsSection>
        );
      case 'skills':
        return (
          <SettingsSection title="Skill Verification" icon={Award}>
            <ToggleSwitch enabled={settings.skills.verification.autoGithubAnalysis} onChange={(value) => handleSettingsChange('skills.verification.autoGithubAnalysis', value)} label="Automatic GitHub Analysis" description="Analyze repositories to detect current skills." />
            <ToggleSwitch enabled={settings.skills.verification.allowPeerEndorsements} onChange={(value) => handleSettingsChange('skills.verification.allowPeerEndorsements', value)} label="Allow Peer Endorsements" description="Let verified collaborators endorse your skills." />
            <ToggleSwitch enabled={settings.skills.verification.skillDecayEnabled} onChange={(value) => handleSettingsChange('skills.verification.skillDecayEnabled', value)} label="Enable Skill Decay" description="Reduce stale confidence scores over time." />
          </SettingsSection>
        );
      case 'privacy':
        return (
          <SettingsSection title="Account Security" icon={Shield}>
            <ToggleSwitch enabled={settings.privacy.account.twoFactorEnabled} onChange={(value) => handleSettingsChange('privacy.account.twoFactorEnabled', value)} label="Two-Factor Authentication" description="Add another layer of account security." />
            <ToggleSwitch enabled={settings.privacy.account.loginAlerts} onChange={(value) => handleSettingsChange('privacy.account.loginAlerts', value)} label="Login Alerts" description="Get notified when someone logs into your account." />
          </SettingsSection>
        );
      case 'notifications':
        return (
          <SettingsSection title="Notifications" icon={Bell}>
            <ToggleSwitch enabled={settings.notifications.push.enabled} onChange={(value) => handleSettingsChange('notifications.push.enabled', value)} label="Push Notifications" description="Receive notifications even when the app is closed." />
            <ToggleSwitch enabled={settings.notifications.push.messages} onChange={(value) => handleSettingsChange('notifications.push.messages', value)} label="Messages" description="Direct messages and team chat updates." />
            <ToggleSwitch enabled={settings.notifications.push.projectUpdates} onChange={(value) => handleSettingsChange('notifications.push.projectUpdates', value)} label="Project Updates" description="Milestones, assignments, and approvals." />
            <ToggleSwitch enabled={settings.notifications.email.enabled} onChange={(value) => handleSettingsChange('notifications.email.enabled', value)} label="Email Notifications" description="Summaries and important account updates." />
          </SettingsSection>
        );
      case 'integrations':
        return (
          <SettingsSection title="Connected Accounts" icon={Zap}>
            {settings.integrations.connected.map((integration) => (
              <IntegrationCard key={integration.service} integration={integration} />
            ))}
          </SettingsSection>
        );
      case 'appearance':
        return (
          <SettingsSection title="Appearance" icon={Palette}>
            <div>
              <label className="atlas-label">Color Theme</label>
              <div className="grid gap-3 sm:grid-cols-3">
                {['dark', 'light', 'system'].map((theme) => (
                  <button
                    key={theme}
                    type="button"
                    onClick={() => handleSettingsChange('appearance.theme', theme)}
                    className={`rounded-2xl border p-4 text-left font-black capitalize transition ${settings.appearance.theme === theme ? 'border-[#3fbe8c] bg-[#173d2d] text-[#67dba9]' : 'border-white/5 bg-[#242424] text-white hover:bg-[#303030]'}`}
                  >
                    {theme}
                  </button>
                ))}
              </div>
            </div>
            <ToggleSwitch enabled={settings.appearance.animations} onChange={(value) => handleSettingsChange('appearance.animations', value)} label="Animations" description="Enable smooth interface transitions." />
          </SettingsSection>
        );
      default:
        return null;
    }
  };

  return (
    <PageFrame className="p-4 md:p-7">
      <PageHeader eyebrow="Workspace controls" title="Platform Settings" description="Customize your collaboration experience.">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
          <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search settings" className="atlas-input pl-11" />
        </div>
        {hasUnsavedChanges ? (
          <AtlasButton onClick={() => setHasUnsavedChanges(false)} icon={Save}>
            Save Changes
          </AtlasButton>
        ) : null}
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[22rem_1fr]">
        <div className="space-y-3">
          {filteredCategories.map((category) => (
            <CategoryButton key={category.id} category={category} active={activeCategory === category.id} onClick={() => setActiveCategory(category.id)} />
          ))}
        </div>
        {renderContent()}
      </div>
    </PageFrame>
  );
}
