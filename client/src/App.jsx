import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Routes, Route, useNavigate, Outlet, Link, NavLink, Navigate, useLocation, useParams } from 'react-router-dom';

// --- Firebase imports for Google Auth ---
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';

// --- UPDATED MOCK DATA FOR NEW FEATURES ---
const mockUsers = [
    { id: 1, name: 'Alice Johnson', role: 'Frontend Developer', avatar: 'A', location: 'San Francisco, CA', bio: 'Passionate about creating beautiful and intuitive user interfaces. Skilled in React, Tailwind, and Figma.' },
    { id: 2, name: 'Bob Williams', role: 'Backend Developer', avatar: 'B', location: 'New York, NY', bio: 'Expert in Node.js, Python, and building scalable microservices.' },
    { id: 3, name: 'Charlie Brown', role: 'UI/UX Designer', avatar: 'C', location: 'Austin, TX', bio: 'I turn complex problems into simple, elegant designs.' },
    { id: 4, name: 'Diana Miller', role: 'Project Manager', avatar: 'D', location: 'Chicago, IL', bio: 'Agile enthusiast focused on delivering value and leading happy teams.' },
];

const mockProjects = [
    { id: 101, name: 'E-Commerce Platform', authorId: 1, members: [1, 2, 3], status: 'Ongoing', description: 'A next-gen online shopping experience with AI-powered recommendations.', tags: ['React', 'Node.js', 'Stripe'], likes: 125, rating: 4.8 },
    { id: 102, name: 'Mobile Banking App', authorId: 4, members: [1, 4], status: 'Ongoing', description: 'A secure and user-friendly mobile app for a leading financial institution.', tags: ['React Native', 'Java', 'Security'], likes: 88, rating: 4.5 },
    { id: 103, name: 'Data Analytics Dashboard', authorId: 2, members: [2, 3, 4], status: 'Planning', description: 'A B2B tool for visualizing complex business intelligence data.', tags: ['Python', 'D3.js', 'SQL'], likes: 210, rating: 4.9 },
    { id: 104, name: 'Student Collaboration Hub', authorId: 3, members: [3], status: 'New', description: 'A platform for students to find teammates and build amazing projects together.', tags: ['UX Design', 'Figma', 'Research'], likes: 302, rating: 5.0 },
];

const mockTimeline = [
    { id: 1, user: 'Charlie Brown', action: 'pushed a new design for', target: 'E-Commerce Platform', time: '2 hours ago' },
    { id: 2, user: 'Alice Johnson', action: 'completed task "User Authentication"', target: 'Mobile Banking App', time: '5 hours ago' },
    { id: 3, user: 'Diana Miller', action: 'created a new project', target: 'Data Analytics Dashboard', time: '1 day ago' },
];

const mockTasks = [
    { id: 201, text: 'Design the product page', project: 'E-Commerce Platform', projectId: 101, user: 3, completed: false },
    { id: 202, text: 'Setup the database schema', project: 'Mobile Banking App', projectId: 102, user: 2, completed: true },
    { id: 203, text: 'Implement payment gateway', project: 'E-Commerce Platform', projectId: 101, user: 1, completed: false },
];

const mockNotifications = [
    { id: 1, text: 'Bob Williams sent you a connection request.'},
    { id: 2, text: 'Your task "Design the product page" is due tomorrow.'},
    { id: 3, text: 'A new project "Marketing Website" was created.'},
];

const mockMessages = {
    2: [ // Messages with Bob Williams (id: 2)
        { id: 1, sender: 2, text: "Hey Alice, saw your project on Discover. Your React skills are impressive!", timestamp: "10:30 AM" },
        { id: 2, sender: 1, text: "Hey Bob! Thanks, appreciate it. Your backend projects look solid too.", timestamp: "10:31 AM" },
        { id: 3, sender: 2, text: "I'm working on a new project, a real-time data analytics dashboard. Wondering if you'd be interested in collaborating?", timestamp: "10:32 AM" },
    ],
    3: [ // Messages with Charlie Brown (id: 3)
        { id: 1, sender: 3, text: "Can you take a look at the Figma file for the new landing page?", timestamp: "Yesterday" },
        { id: 2, sender: 1, text: "Sure, I'll check it out this afternoon.", timestamp: "Yesterday" },
    ],
    4: [], // No messages with Diana Miller yet
};

// --- NEW MOCK DATA FOR LOCATION DROPDOWNS ---
const mockLocations = {
    "USA": {
        "California": ["Los Angeles", "San Francisco"],
        "New York": ["New York City", "Buffalo"],
    },
    "Canada": {
        "Ontario": ["Toronto", "Ottawa"],
        "Quebec": ["Montreal", "Quebec City"],
    },
    "India": {
        "Maharashtra": ["Mumbai", "Pune"],
        "Karnataka": ["Bangalore", "Mysore"],
    },
};

// --- Firebase Configuration ---
// REPLACE WITH YOUR OWN FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


