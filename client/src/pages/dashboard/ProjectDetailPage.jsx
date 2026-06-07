import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, CheckCircle, Clock, DollarSign, Users } from 'lucide-react';
import { getProject } from '../../lib/api';
import { AtlasButton, AtlasCard, AtlasTag, PageFrame, PatternArt } from '../../components/common/AgileUI';

const mockProjects = [
  { id: 1, name: 'AI-Powered Web App', description: 'A web application leveraging machine learning to provide personalized user experiences.', progress: 78, status: 'Active', members: [{ name: 'Sarah Chen' }, { name: 'David Kumar' }], budget: 25000, deadline: '2026-12-15', requiredSkills: ['React', 'Python', 'Machine Learning', 'UI/UX'], type: 'Full-Stack Development' },
  { id: 2, name: 'Mobile E-commerce Platform', description: 'A cross-platform mobile app for a seamless shopping experience.', progress: 45, status: 'Recruiting', members: [{ name: 'Alex Morgan' }], budget: 18000, deadline: '2026-11-30', requiredSkills: ['React Native', 'Node.js', 'MongoDB'], type: 'Mobile Development' },
  { id: 3, name: 'Blockchain Voting System', description: 'A decentralized and secure voting system built on blockchain technology.', progress: 92, status: 'Active', members: [{ name: 'Lisa Rodriguez' }, { name: 'Sarah Chen' }], budget: 42000, deadline: '2026-10-20', requiredSkills: ['Solidity', 'Web3', 'Smart Contracts'], type: 'Blockchain' },
  { id: 4, name: 'Data Analytics Dashboard', description: 'An interactive dashboard for visualizing complex business intelligence data.', progress: 60, status: 'Active', members: [{ name: 'David Kumar' }], budget: 30000, deadline: '2026-11-01', requiredSkills: ['D3.js', 'PostgreSQL', 'ETL'], type: 'Data Science' },
];

const mockTasks = [
  { id: 1, text: 'Design user authentication system', completed: false, project_id: 1 },
  { id: 2, text: 'Implement machine learning model', completed: true, project_id: 1 },
  { id: 3, text: 'Set up smart contract deployment', completed: false, project_id: 3 },
];

const mapProject = (project) => ({
  id: project.id,
  name: project.title || project.name,
  description: project.description || '',
  progress: project.progress ?? 50,
  status: project.status === 'SEEKING_COLLABORATORS' ? 'Recruiting' : project.status || 'Active',
  members: project.creatorName ? [{ name: project.creatorName }] : [],
  budget: project.budget ?? 20000,
  deadline: project.updatedAt?.split('T')[0] || 'TBD',
  requiredSkills: project.requiredSkills ? [...project.requiredSkills] : [],
  type: project.category || 'Development',
});

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      const numericId = parseInt(id, 10);
      try {
        const data = await getProject(numericId);
        if (mounted) setProject(mapProject(data));
      } catch {
        const fallback = mockProjects.find((item) => item.id === numericId);
        if (mounted) setProject(fallback || null);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [id]);

  const tasks = mockTasks.filter((task) => task.project_id === parseInt(id, 10));

  if (loading) {
    return (
      <PageFrame className="flex items-center justify-center">
        <p className="font-bold text-[#999]">Loading project...</p>
      </PageFrame>
    );
  }

  if (!project) {
    return (
      <PageFrame className="flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-black text-white">Project Not Found</h1>
        <AtlasButton onClick={() => navigate('/dashboard/projects')} icon={ArrowLeft} className="mt-6">
          Back to Projects
        </AtlasButton>
      </PageFrame>
    );
  }

  return (
    <PageFrame className="p-4 md:p-7">
      <button
        type="button"
        onClick={() => navigate('/dashboard/projects')}
        className="mb-5 inline-flex items-center gap-2 text-sm font-black text-[#a7a7a7] transition hover:text-[#3fbe8c]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </button>

      <AtlasCard className="grid gap-8 p-6 md:grid-cols-[1.35fr_0.65fr] md:p-8">
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <AtlasTag>{project.status}</AtlasTag>
            <AtlasTag className="bg-[#242424] text-[#cfcfcf]">{project.type}</AtlasTag>
          </div>
          <h1 className="max-w-4xl text-4xl font-black leading-none md:text-6xl">{project.name}</h1>
          <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-[#a9a9a9]">{project.description}</p>
          <div className="mt-8 max-w-xl">
            <div className="mb-2 flex justify-between text-xs font-black text-[#a9a9a9]">
              <span>Build progress</span>
              <span>{project.progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-[#3a3a3a]">
              <div className="h-3 rounded-full bg-[#3fbe8c]" style={{ width: `${project.progress}%` }} />
            </div>
          </div>
        </div>
        <PatternArt className="min-h-72" />
      </AtlasCard>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="space-y-6">
          <AtlasCard className="p-6">
            <h2 className="mb-5 text-2xl font-black">Project Details</h2>
            <div className="space-y-4 text-sm font-bold">
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[#242424] p-3">
                <span className="text-[#999]">Budget</span>
                <span className="flex items-center gap-1"><DollarSign className="h-4 w-4 text-[#3fbe8c]" />${project.budget.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[#242424] p-3">
                <span className="text-[#999]">Deadline</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-[#3fbe8c]" />{project.deadline}</span>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl bg-[#242424] p-3">
                <span className="text-[#999]">Team</span>
                <span className="flex items-center gap-1"><Users className="h-4 w-4 text-[#3fbe8c]" />{project.members.length}</span>
              </div>
            </div>
          </AtlasCard>

          <AtlasCard className="p-6">
            <h2 className="mb-5 text-2xl font-black">Skills Needed</h2>
            <div className="flex flex-wrap gap-2">
              {(project.requiredSkills || []).length ? project.requiredSkills.map((skill) => <AtlasTag key={skill}>{skill}</AtlasTag>) : <AtlasTag>Open skill brief</AtlasTag>}
            </div>
          </AtlasCard>
        </div>

        <AtlasCard className="p-6">
          <h2 className="mb-5 text-2xl font-black">Project Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => {
              const Icon = task.completed ? CheckCircle : Clock;
              return (
                <div key={task.id} className="flex items-center gap-4 rounded-2xl bg-[#242424] p-4">
                  <Icon className={`h-5 w-5 shrink-0 ${task.completed ? 'text-[#3fbe8c]' : 'text-[#f2b35d]'}`} />
                  <p className={`font-semibold ${task.completed ? 'text-[#777] line-through' : 'text-white'}`}>{task.text}</p>
                </div>
              );
            })}
            {tasks.length === 0 ? <p className="py-8 text-center font-semibold text-[#888]">No tasks assigned to this project yet.</p> : null}
          </div>
        </AtlasCard>
      </div>
    </PageFrame>
  );
}
