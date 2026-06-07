import React, { useEffect, useMemo, useState } from 'react';
import { Award, GitBranch, Search, Star, Users } from 'lucide-react';
import { getAllUsers } from '../../lib/api';
import { AtlasCard, AtlasTag, PageFrame, PageHeader } from '../../components/common/AgileUI';

const mockTeamMembers = [
  { id: 1, name: 'Sarah Chen', role: 'Full-Stack Developer', status: 'online', avatar: 'SC', skillsVerified: 12, endorsements: 45, topSkills: ['React', 'Node.js', 'Python'], githubScore: 98 },
  { id: 2, name: 'David Kumar', role: 'ML Engineer', status: 'online', avatar: 'DK', skillsVerified: 8, endorsements: 28, topSkills: ['Python', 'TensorFlow', 'Data Science'], githubScore: 95 },
  { id: 3, name: 'Alex Morgan', role: 'Blockchain Developer', status: 'away', avatar: 'AM', skillsVerified: 6, endorsements: 15, topSkills: ['Solidity', 'Web3', 'Smart Contracts'], githubScore: 87 },
  { id: 4, name: 'Lisa Rodriguez', role: 'Security Specialist', status: 'offline', avatar: 'LR', skillsVerified: 10, endorsements: 34, topSkills: ['Cybersecurity', 'Penetration Testing', 'Audit'], githubScore: 92 },
];

const mapUser = (user) => ({
  id: user.id,
  name: user.fullName || user.name || 'Unknown',
  role: user.role || 'Developer',
  status: 'online',
  avatar: (user.fullName || user.name || 'U').split(' ').map((name) => name[0]).slice(0, 2).join(''),
  skillsVerified: user.skillsVerified || 0,
  endorsements: user.endorsements || 0,
  topSkills: user.topSkills || user.skills || [],
  githubScore: user.githubScore || 0,
});

export default function DiscoverPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState(mockTeamMembers);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const users = await getAllUsers();
        if (!mounted) return;
        if (users?.length) setMembers(users.map(mapUser));
      } catch (e) {
        console.error('Failed to load users:', e);
        if (mounted) setError('Could not load collaborators from the server. Showing sample data.');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredMembers = useMemo(
    () => members.filter((member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.role || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (member.topSkills || []).some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    ),
    [members, searchQuery]
  );

  return (
    <PageFrame className="p-4 md:p-7">
      <PageHeader
        eyebrow="Talent network"
        title="Discover Collaborators"
        description="Find verified talent and skill signals for your next project."
      >
        <div className="relative w-full sm:w-96">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
          <input
            type="text"
            placeholder="Search by name, role, or skill"
            className="atlas-input pl-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </PageHeader>

      {loading ? <div className="py-12 text-center font-bold text-[#999]">Loading collaborators...</div> : null}
      {error ? <div className="mb-5 rounded-xl bg-[#463119] px-4 py-3 text-sm font-bold text-[#f2b35d]">{error}</div> : null}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {filteredMembers.map((member) => (
          <AtlasCard key={member.id} className="p-5 text-center transition hover:-translate-y-1 hover:bg-[#303030]">
            <div className="relative mx-auto mb-4 h-24 w-24">
              <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-[#3fbe8c] text-3xl font-black text-[#111]">
                {member.avatar}
              </div>
              <span
                className={`absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-[#2b2b2b] ${
                  member.status === 'online' ? 'bg-[#3fbe8c]' : member.status === 'away' ? 'bg-[#f2b35d]' : 'bg-[#777]'
                }`}
              />
            </div>
            <h3 className="text-xl font-black text-white">{member.name}</h3>
            <p className="mt-1 text-sm font-semibold text-[#999]">{member.role}</p>

            <div className="mt-5 flex min-h-16 flex-wrap justify-center gap-2">
              {(member.topSkills || []).slice(0, 5).map((skill) => (
                <AtlasTag key={skill}>{skill}</AtlasTag>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 text-xs font-bold text-[#a6a6a6]">
              <div>
                <Award className="mx-auto mb-1 h-4 w-4 text-[#3fbe8c]" />
                <p className="text-white">{member.skillsVerified}</p>
                <p>Verified</p>
              </div>
              <div>
                <Star className="mx-auto mb-1 h-4 w-4 text-[#f2b35d]" />
                <p className="text-white">{member.endorsements}</p>
                <p>Endorsed</p>
              </div>
              <div>
                <GitBranch className="mx-auto mb-1 h-4 w-4 text-[#c078df]" />
                <p className="text-white">{member.githubScore}</p>
                <p>GH Score</p>
              </div>
            </div>
          </AtlasCard>
        ))}
      </div>

      {!loading && filteredMembers.length === 0 ? (
        <AtlasCard className="mt-8 p-10 text-center">
          <Users className="mx-auto mb-4 h-10 w-10 text-[#3fbe8c]" />
          <p className="text-lg font-black">No collaborators found.</p>
        </AtlasCard>
      ) : null}
    </PageFrame>
  );
}
