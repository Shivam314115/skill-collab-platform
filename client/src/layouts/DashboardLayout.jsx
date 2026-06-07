import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Bell, Briefcase, Compass, HelpCircle, Home, LogOut, MessageSquare, Settings } from 'lucide-react';
import { BrandLockup, BrandMark } from '../components/common/AgileUI';
import { useAuth } from '../hooks/useAuth';

const navLinks = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Projects', path: '/dashboard/projects', icon: Briefcase },
  { name: 'Discover', path: '/dashboard/discover', icon: Compass },
  { name: 'Chat', path: '/dashboard/chat', icon: MessageSquare },
];

const utilityLinks = [
  { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  { name: 'Support', path: '/dashboard/support', icon: HelpCircle },
];

function DashboardLink({ link }) {
  const Icon = link.icon;
  return (
    <NavLink
      to={link.path}
      end={link.path === '/dashboard'}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-extrabold transition ${
          isActive
            ? 'bg-[#3fbe8c] text-[#111]'
            : 'text-[#b5b5b5] hover:bg-white/5 hover:text-white'
        }`
      }
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{link.name}</span>
    </NavLink>
  );
}

export default function DashboardLayout() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const displayName = currentUser?.fullName || currentUser?.name || 'Builder';
  const initials = displayName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white">
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-72 flex-col border-r border-white/10 bg-[#202020] p-5 lg:flex">
        <BrandLockup size="md" className="mb-8" />
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <DashboardLink key={link.name} link={link} />
          ))}
        </nav>
        <div className="my-6 h-px bg-white/10" />
        <nav className="space-y-2">
          {utilityLinks.map((link) => (
            <DashboardLink key={link.name} link={link} />
          ))}
        </nav>
        <div className="mt-auto rounded-2xl bg-[#2b2b2b] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3fbe8c] text-sm font-black text-[#111]">
              {initials || 'AA'}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{displayName}</p>
              <button
                type="button"
                onClick={() => navigate('/profile/edit')}
                className="text-xs font-bold text-[#9c9c9c] hover:text-[#3fbe8c]"
              >
                View profile
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#242424] px-3 py-2 text-xs font-black text-[#cfcfcf] transition hover:bg-[#3a3a3a] hover:text-white"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1f1f1f]/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center justify-between">
          <BrandMark size="sm" />
          <div className="flex items-center gap-2 overflow-x-auto">
            {[...navLinks, ...utilityLinks].map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end={link.path === '/dashboard'}
                  className={({ isActive }) =>
                    `rounded-xl p-2 ${isActive ? 'bg-[#3fbe8c] text-[#111]' : 'bg-[#2b2b2b] text-white'}`
                  }
                  aria-label={link.name}
                >
                  <Icon className="h-5 w-5" />
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      <div className="lg:pl-72">
        <div className="hidden items-center justify-end gap-3 border-b border-white/5 bg-[#202020] px-7 py-4 lg:flex">
          <button type="button" className="rounded-xl bg-[#2b2b2b] p-2 text-[#d6d6d6] transition hover:bg-[#343434]">
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/profile/edit')}
            className="flex items-center gap-3 rounded-xl bg-[#2b2b2b] px-3 py-2 transition hover:bg-[#343434]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3fbe8c] text-xs font-black text-[#111]">
              {initials || 'AA'}
            </span>
            <span className="text-sm font-black">{displayName}</span>
          </button>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