// --- CONTEXTS (Authentication & Theming) ---
const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null); // Use null to indicate "checking auth state"
    const [currentUser, setCurrentUser] = useState(mockUsers[0]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                setCurrentUser({
                    id: user.uid,
                    name: user.displayName || 'Guest User',
                    email: user.email,
                    avatar: user.displayName ? user.displayName[0] : 'U',
                    role: 'Authenticated User'
                });
            } else {
                setIsLoggedIn(false);
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const login = () => {
        setIsLoggedIn(true);
        navigate('/dashboard');
    };

    const logout = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false);
            navigate('/');
        }).catch((error) => {
            console.error("Logout failed:", error);
        });
    };

    const googleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/dashboard');
        } catch (error) {
            console.error("Google sign-in failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, user: currentUser, googleSignIn }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

// --- SVG ICONS ---
const ArrowRightIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>);
const UserIcon = ({ className = "h-8 w-8 text-gray-300" }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>);
const HomeIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>);
const ProjectsIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>);
const DiscoverIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6a2 2 0 100-4 2 2 0 000 4zm0 12a2 2 0 100-4 2 2 0 000 4z"/></svg>);
const ChatIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>);
const NotificationsIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>);
const SettingsIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>);
const SupportIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const MoonIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>);
const SearchIcon = () => (<svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>);
const HeartIcon = () => (<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>);
const StarIcon = () => (<svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>);
const PlusIcon = () => (<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>);


// --- HELPER & REUSABLE COMPONENTS ---
const Logo = ({ size = 'large' }) => (
    <div className="flex items-center">
        <Link to="/" className="flex items-center cursor-pointer">
            <div className={`relative ${size === 'large' ? 'w-20 h-20 md:w-28 md:h-28' : 'w-16 h-16'}`}>
                <div className={`bg-gray-200 rounded-full w-full h-full`}></div>
                <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full ${size === 'large' ? 'w-8 h-10 md:w-10 md:h-12' : 'w-6 h-8'}`}></div>
            </div>
            <h1 className={`font-bold text-white ml-4 font-poppins ${size === 'large' ? 'text-4xl md:text-6xl' : 'text-3xl'}`}>AgileAtlas</h1>
        </Link>
    </div>
);

const FormInput = ({ label, type, name, placeholder, value, onChange, error, containerClassName = '', min, options, children }) => {
    const inputClasses = `w-full bg-[#303030] rounded-xl p-3 text-gray-300 placeholder-gray-500/50 focus:outline-none focus:ring-2 ${error ? 'ring-2 ring-red-500' : 'focus:ring-[#36B083]'}`;

    const renderInput = () => {
        if (type === 'select') {
            return (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className={inputClasses}
                >
                    <option value="" disabled>{placeholder}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                    ))}
                </select>
            );
        }
        return (
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                min={min}
                className={inputClasses}
            />
        );
    };

    return (
        <div className={containerClassName}>
            {label && <label className="text-white text-opacity-90 font-semibold mb-2 block">{label}</label>}
            {renderInput()}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {children}
        </div>
    );
};

const SocialButton = ({ icon, text, onClick }) => (
    <button onClick={onClick} className="w-full bg-[#303030] rounded-xl p-3 flex items-center justify-center text-white font-semibold hover:bg-zinc-700 transition-colors">
        {icon}
        <span className="ml-3">{text}</span>
    </button>
);

const ActionButton = ({ text, type = 'button' }) => (
    <div className="flex justify-center">
        <button type={type} className="w-full md:w-80 bg-[#36B083] rounded-2xl py-2.5 text-zinc-900 font-bold text-lg shadow-inner shadow-black/20 hover:bg-green-500 transition-colors">
            {text}
        </button>
    </div>
);

const ProfileDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useAuth();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) return null;

    return (
        <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center hover:bg-zinc-700">
                <div className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold">{user.avatar}</div>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-[#303030] rounded-lg shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-zinc-600">
                        <p className="text-sm font-semibold text-white">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.role}</p>
                    </div>
                    <Link to="/dashboard/settings" onClick={() => setIsOpen(false)} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">Settings</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">Logout</button>
                </div>
            )}
        </div>
    );
};

const NotificationsDropdown = ({ setIsOpen }) => (
    <div className="absolute right-0 mt-2 w-72 bg-[#303030] rounded-lg shadow-lg py-1 z-50">
        <div className="px-4 py-2 border-b border-zinc-600">
            <p className="text-sm font-semibold text-white">Notifications</p>
        </div>
        <div className="max-h-60 overflow-y-auto">
            {mockNotifications.map(notif => (
                <div key={notif.id} className="px-4 py-3 text-sm text-gray-200 hover:bg-zinc-700 border-b border-zinc-700/50">
                    {notif.text}
                </div>
            ))}
        </div>
    </div>
);


// --- LAYOUTS ---
const AuthPageWrapper = ({ children }) => (
    <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto">
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                <span className="mr-2">&larr;</span> Back to Landing Page
            </Link>
        </div>
        <div className="mt-16">
            {children}
        </div>
    </div>
);

