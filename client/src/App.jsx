import React, { useState } from 'react';

// --- Reusable SVG Icons ---
const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
);


// --- Helper Components ---

// Logo Component - Now accepts a size prop
const Logo = ({ size = 'large' }) => (
    <div className="flex items-center">
        <div className="relative">
            <div className={`bg-gray-200 rounded-full ${size === 'large' ? 'w-20 h-20 md:w-28 md:h-28' : 'w-16 h-16'}`}></div>
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-full ${size === 'large' ? 'w-8 h-10 md:w-10 md:h-12' : 'w-6 h-8'}`}></div>
        </div>
        <h1 className={`font-bold text-white ml-4 font-poppins ${size === 'large' ? 'text-4xl md:text-6xl' : 'text-3xl'}`}>AgileAtlas</h1>
    </div>
);

// Form Input Component
const FormInput = ({ label, type, placeholder, containerClassName = '' }) => (
    <div className={containerClassName}>
        {label && <label className="text-white text-opacity-90 font-semibold mb-2 block">{label}</label>}
        <input
            type={type}
            placeholder={placeholder}
            className="w-full bg-[#303030] rounded-xl p-3 text-gray-300 placeholder-gray-500/50 focus:outline-none focus:ring-2 focus:ring-[#36B083]"
        />
    </div>
);

// Social Button Component
const SocialButton = ({ icon, text }) => (
    <button className="w-full bg-[#303030] rounded-xl p-3 flex items-center justify-center text-white font-semibold hover:bg-zinc-700 transition-colors">
        {icon}
        <span className="ml-3">{text}</span>
    </button>
);

// Main Action Button
const ActionButton = ({ text, onClick }) => (
    <div className="flex justify-center">
        <button onClick={onClick} className="w-full md:w-80 bg-[#36B083] rounded-2xl py-2.5 text-zinc-900 font-bold text-lg shadow-inner shadow-black/20 hover:bg-green-500 transition-colors">
            {text}
        </button>
    </div>
);


// --- Authentication Page Components ---

const SignUpPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Create an account</h2>
                <p className="text-white/80 mt-2">Empower your projects, Simplify your Success!</p>
            </div>
            <div className="mt-8 space-y-6 max-w-lg">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    <FormInput label="First Name:" type="text" placeholder="Enter your first name" containerClassName="w-full" />
                    <FormInput label="Last name:" type="text" placeholder="Enter your last name" containerClassName="w-full" />
                </div>
                <FormInput label="Email Address:" type="email" placeholder="Enter your email address" />
                <FormInput label="Password:" type="password" placeholder="Enter your password" />
                <div className="pt-4 space-y-4">
                    <ActionButton text="Sign up" onClick={() => navigateTo('profile')} />
                    <div className="max-w-md mx-auto">
                        <SocialButton
                            icon={<img src="https://placehold.co/27x32/FFFFFF/000000?text=G" alt="Google Icon" className="w-6 h-6 rounded-sm" />}
                            text="Sign in with Google"
                        />
                    </div>
                </div>
            </div>
            <p className="text-center text-white mt-8 max-w-lg">
                Do you have an account? <span onClick={() => navigateTo('login')} className="font-extrabold text-[#36B083] underline cursor-pointer">Login</span>
            </p>
        </div>
    );
};

const LoginPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Login to your Account</h2>
                <p className="text-white/80 mt-2">Unlock your Progress - Securely Access Your Project Hub</p>
            </div>
            <div className="mt-8 space-y-6 max-w-lg">
                <FormInput label="Email Address:" type="email" placeholder="Enter your email address" />
                <FormInput label="Password:" type="password" placeholder="Enter your password" />
                <div className="flex justify-between items-center text-sm">
                     <div className="flex items-center">
                        <input type="checkbox" id="remember" className="w-5 h-5 rounded-md bg-gray-200 border-gray-600 text-[#36B083] focus:ring-[#36B083]"/>
                        <label htmlFor="remember" className="ml-2 text-gray-400">Remember for 30 Days</label>
                    </div>
                    <span onClick={() => navigateTo('forgot')} className="text-white cursor-pointer hover:underline">Forgot password</span>
                </div>
                 <div className="pt-4 space-y-4">
                    <ActionButton text="Log In" onClick={() => navigateTo('dashboard')} />
                     <div className="max-w-md mx-auto">
                        <SocialButton
                            icon={<img src="https://placehold.co/27x32/FFFFFF/000000?text=G" alt="Google Icon" className="w-6 h-6 rounded-sm" />}
                            text="Sign in with Google"
                        />
                    </div>
                </div>
            </div>
             <p className="text-center text-gray-400 mt-8 max-w-lg">
                Don’t have an account? <span onClick={() => navigateTo('signup')} className="font-bold text-[#36B083] cursor-pointer">Sign Up</span>
            </p>
        </div>
    );
};

const ForgotPasswordPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Forgot Password?</h2>
                <p className="text-white/80 mt-2">Reset your password and regain control!</p>
            </div>
            <div className="mt-8 space-y-6 max-w-lg">
                <FormInput label="Email Address" type="email" placeholder="Enter your email address" />
                 <div className="pt-4">
                    <ActionButton text="Reset Password" onClick={() => navigateTo('otp')} />
                </div>
            </div>
            <p onClick={() => navigateTo('login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </div>
    );
};

const OtpPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Enter The Code</h2>
                <p className="text-white/80 mt-2">Enter the code sent to your email.</p>
            </div>
            <div className="mt-8 space-y-8 max-w-lg">
                <div className="flex justify-center space-x-2 md:space-x-4">
                    {[...Array(6)].map((_, i) => (
                        <input key={i} type="text" maxLength="1" className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold bg-[#303030] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#36B083]" />
                    ))}
                </div>
                <div className="pt-2">
                    <ActionButton text="Verify Email" onClick={() => navigateTo('resetPassword')} />
                </div>
            </div>
            <p onClick={() => navigateTo('login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </div>
    );
};

const ResetPasswordPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Reset Password</h2>
                <p className="text-white/80 mt-2">Reset your password and regain control!</p>
            </div>
            <div className="mt-8 space-y-6 max-w-lg">
                <FormInput label="" type="password" placeholder="Enter new password" />
                <FormInput label="" type="password" placeholder="Re-enter new password" />
                 <div className="pt-4">
                    <ActionButton text="Reset Password" onClick={() => navigateTo('login')} />
                </div>
            </div>
            <p onClick={() => navigateTo('login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </div>
    );
};

const ProfileBuilderPage = ({ navigateTo }) => {
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12 overflow-y-auto h-screen">
            <Logo />
            <div className="mt-12 flex items-center space-x-6">
                <div className="w-28 h-28 bg-[#303030] rounded-full flex items-center justify-center text-white text-5xl cursor-pointer hover:bg-zinc-700">
                    +
                </div>
                <h2 className="text-3xl font-semibold text-white">Add profile picture</h2>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <FormInput type="text" placeholder="First Name" />
                <FormInput type="text" placeholder="Last Name" />
                <FormInput type="text" placeholder="Username" containerClassName="md:col-span-2" />
                <FormInput type="email" placeholder="Email" containerClassName="md:col-span-2" />
                <FormInput type="number" placeholder="Age" />
                <FormInput type="text" placeholder="Country" />
                <FormInput type="text" placeholder="City" />
            </div>
             <div className="mt-12 text-center max-w-2xl">
                <h3 className="text-lg font-bold text-white">Connect across platforms</h3>
                <div className="flex justify-center space-x-8 mt-4">
                    <div className="text-center cursor-pointer">
                        <img src="https://placehold.co/72x72/FFFFFF/000000?text=G" alt="GitHub" className="w-16 h-16 rounded-full" />
                        <p className="text-white mt-2 font-semibold">Github</p>
                    </div>
                    <div className="text-center cursor-pointer">
                        <img src="https://placehold.co/72x72/FFFFFF/000000?text=L" alt="LinkedIn" className="w-16 h-16 rounded-full" />
                        <p className="text-white mt-2 font-semibold">Linkedin</p>
                    </div>
                     <div className="text-center cursor-pointer">
                        <img src="https://placehold.co/72x72/FFFFFF/000000?text=X" alt="Twitter" className="w-16 h-16 rounded-full" />
                        <p className="text-white mt-2 font-semibold">Twitter</p>
                    </div>
                </div>
            </div>
            <div className="mt-12 text-center max-w-2xl">
                 <button onClick={() => navigateTo('dashboard')} className="bg-[#303030] text-white/70 font-semibold py-3 px-10 rounded-lg text-2xl hover:text-white transition">
                    Next &rarr;
                </button>
            </div>
        </div>
    );
}

// --- Main Site Pages ---

const DashboardPage = ({ navigateTo }) => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center text-white text-center p-4 bg-[#212121]">
            <h1 className="text-5xl font-bold">Welcome to your Dashboard!</h1>
            <p className="text-2xl mt-4">You have successfully logged in.</p>
            <button
                onClick={() => navigateTo('landing')}
                className="mt-8 bg-[#36B083] text-zinc-900 font-bold py-3 px-8 rounded-full hover:bg-green-500 transition"
            >
                Logout
            </button>
        </div>
    );
};

const LandingPage = ({ navigateTo }) => {
    return (
        <div className="bg-[#212121] text-white font-montserrat w-full">
            {/* Header */}
            <header className="py-4 px-6 md:px-10 border-b border-gray-700">
                <div className="container mx-auto flex justify-between items-center">
                    <Logo size="small" />
                    <nav className="hidden lg:flex items-center bg-[#303030] rounded-2xl px-8 py-2 space-x-8">
                        <a href="#" className="font-semibold hover:text-[#36B083]">Reviews</a>
                        <a href="#" className="font-semibold hover:text-[#36B083]">Discover</a>
                        <a href="#" className="font-semibold hover:text-[#36B083]">About</a>
                    </nav>
                    <div className="flex items-center space-x-4">
                        <button onClick={() => navigateTo('login')} className="bg-[#303030] px-8 py-3.5 rounded-2xl font-semibold hover:bg-zinc-700">Login</button>
                        <button onClick={() => navigateTo('signup')} className="bg-[#36B083] text-black px-6 py-3.5 rounded-2xl font-semibold hover:bg-green-500">Get Started</button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-6 md:px-10 py-16 md:py-24">
                {/* Hero Section */}
                <section className="bg-[#303030] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 text-center md:text-left">
                        <h2 className="text-4xl lg:text-6xl font-bold leading-tight">Built on Skills, Driven by Collaboration</h2>
                        <p className="text-lg md:text-xl text-white/80 mt-6 max-w-xl">Skip the noise, verify talent, find your crew, and ship projects that matter</p>
                        <button className="mt-8 bg-[#36B083] text-white text-xl font-bold py-4 px-8 rounded-2xl flex items-center justify-center mx-auto md:mx-0 hover:bg-green-500">
                            Build Together <ArrowRightIcon />
                        </button>
                    </div>
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center">
                        <img src="https://placehold.co/425x638/20CD26/000000?text=Project+Image" alt="Collaboration" className="rounded-3xl" />
                    </div>
                </section>

                {/* Features Section 1 */}
                <section className="mt-24 bg-[#303030] rounded-2xl p-8 md:p-12 text-center">
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-[#36B083] bg-opacity-40 p-6 rounded-2xl">
                           <h3 className="text-3xl font-bold">AI Matching</h3>
                           <p className="mt-2 text-sm text-white/90">Smarter connections, faster projects!</p>
                        </div>
                        <div className="bg-[#36B083] p-6 rounded-2xl shadow-lg">
                           <h3 className="text-3xl font-bold">Connect</h3>
                           <p className="mt-2 text-sm text-white/90">Collaborate with verified professionals worldwide!</p>
                        </div>
                        <div className="bg-[#36B083] bg-opacity-40 p-6 rounded-2xl">
                           <h3 className="text-3xl font-bold">Launch</h3>
                            <p className="mt-2 text-sm text-white/90">Turn side-hustles into real-world products!</p>
                        </div>
                     </div>
                </section>
                
                 {/* How It Works Section */}
                <section className="mt-24 text-left">
                    <h2 className="text-5xl font-bold mb-12">How it works?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div>
                             <img src="https://placehold.co/344x214/888888/FFFFFF?text=Create" alt="Create a new project" className="rounded-lg mx-auto"/>
                             <h3 className="mt-4 text-xl font-bold">Create a new project</h3>
                        </div>
                         <div>
                             <img src="https://placehold.co/344x214/888888/FFFFFF?text=Collaborate" alt="Collaborate" className="rounded-lg mx-auto"/>
                             <h3 className="mt-4 text-xl font-bold">Collaborate</h3>
                        </div>
                        <div>
                             <img src="https://placehold.co/344x214/888888/FFFFFF?text=Build" alt="Build" className="rounded-lg mx-auto"/>
                             <h3 className="mt-4 text-xl font-bold">Build</h3>
                        </div>
                    </div>
                </section>

                {/* Features Section 2 */}
                <section className="mt-24 text-left">
                    <h2 className="text-5xl font-bold mb-12">Features</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="bg-[#303030] p-6 rounded-3xl">
                            <img src="https://placehold.co/229x174/000000/FFFFFF?text=Community" alt="Community Driven" className="rounded-2xl mx-auto"/>
                            <h3 className="text-xl font-bold mt-4">Community Driven</h3>
                            <p className="mt-2 text-xs text-white/70">“Connect with developers, designers, and innovators worldwide.”</p>
                        </div>
                        <div className="bg-[#303030] p-6 rounded-3xl">
                             <img src="https://placehold.co/223x174/000000/FFFFFF?text=Freelancers" alt="Hire Freelancers" className="rounded-2xl mx-auto"/>
                            <h3 className="text-xl font-bold mt-4">Hire freelancers</h3>
                             <p className="mt-2 text-xs text-white/70">“Find and hire verified talent for your next project”</p>
                        </div>
                        <div className="bg-[#303030] p-6 rounded-3xl">
                            <img src="https://placehold.co/228x174/000000/FFFFFF?text=Secure" alt="Secure & Private" className="rounded-2xl mx-auto"/>
                            <h3 className="text-xl font-bold mt-4">Secure & Private</h3>
                             <p className="mt-2 text-xs text-white/70">“Your data and projects are protected with enterprise-level security.”</p>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
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


// --- Main App Component ---

export default function App() {
    const [page, setPage] = useState('landing'); // Default page is now 'landing'

    const navigateTo = (pageName) => {
        setPage(pageName);
    };

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <LoginPage navigateTo={navigateTo} />;
            case 'forgot':
                return <ForgotPasswordPage navigateTo={navigateTo} />;
            case 'otp':
                return <OtpPage navigateTo={navigateTo} />;
            case 'resetPassword':
                return <ResetPasswordPage navigateTo={navigateTo} />;
            case 'profile':
                return <ProfileBuilderPage navigateTo={navigateTo} />;
            case 'dashboard': // New dashboard page after login
                return <DashboardPage navigateTo={navigateTo} />;
            case 'signup':
                 return <SignUpPage navigateTo={navigateTo} />;
            case 'landing':
            default:
                return <LandingPage navigateTo={navigateTo} />;
        }
    };

    // Determine which layout to use
    const isAuthPage = ['login', 'signup', 'forgot', 'otp', 'resetPassword', 'profile'].includes(page);

    if (isAuthPage) {
        return (
            <main className="bg-[#212121] min-h-screen font-sans flex flex-col lg:flex-row items-center justify-center">
                <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center p-4">
                    {renderPage()}
                    <div className="hidden lg:block lg:w-1/2 p-8">
                        <img 
                            src="https://placehold.co/563x743/36B083/212121?text=AgileAtlas" 
                            alt="Agile Atlas" 
                            className="rounded-3xl object-cover w-full h-full" 
                        />
                    </div>
                </div>
            </main>
        );
    }
    
    // Render landing or dashboard page directly
    return renderPage();
}