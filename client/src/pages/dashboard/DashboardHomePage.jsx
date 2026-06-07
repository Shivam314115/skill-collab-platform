import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, Briefcase, CheckCircle, Clock, Plus, Rocket, Search, Users } from 'lucide-react';
import { getAllProjects, getAllUsers, getUserNotifications } from '../../lib/api';
import { AtlasButton, AtlasCard, AtlasTag, PageFrame, PatternArt, StatPill } from '../../components/common/AgileUI';
import { useAuth } from '../../hooks/useAuth';

const mapProject = (project) => ({
  id: project.id,
  name: project.title || project.name || 'Untitled Project',
  description: project.description || 'A collaborative build in progress.',
  progress: project.progress ?? Math.floor(Math.random() * 40 + 50),
  status: project.status === 'SEEKING_COLLABORATORS' ? 'Recruiting' : project.status || 'Active',
  members: project.collaborators?.length || project.collaboratorIds?.length || project.members || 1,
});

const mapUser = (user) => ({
  id: user.id,
  name: user.fullName || user.name || 'Unknown Builder',
  role: user.role || 'Product Builder',
  skills: user.topSkills || user.skills || ['React', 'Design', 'API'],
});

export default function DashboardHomePage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        setLoading(true);
        const [projectData, userData, notifData] = await Promise.all([
          getAllProjects(), 
          getAllUsers(),
          currentUser?.id ? getUserNotifications(currentUser.id) : Promise.resolve([])
        ]);
        if (!mounted) return;
        if (projectData?.length) setProjects(projectData.map(mapProject));
        if (userData?.length) setMembers(userData.slice(0, 4).map(mapUser));
        if (notifData?.length) setNotifications(notifData);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [currentUser?.id]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects.slice(0, 4);
    return projects
      .filter((project) => project.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .slice(0, 4);
  }, [projects, searchQuery]);

  const activeProjects = projects.filter((project) => project.status === 'Active').length || projects.length;
  const totalMembers = projects.reduce((sum, project) => sum + (project.members || 0), 0);
  const averageProgress = projects.length > 0 ? Math.round(projects.reduce((sum, project) => sum + (project.progress || 0), 0) / projects.length) : 0;
  const name = currentUser?.fullName || currentUser?.name || 'Builder';

  return (
    <PageFrame className="p-4 md:p-7">
      <div className="grid gap-6 xl:grid-cols-[1.55fr_0.95fr]">
        <AtlasCard className="grid overflow-hidden p-6 md:grid-cols-[1.1fr_0.9fr] md:p-8">
          <div className="flex min-h-80 flex-col justify-between gap-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#3fbe8c]">Skill collaboration hub</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black leading-none md:text-6xl">
                Welcome back, {name.split(' ')[0]}
              </h1>
              <p className="mt-4 max-w-xl text-lg font-bold text-[#b6b6b6]">
                Verify talent, find your crew, and keep every project moving toward launch.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <AtlasButton onClick={() => navigate('/dashboard/projects')} icon={Plus}>
                New Project
              </AtlasButton>
              <AtlasButton onClick={() => navigate('/dashboard/discover')} variant="ghost" icon={Users}>
                Find Collaborators
              </AtlasButton>
            </div>
          </div>
          <PatternArt className="mt-8 min-h-72 md:mt-0" />
        </AtlasCard>

        <div className="grid grid-cols-2 gap-4">
          <StatPill label="Active" value={activeProjects} />
          <StatPill label="Progress" value={`${averageProgress}%`} />
          <StatPill label="Collaborators" value={totalMembers} />
          <StatPill label="Verified" value={projects.length} />
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <AtlasCard className="p-6">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-black">Current Projects</h2>
              <p className="text-sm font-semibold text-[#9f9f9f]">Your most active collaboration spaces</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#777]" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects"
                className="atlas-input pl-11"
              />
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-[#a6a6a6] text-center py-4">Loading projects...</div>
            ) : filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => navigate(`/dashboard/projects/${project.id}`)}
                  className="w-full rounded-2xl bg-[#242424] p-4 text-left transition hover:bg-[#303030]"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h3 className="truncate text-lg font-black">{project.name}</h3>
                        <AtlasTag>{project.status}</AtlasTag>
                      </div>
                      <p className="line-clamp-2 text-sm font-semibold text-[#a6a6a6]">{project.description}</p>
                    </div>
                    <div className="w-full shrink-0 md:w-44">
                      <div className="mb-2 flex items-center justify-between text-xs font-black text-[#bdbdbd]">
                        <span>{project.members} members</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-[#363636]">
                        <div className="h-2 rounded-full bg-[#3fbe8c]" style={{ width: `${project.progress}%` }} />
                      </div>
                    </div>
                  </div>
                </button>
              ))
            ) : (
              <div className="text-[#a6a6a6] text-center py-4">No projects found. Create one!</div>
            )}
          </div>
        </AtlasCard>

        <div className="space-y-6">
          <AtlasCard className="p-6">
            <h2 className="mb-5 text-2xl font-black">Crew Signals</h2>
            <div className="space-y-3">
              {loading ? (
                 <div className="text-[#a6a6a6] text-center py-4">Loading crew...</div>
              ) : members.length > 0 ? (
                members.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 rounded-2xl bg-[#242424] p-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3fbe8c] text-sm font-black text-[#111]">
                      {member.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-black">{member.name}</p>
                      <p className="truncate text-xs font-semibold text-[#999]">{member.role}</p>
                    </div>
                    <AtlasTag>{member.skills?.[0] || 'Skill'}</AtlasTag>
                  </div>
                ))
              ) : (
                <div className="text-[#a6a6a6] text-center py-4">No crew members yet.</div>
              )}
            </div>
          </AtlasCard>

          <AtlasCard className="p-6">
            <h2 className="mb-5 text-2xl font-black">Activity</h2>
            <div className="space-y-4">
              {loading ? (
                <div className="text-[#a6a6a6] text-center py-4">Loading activity...</div>
              ) : notifications.length > 0 ? (
                notifications.slice(0, 4).map((item, index) => {
                  const Icon = index % 2 === 0 ? CheckCircle : Clock;
                  return (
                    <div key={item.id || index} className="flex gap-3">
                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#173d2d] text-[#3fbe8c]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-white">{item.message || item.text || item.title || 'Notification received'}</p>
                        <p className="text-xs font-semibold text-[#898989]">{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Today'}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-[#a6a6a6] text-center py-4">No recent activity.</div>
              )}
            </div>
          </AtlasCard>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {[
          { icon: Award, title: 'Skill Verification', copy: 'Keep your proofs fresh with GitHub, peer reviews, and project outcomes.' },
          { icon: Briefcase, title: 'Project Rooms', copy: 'Collect roles, tasks, messages, and launch decisions in one place.' },
          { icon: Rocket, title: 'Launch Path', copy: 'Move from crew formation to shipped work with fewer handoffs.' },
        ].map(({ icon: Icon, title, copy }) => (
          <AtlasCard key={title} className="p-5">
            <Icon className="mb-4 h-7 w-7 text-[#3fbe8c]" />
            <h3 className="text-lg font-black">{title}</h3>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-[#a4a4a4]">{copy}</p>
          </AtlasCard>
        ))}
      </div>
    </PageFrame>
  );
}