const AuthLayout = () => (
    <main className="bg-[#212121] min-h-screen font-sans flex flex-col lg:flex-row items-center justify-center relative">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
            <Outlet />
            <div className="hidden lg:block lg:w-1/2 p-8">
                <img src="https://placehold.co/563x743/36B083/212121?text=AgileAtlas" alt="Agile Atlas" className="rounded-3xl object-cover w-full h-full" />
            </div>
        </div>
    </main>
);

const DashboardLayout = () => {
    const location = useLocation();
    const [pageTitle, setPageTitle] = useState("Dashboard");
    const [searchQuery, setSearchQuery] = useState("");
    const [isNotifOpen, setIsNotifOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsNotifOpen]);


    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const currentPath = pathParts[2] || 'dashboard';
        const title = currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
        setPageTitle(title);
        if(currentPath !== 'discover') {
            setSearchQuery("");
        }
    }, [location]);
    
    return (
        <div className="flex h-screen bg-[#2C2C2C] text-white">
            <Sidebar />
            <main className="flex-1 flex flex-col">
                <TopBar title={pageTitle} searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsNotifOpen={setIsNotifOpen} isNotifOpen={isNotifOpen} />
                <div className="flex-1 overflow-y-auto">
                    <Outlet context={{ searchQuery }}/>
                </div>
            </main>
        </div>
    )
};

const Sidebar = () => {
    const navItemClasses = "flex items-center justify-center w-12 h-12 my-1 rounded-lg transition-colors";
    const activeClasses = "bg-zinc-700 text-white";
    const inactiveClasses = "text-gray-400 hover:bg-zinc-800 hover:text-white";

    return (
        <aside className="w-20 bg-[#212121] p-4 flex flex-col items-center justify-between">
            <div>
                <Link to="/dashboard" className="mb-8 block">
                    <div className="w-12 h-12 bg-gray-200 rounded-full relative"><div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full w-5 h-6"></div></div>
                </Link>
                <nav className="flex flex-col items-center space-y-2">
                    <NavLink to="/dashboard" end title="Dashboard" className={({isActive}) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><HomeIcon /></NavLink>
                    <NavLink to="/dashboard/projects" title="Projects" className={({isActive}) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><ProjectsIcon /></NavLink>
                    <NavLink to="/dashboard/discover" title="Discover" className={({isActive}) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><DiscoverIcon /></NavLink>
                    <NavLink to="/dashboard/chat" title="Chat" className={({isActive}) => `${navItemClasses} ${isActive ? activeClasses : inactiveClasses}`}><ChatIcon /></NavLink>
                </nav>
            </div>
            <div className="flex flex-col items-center space-y-2">
                <Link to="/dashboard/support" title="Support" className={`${navItemClasses} ${inactiveClasses}`}><SupportIcon /></Link>
                <Link to="/dashboard/settings" title="Settings" className={`${navItemClasses} ${inactiveClasses}`}><SettingsIcon /></Link>
            </div>
        </aside>
    );
};

const TopBar = ({ title, searchQuery, setSearchQuery, setIsNotifOpen, isNotifOpen }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [setIsNotifOpen]);

    return (
        <header className="flex items-center justify-between p-4 bg-[#212121] border-b border-zinc-700">
            <h1 className="text-2xl font-bold text-white">{title}</h1>
            <div className="flex items-center space-x-4">
                <div className="relative w-72">
                    <SearchIcon />
                    <input type="text" placeholder="Search Projects, Profiles etc..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-[#2C2C2C] text-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#36B083]" />
                </div>
                <div className="relative" ref={dropdownRef}>
                    <button onClick={() => setIsNotifOpen(prev => !prev)} className="p-2 rounded-full hover:bg-zinc-700 relative">
                        <NotificationsIcon />
                        <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#212121]"></span>
                    </button>
                    {isNotifOpen && <NotificationsDropdown setIsOpen={setIsNotifOpen}/>}
                </div>
                <button className="p-2 rounded-full hover:bg-zinc-700" title="Toggle Theme"><MoonIcon /></button>
                <ProfileDropdown />
            </div>
        </header>
    );
};

// --- AUTHENTICATION PAGES ---
const LoginPage = () => {
    const { login, googleSignIn } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
        if (!formData.password) newErrors.password = 'Password is required.';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            login();
        }
    };
    
    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Login to your Account</h2>
                <p className="text-white/80 mt-2">Unlock your Progress - Securely Access Your Project Hub</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-lg">
                <FormInput label="Email Address:" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} error={errors.email} />
                <FormInput label="Password:" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} error={errors.password} />
                <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center">
                        <input type="checkbox" id="remember" className="w-5 h-5 rounded-md bg-gray-200 border-gray-600 text-[#36B083] focus:ring-[#36B083]"/>
                        <label htmlFor="remember" className="ml-2 text-gray-400">Remember for 30 Days</label>
                    </div>
                    <Link to="/forgot-password" className="text-white cursor-pointer hover:underline">Forgot password</Link>
                </div>
                <div className="pt-4 space-y-4">
                    <ActionButton text="Log In" type="submit"/>
                    <div className="max-w-md mx-auto">
                        <SocialButton
                            onClick={googleSignIn}
                            icon={<img src="https://placehold.co/27x32/FFFFFF/000000?text=G" alt="Google Icon" className="w-6 h-6 rounded-sm" />}
                            text="Sign in with Google"
                        />
                    </div>
                </div>
            </form>
            <p className="text-center text-gray-400 mt-8 max-w-lg">
                Don’t have an account? <Link to="/signup" className="font-bold text-[#36B083] cursor-pointer">Sign Up</Link>
            </p>
        </AuthPageWrapper>
    );
};

