import React, { useEffect, useState } from 'react';
import { Code, Link as LinkIcon, Plus, Save, User } from 'lucide-react';
import { AtlasButton, AtlasCard, AtlasTag } from '../common/AgileUI';
import FormInput from '../common/FormInput';

const emptyProfile = {
  name: '',
  role: '',
  bio: '',
  skills: [],
  github: '',
  linkedin: '',
  twitter: '',
};

export default function ProfileForm({ profile: profileProp, initial, onSave, saving = false }) {
  const [profile, setProfile] = useState({ ...emptyProfile, ...(profileProp || initial || {}) });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    setProfile({ ...emptyProfile, ...(profileProp || initial || {}) });
  }, [profileProp, initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !profile.skills.includes(skill)) {
      setProfile((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profile);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <AtlasCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-[#173d2d] p-2 text-[#3fbe8c]">
            <User className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-black text-white">Profile Basics</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput icon={User} label="Full Name" name="name" value={profile.name} onChange={handleChange} placeholder="e.g., Alex Johnson" />
          <FormInput label="Role / Title" name="role" value={profile.role} onChange={handleChange} placeholder="e.g., Full-Stack Developer" />
        </div>

        <div className="mt-5">
          <label className="atlas-label">Bio / About</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            rows={5}
            className="atlas-input resize-none"
            placeholder="Tell collaborators what you build and how you like to work."
          />
        </div>
      </AtlasCard>

      <AtlasCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-[#173d2d] p-2 text-[#3fbe8c]">
            <Code className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-black text-white">Skills</h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <FormInput icon={Code} label="Add Skill" name="newSkill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} placeholder="e.g., React, Node.js" />
          </div>
          <div className="flex items-end">
            <AtlasButton type="button" onClick={handleAddSkill} icon={Plus} className="w-full sm:w-auto">
              Add
            </AtlasButton>
          </div>
        </div>

        <div className="mt-5 flex min-h-12 flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <button key={skill} type="button" onClick={() => handleRemoveSkill(skill)}>
              <AtlasTag>{skill}</AtlasTag>
            </button>
          ))}
          {profile.skills.length === 0 ? <p className="text-sm font-semibold text-[#999]">No skills added yet.</p> : null}
        </div>
      </AtlasCard>

      <AtlasCard className="p-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-xl bg-[#173d2d] p-2 text-[#3fbe8c]">
            <LinkIcon className="h-5 w-5" />
          </span>
          <h2 className="text-2xl font-black text-white">Social Links</h2>
        </div>
        <div className="grid gap-5">
          <FormInput icon={LinkIcon} label="GitHub" name="github" value={profile.github} onChange={handleChange} placeholder="https://github.com/your-username" />
          <FormInput icon={LinkIcon} label="LinkedIn" name="linkedin" value={profile.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/your-username" />
          <FormInput icon={LinkIcon} label="Twitter" name="twitter" value={profile.twitter} onChange={handleChange} placeholder="https://twitter.com/your-username" />
        </div>
      </AtlasCard>

      <div className="flex justify-end">
        <AtlasButton type="submit" icon={Save} disabled={saving}>
          {saving ? 'Saving...' : 'Save Profile'}
        </AtlasButton>
      </div>
    </form>
  );
}