const SignUpPage = () => {
    const navigate = useNavigate();
    const { login, googleSignIn } = useAuth();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required.';
        if (!formData.lastName) newErrors.lastName = 'Last name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else {
            const passwordErrors = validatePassword(formData.password);
            if (passwordErrors.length > 0) {
                newErrors.password = passwordErrors.join(' ');
            }
        }
        return newErrors;
    };

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('At least 8 characters.');
        if (!/[a-z]/.test(password)) errors.push('A lowercase letter.');
        if (!/[A-Z]/.test(password)) errors.push('An uppercase letter.');
        if (!/[0-9]/.test(password)) errors.push('A number.');
        if (!/[!@#$%^&*()]/.test(password)) errors.push('A special character (!@#$%^&*()).');
        return errors.length > 0 ? errors : [];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            navigate('/profile-builder');
        }
    };

    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Create an account</h2>
                <p className="text-white/80 mt-2">Empower your projects, Simplify your Success!</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-lg">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    <FormInput label="First Name:" type="text" name="firstName" placeholder="Enter your first name" containerClassName="w-full" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                    <FormInput label="Last name:" type="text" name="lastName" placeholder="Enter your last name" containerClassName="w-full" value={formData.lastName} onChange={handleChange} error={errors.lastName}/>
                </div>
                <FormInput label="Email Address:" type="email" name="email" placeholder="Enter your email address" value={formData.email} onChange={handleChange} error={errors.email}/>
                <FormInput label="Password:" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} error={errors.password}>
                    {formData.password && (
                        <div className="text-xs mt-2 text-gray-400">
                            <p className={`${formData.password.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>&#8226; 8 characters</p>
                            <p className={`${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; An uppercase letter</p>
                            <p className={`${/[a-z]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A lowercase letter</p>
                            <p className={`${/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A number</p>
                            <p className={`${/[!@#$%^&*()]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A special character</p>
                        </div>
                    )}
                </FormInput>
                <div className="pt-4 space-y-4">
                    <ActionButton text="Sign up" type="submit"/>
                    <div className="max-w-md mx-auto">
                        <SocialButton
                            onClick={googleSignIn}
                            icon={<img src="https://placehold.co/27x32/FFFFFF/000000?text=G" alt="Google Icon" className="w-6 h-6 rounded-sm" />}
                            text="Sign in with Google"
                        />
                    </div>
                </div>
            </form>
            <p className="text-center text-white mt-8 max-w-lg">
                Do you have an account? <Link to="/login" className="font-extrabold text-[#36B083] underline cursor-pointer">Login</Link>
            </p>
        </AuthPageWrapper>
    );
};

const ForgotPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) setError('Email is required.');
        else if (!/\S+@\S+\.\S+/.test(email)) setError('Email address is invalid.');
        else {
            setError('');
            navigate('/otp');
        }
    };

    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Forgot Password?</h2>
                <p className="text-white/80 mt-2">Reset your password and regain control!</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-lg">
                <FormInput label="Email Address" type="email" name="email" placeholder="Enter your email address" value={email} onChange={(e) => setEmail(e.target.value)} error={error} />
                <div className="pt-4">
                    <ActionButton text="Reset Password" type="submit"/>
                </div>
            </form>
            <p onClick={() => navigate('/login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </AuthPageWrapper>
    );
};

const OtpPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState('');
    const inputsRef = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) setError("Please enter the complete 6-digit code.");
        else {
            setError('');
            navigate('/reset-password');
        }
    };

    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Enter The Code</h2>
                <p className="text-white/80 mt-2">Enter the code sent to your email.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-8 max-w-lg">
                <div className="flex justify-center space-x-2 md:space-x-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            ref={el => inputsRef.current[index] = el}
                            className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold bg-[#303030] rounded-lg text-white focus:outline-none focus:ring-2 ${error ? 'ring-2 ring-red-500' : 'focus:ring-[#36B083]'}`}
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm text-center -mb-4">{error}</p>}
                <div className="pt-2">
                    <ActionButton text="Verify Email" type="submit"/>
                </div>
            </form>
            <p onClick={() => navigate('/login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </AuthPageWrapper>
    );
};

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) errors.push('At least 8 characters.');
        if (!/[a-z]/.test(password)) errors.push('A lowercase letter.');
        if (!/[A-Z]/.test(password)) errors.push('An uppercase letter.');
        if (!/[0-9]/.test(password)) errors.push('A number.');
        if (!/[!@#$%^&*()]/.test(password)) errors.push('A special character (!@#$%^&*()).');
        return errors.length > 0 ? errors : [];
    };

    const validate = () => {
        const newErrors = {};
        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) {
            newErrors.password = passwordErrors.join(' ');
        }
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        return newErrors;
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            navigate('/login');
        }
    };

    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Reset Password</h2>
                <p className="text-white/80 mt-2">Choose a new, secure password.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6 max-w-lg">
                <FormInput name="password" type="password" placeholder="Enter new password" value={formData.password} onChange={handleChange} error={errors.password}>
                    {formData.password && (
                        <div className="text-xs mt-2 text-gray-400">
                            <p className={`${formData.password.length >= 8 ? 'text-green-400' : 'text-red-400'}`}>&#8226; 8 characters</p>
                            <p className={`${/[A-Z]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; An uppercase letter</p>
                            <p className={`${/[a-z]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A lowercase letter</p>
                            <p className={`${/[0-9]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A number</p>
                            <p className={`${/[!@#$%^&*()]/.test(formData.password) ? 'text-green-400' : 'text-red-400'}`}>&#8226; A special character</p>
                        </div>
                    )}
                </FormInput>
                <FormInput name="confirmPassword" type="password" placeholder="Re-enter new password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                <div className="pt-4">
                    <ActionButton text="Reset Password" type="submit" />
                </div>
            </form>
            <p onClick={() => navigate('/login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </AuthPageWrapper>
    );
};

const LocationDropdowns = ({ locationData, profileData, handleChange, errors }) => {
    const countries = Object.keys(locationData);
    const states = profileData.country ? Object.keys(locationData[profileData.country]) : [];

    return (
        <>
            <FormInput
                label="Country"
                type="select"
                name="country"
                value={profileData.country}
                onChange={handleChange}
                options={countries}
                placeholder="Select a country"
                error={errors.country}
                containerClassName="md:col-span-1"
            />
            {profileData.country && (
                <FormInput
                    label="State"
                    type="select"
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                    options={states}
                    placeholder="Select a state"
                    error={errors.state}
                    containerClassName="md:col-span-1"
                />
            )}
        </>
    );
};


const ProfileBuilderPage = () => {
    const { login } = useAuth();
    const fileInputRef = useRef(null);
    const [profileData, setProfileData] = useState({ firstName: '', lastName: '', username: '', email: '', age: '', country: '', state: ''});
    const [errors, setErrors] = useState({});
    const [profilePicture, setProfilePicture] = useState(null);
    
    const validate = () => {
        const newErrors = {};
        if (!profileData.firstName) newErrors.firstName = 'First name is required.';
        if (!profileData.lastName) newErrors.lastName = 'Last name is required.';
        if (!profileData.username) newErrors.username = 'Username is required.';
        if (!profileData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(profileData.email)) newErrors.email = 'Email address is invalid.';
        if (!profileData.age) newErrors.age = 'Age is required.';
        else if (profileData.age < 13) newErrors.age = 'You must be at least 13 years old.';
        if (!profileData.country) newErrors.country = 'Country is required.';
        if (!profileData.state) newErrors.state = 'State is required.';
        return newErrors;
    };

    const handleChange = e => {
        const {name, value} = e.target;
        setProfileData(prev => {
            const newProfileData = { ...prev, [name]: value };
            if (name === 'country') {
                newProfileData.state = '';
            }
            return newProfileData;
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            login();
        }
    };
    
    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file));
        }
    };

    return (
        <AuthPageWrapper>
            <div className="w-full p-8 md:p-12 overflow-y-auto">
                <Logo />
                <div className="mt-12 flex items-center space-x-6">
                    <div
                        className="w-28 h-28 bg-[#303030] rounded-full flex items-center justify-center text-white text-5xl cursor-pointer hover:bg-zinc-700 relative overflow-hidden"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <input type="file" ref={fileInputRef} onChange={handlePictureChange} className="hidden" accept="image/*" />
                        {profilePicture ? (
                            <img src={profilePicture} alt="Profile" className="w-full h-full object-cover rounded-full" />
                        ) : (
                            <span className="text-7xl font-light leading-none">+</span>
                        )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-semibold text-white">Add profile picture</h2>
                        <p className="text-white/70 text-sm mt-1">Click to upload an image</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <FormInput type="text" name="firstName" placeholder="First Name" value={profileData.firstName} onChange={handleChange} error={errors.firstName} />
                        <FormInput type="text" name="lastName" placeholder="Last Name" value={profileData.lastName} onChange={handleChange} error={errors.lastName} />
                        <FormInput type="text" name="username" placeholder="Username" containerClassName="md:col-span-2" value={profileData.username} onChange={handleChange} error={errors.username} />
                        <FormInput type="email" name="email" placeholder="Email" containerClassName="md:col-span-2" value={profileData.email} onChange={handleChange} error={errors.email} />
                        <FormInput type="number" name="age" placeholder="Age" min="13" value={profileData.age} onChange={handleChange} error={errors.age} />
                        
                        <LocationDropdowns locationData={mockLocations} profileData={profileData} handleChange={handleChange} errors={errors}/>
                    </div>
                    <div className="mt-12 text-center max-w-2xl">
                        <h3 className="text-lg font-bold text-white">Connect across platforms</h3>
                        <div className="flex justify-center space-x-8 mt-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer"><img src="https://placehold.co/72x72/FFFFFF/000000?text=G" alt="GitHub" className="w-16 h-16 rounded-full" /><p className="text-white mt-2 font-semibold">Github</p></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer"><img src="https://placehold.co/72x72/FFFFFF/000000?text=L" alt="LinkedIn" className="w-16 h-16 rounded-full" /><p className="text-white mt-2 font-semibold">Linkedin</p></a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer"><img src="https://placehold.co/72x72/FFFFFF/000000?text=X" alt="Twitter" className="w-16 h-16 rounded-full" /><p className="text-white mt-2 font-semibold">Twitter</p></a>
                        </div>
                    </div>
                    <div className="mt-12 text-center max-w-2xl">
                        <button type="submit" className="bg-[#303030] text-white/70 font-semibold py-3 px-10 rounded-lg text-2xl hover:text-white transition">
                            Finish &rarr;
                        </button>
                    </div>
                </form>
            </div>
        </AuthPageWrapper>
    );
};
    

// --- DASHBOARD & MAIN SITE PAGES ---
const LandingPage = () => {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="bg-[#212121] text-white font-montserrat w-full">
            <header className="py-4 px-6 md:px-10 border-b border-gray-700">
                <div className="container mx-auto flex justify-between items-center">
                    <Logo size="small" />
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => navigate('/dashboard')} className="bg-[#303030] px-6 py-2.5 rounded-2xl font-semibold hover:bg-zinc-700">Dashboard</button>
                                <ProfileDropdown />
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')} className="bg-[#303030] px-8 py-3.5 rounded-2xl font-semibold hover:bg-zinc-700">Login</button>
                                <button onClick={() => navigate('/signup')} className="bg-[#36B083] text-black px-6 py-3.5 rounded-2xl font-semibold hover:bg-green-500">Sign Up</button>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <main className="container mx-auto px-6 md:px-10 py-16 md:py-24">
                <section className="bg-[#303030] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl lg:text-6xl font-bold leading-tight">Built on Skills, Driven by Collaboration</h2>
                        <p className="text-lg md:text-xl text-white/80 mt-6 max-w-xl">Skip the noise, verify talent, find your crew, and ship projects that matter</p>
                        <button onClick={() => navigate('/signup')} className="mt-8 bg-[#36B083] text-white text-xl font-bold py-4 px-8 rounded-2xl flex items-center justify-center mx-auto md:mx-0 hover:bg-green-500">
                            Build Together <ArrowRightIcon />
                        </button>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <img src="https://placehold.co/425x638/20CD26/000000?text=Project+Image" alt="Collaboration" className="rounded-3xl" />
                    </div>
                </section>
                {/* ... other landing page sections ... */}
            </main>
            <footer className="mt-24 bg-[#303030] rounded-t-2xl py-8 px-6 md:px-10">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center pb-6">
                        <div>
                            <h4 className="font-semibold text-lg mb-2">Follow us</h4>
                            <div className="flex space-x-4">
                                <p className="text-sm">Social Icons</p>
                            </div>
                        </div>
                        <p className="text-sm mt-4 md:mt-0">&copy; 2025 Agile Atlas</p>
                    </div>
                    <div className="border-t border-gray-500 pt-6 flex flex-wrap justify-center text-sm gap-x-6 gap-y-2">
                        <a href="#" className="hover:underline">Terms of Services</a>
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Accessibility</a>
                        <a href="#" className="hover:underline">Cookie Settings</a>
                        <a href="#" className="hover:underline">Legal Notice</a>
                        <a href="#" className="hover:underline">FAQ</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

const DashboardHomePage = () => {
    const { user } = useAuth();
    if (!user) return null; // Defensive check for user object

    return (
        <div className="p-8 space-y-8">
            <div className="bg-[#212121] p-6 rounded-2xl border border-zinc-700">
                <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
                <p className="text-gray-400 mt-1">Ready to build something amazing today?</p>
                <div className="flex gap-4 mt-4">
                    <button className="flex items-center gap-2 bg-[#36B083] text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors">
                        <PlusIcon/> Create Project
                    </button>
                    <Link to="/dashboard/discover" className="flex items-center gap-2 bg-zinc-700 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600 transition-colors">
                        <DiscoverIcon/> Discover
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#5a3e3e] p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">Ongoing Projects</h2>
                        <div className="space-y-3">
                            {mockProjects.filter(p => p.members.includes(user.id) && p.status === 'Ongoing').map(project => (
                                <Link to={`/dashboard/projects/${project.id}`} key={project.id} className="block bg-white/10 p-4 rounded-lg cursor-pointer hover:bg-white/20 transition-transform hover:scale-[1.02]">
                                    <p className="font-semibold text-white">{project.name}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="bg-[#2a5c51] p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-4">My Tasks</h2>
                        <div className="space-y-3">
                            {mockTasks.filter(t => t.user === user.id).map(task => (
                                <div key={task.id} className="bg-white/10 p-4 rounded-lg flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <input type="checkbox" defaultChecked={task.completed} className="h-5 w-5 rounded-sm bg-zinc-600 border-zinc-500 text-green-500 focus:ring-green-600" />
                                        <p className={`text-white ${task.completed ? 'line-through text-gray-400' : ''}`}>{task.text}</p>
                                    </div>
                                    <Link to={`/dashboard/projects/${task.projectId}`} className="text-xs text-gray-300 bg-zinc-600 px-2 py-1 rounded-full hover:underline">{task.project}</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <div className="bg-[#6b6b3e] p-6 rounded-2xl h-full">
                        <h2 className="text-xl font-bold text-white mb-4">Timeline Activities</h2>
                        <div className="space-y-4">
                            {mockTimeline.map(item => (
                                <div key={item.id} className="border-b border-white/10 pb-3 last:border-b-0">
                                    <p className="text-sm text-white">
                                        <span className="font-bold">{item.user}</span> {item.action} <span className="font-bold">{item.target}</span>
                                    </p>
                                    <p className="text-xs text-gray-300 mt-1">{item.time}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectsPage = () => (
    <div className="p-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-white">Projects</h1>
            <button className="bg-[#36B083] text-zinc-900 font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition-colors">Create New Project</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockProjects.map(p => (
                <Link to={`/dashboard/projects/${p.id}`} key={p.id} className="block bg-[#212121] p-6 rounded-lg hover:scale-105 transition-transform">
                    <h3 className="text-xl font-bold text-white">{p.name}</h3>
                    <p className="text-gray-400 mt-2 text-sm">{p.description}</p>
                    <div className="flex items-center -space-x-2 mt-4">
                        {p.members.map(id => <div key={id} className="w-8 h-8 rounded-full bg-zinc-600 flex items-center justify-center text-white font-bold ring-2 ring-[#212121]">{mockUsers.find(u => u.id === id).avatar}</div>)}
                    </div>
                </Link>
            ))}
        </div>
    </div>
);
const ProjectDetailPage = () => {
    const { projectId } = useParams();
    const project = mockProjects.find(p => p.id === parseInt(projectId));
    return (
        <div className="p-8">
            <Link to="/dashboard/projects" className="text-gray-400 hover:text-white mb-4 inline-block">&larr; Back to Projects</Link>
            <h1 className="text-3xl font-bold text-white">{project?.name}</h1>
            <p className="text-gray-300 mt-2 max-w-2xl">{project?.description}</p>
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Team Members</h2>
            {/* List members here */}
            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Tasks</h2>
            {/* List tasks here */}
        </div>
    );
};

const ProjectCard = ({ project }) => {
    const author = mockUsers.find(u => u.id === project.authorId);
    return (
        <div className="bg-[#212121] border border-zinc-700 rounded-lg overflow-hidden transition-transform hover:-translate-y-1">
            <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{author.avatar}</div>
                    <div>
                        <h3 className="font-bold text-white text-lg leading-tight">{project.name}</h3>
                        <p className="text-sm text-gray-400">by {author.name}</p>
                    </div>
                </div>
                <p className="text-sm text-gray-300 mb-4 h-10 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-xs bg-zinc-700 px-2 py-1 rounded-full font-medium">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="px-5 py-3 bg-[#2C2C2C] border-t border-zinc-700 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1.5 text-gray-400 hover:text-red-500 transition-colors"> <HeartIcon/> <span className="font-medium text-sm">{project.likes}</span> </button>
                    <div className="flex items-center gap-1.5 text-gray-400"> <StarIcon /> <span className="font-medium text-sm">{project.rating.toFixed(1)}</span> </div>
                </div>
                <button onClick={() => alert(`Requesting to join ${project.name}...`)} className="bg-[#36B083] text-zinc-900 font-bold py-1.5 px-4 rounded-lg hover:bg-green-500 text-sm transition-colors">
                    Request to Join
                </button>
            </div>
        </div>
    )
}

const DiscoverPage = () => {
    const { searchQuery } = useOutletContext();
    const filteredProjects = mockProjects.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </div>
    );
};

const ChatPage = () => {
    const [activeChat, setActiveChat] = useState(2); // Default to chat with Bob
    const { user } = useAuth();
    if (!user) return null; // Protect against rendering before auth is loaded

    const contacts = mockUsers.filter(u => u.id !== user.id);
    const messages = mockMessages[activeChat] || [];
    const activeContact = mockUsers.find(u => u.id === activeChat);


    return (
        <div className="p-8 h-full">
            <div className="h-full flex bg-[#212121] rounded-lg border border-zinc-700 overflow-hidden">
                {/* Contact List */}
                <div className="w-1/3 border-r border-zinc-700 flex flex-col">
                    <div className="p-4 border-b border-zinc-700">
                        <h2 className="font-bold text-xl text-white">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {contacts.map(contact => (
                            <div key={contact.id} onClick={() => setActiveChat(contact.id)} className={`flex items-center gap-4 p-4 cursor-pointer border-l-4 ${activeChat === contact.id ? 'bg-zinc-700 border-green-500' : 'border-transparent hover:bg-zinc-800'}`}>
                                <div className="w-12 h-12 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{contact.avatar}</div>
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                                    <p className="text-sm text-gray-400 truncate">{mockMessages[contact.id]?.slice(-1)[0]?.text || "No messages yet"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Conversation Area */}
                <div className="w-2/3 flex flex-col">
                    {activeChat && activeContact ? (
                        <>
                            <div className="p-4 border-b border-zinc-700 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{activeContact.avatar}</div>
                                <h3 className="font-bold text-white">{activeContact.name}</h3>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === user.id ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender !== user.id && <div className="w-8 h-8 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{mockUsers.find(u=>u.id===msg.sender).avatar}</div>}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === user.id ? 'bg-[#36B083] text-black font-medium rounded-br-lg' : 'bg-zinc-700 text-white rounded-bl-lg'}`}>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-zinc-700">
                                <input type="text" placeholder="Type a message..." className="w-full bg-[#2C2C2C] text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#36B083]" />
                            </div>
                        </>
                    ) : <div className="flex-1 flex items-center justify-center text-gray-500">Select a conversation to start chatting</div>}
                </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs = ['profile', 'account', 'notifications'];
    const { user } = useAuth();
    
    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
                        <div className="space-y-6">
                            <FormInput label="Full Name" type="text" name="name" defaultValue={user.name} />
                            <FormInput label="Role / Title" type="text" name="role" defaultValue={user.role} />
                            <div>
                                <label className="text-white text-opacity-90 font-semibold mb-2 block">Bio</label>
                                <textarea rows="4" className="w-full bg-[#303030] rounded-xl p-3 text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#36B083]" defaultValue={user.bio}></textarea>
                            </div>
                            <button className="bg-[#36B083] text-zinc-900 font-bold py-2 px-6 rounded-lg hover:bg-green-500 transition-colors">Save Changes</button>
                        </div>
                    </div>
                );
            case 'account':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Account Settings</h2>
                        <div className="space-y-6">
                            <FormInput label="Email Address" type="email" name="email" defaultValue={`${user.name.split(' ')[0].toLowerCase()}@example.com`} />
                            <button className="bg-zinc-700 font-semibold py-2 px-4 rounded-lg hover:bg-zinc-600">Change Password</button>
                        </div>
                    </div>
                );
            case 'notifications':
                return (
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-6">Notification Settings</h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-[#303030] rounded-lg">
                                <p>Email me for new messages</p>
                                <input type="checkbox" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-[#303030] rounded-lg">
                                <p>Email me for project invites</p>
                                <input type="checkbox" defaultChecked />
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    }

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8 bg-[#212121] rounded-lg border border-zinc-700 p-6">
                <div className="md:w-1/4">
                    <h2 className="font-bold text-xl text-white mb-4">Settings</h2>
                    <nav className="space-y-1">
                        {tabs.map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-left px-4 py-2 rounded-lg font-semibold ${activeTab === tab ? 'bg-zinc-700 text-white' : 'text-gray-400 hover:bg-zinc-800 hover:text-white'}`}>
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </nav>
                </div>
                <div className="flex-1 border-t md:border-t-0 md:border-l border-zinc-700 md:pl-8 pt-6 md:pt-0">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};
const SupportPage = () => <div className="p-8 flex items-center justify-center h-full"><h1 className="text-3xl text-gray-500">Support page is under construction.</h1></div>;

// --- ROUTING LOGIC ---

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn, user } = useAuth();
    if (isLoggedIn === false) {
        return <Navigate to="/login" replace />;
    }
    if (isLoggedIn === null) {
        return <div className="flex items-center justify-center h-screen bg-[#212121] text-white">Loading...</div>;
    }
    return children;
};

export default function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                
                {/* Authentication Routes */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/otp" element={<OtpPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/profile-builder" element={<ProfileBuilderPage />} />
                </Route>

                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
                    <Route index element={<DashboardHomePage />} />
                    <Route path="projects" element={<ProjectsPage />} />
                    <Route path="projects/:projectId" element={<ProjectDetailPage />} />
                    <Route path="discover" element={<DiscoverPage />} />
                    <Route path="chat" element={<ChatPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="support" element={<SupportPage />} />
                </Route>

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AuthProvider>
    );
}