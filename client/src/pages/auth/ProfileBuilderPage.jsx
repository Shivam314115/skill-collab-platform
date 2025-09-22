import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../../components/common/Logo';
import FormInput from '../../components/common/FormInput';

// --- SVG ICONS ---
const GitHubIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full text-white"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>);
const LinkedInIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full text-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>);
const XIcon = () => (<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-full h-full text-white"><path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.931ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/></svg>);

// --- 💅 START: Updated styles for noise and new container ---
const GlobalStyles = () => (
    <style>{`
        body::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            background: linear-gradient(rgba(16, 185, 129, 0.05), rgba(16, 185, 129, 0.05)),
                        url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
            opacity: 0.6;
            z-index: -1;
        }

        .industry-container {
            position: relative;
            overflow: hidden;
        }

        /* Replaced hard sheen with a softer, radial glow for a more premium look */
        .industry-container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 600px;
            height: 150px;
            background: radial-gradient(50% 50% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%);
        }
    `}</style>
);
// --- 💅 END: Updated styles ---

export default function ProfileBuilderPage() {
    // ... (state and functions are unchanged)
    const { login } = useAuth();
    const [profileData, setProfileData] = useState({
        firstName: '', lastName: '', username: '', email: '',
        age: '', country: '', city: '', profilePicture: null
    });
    const [profileImagePreview, setProfileImagePreview] = useState(null);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const fileInputRef = useRef(null);

    const validate = () => {
        const newErrors = {};
        Object.keys(profileData).filter(k => k !== 'profilePicture').forEach(key => {
            if (!profileData[key]) {
                const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[key] = `${fieldName} is required.`;
            }
        });
        if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        if (profileData.age && (profileData.age < 13 || profileData.age > 120)) {
            newErrors.age = 'Please enter a valid age.';
        }
        return newErrors;
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setProfileData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setProfileData(prev => ({ ...prev, profilePicture: file }));
            setProfileImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageUploadClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setIsSubmitting(true);
            console.log('Submitting Profile Data:', profileData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Submission successful!');
            setIsSubmitting(false);
            login();
        }
    };

    return (
        <>
            <GlobalStyles />
            <div className="w-full lg:w-1/2 overflow-y-auto">
                 <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
                    <Link
                        to="/"
                        className="flex items-center px-4 py-2 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-gray-300 hover:text-white hover:border-white/30 transition-all duration-200"
                    >
                        <span className="mr-2">&larr;</span> Back to Landing Page
                    </Link>
                </div>
                <div className="w-full p-8 md:p-12 h-full">
                    <Logo />

                    <div className="mt-12 flex flex-col items-start gap-y-4 md:flex-row md:items-center md:gap-x-6">
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*"/>
                        <div onClick={handleImageUploadClick} className="group relative w-28 h-28 rounded-full flex-shrink-0 cursor-pointer">
                           {profileImagePreview ? (
                                <img src={profileImagePreview} alt="Profile Preview" className="w-full h-full rounded-full object-cover transition-opacity duration-300 group-hover:opacity-70"/>
                            ) : (
                                <div className="w-full h-full bg-zinc-800 border-2 border-dashed border-zinc-600 rounded-full transition-colors duration-300 group-hover:border-blue-500"/>
                            )}
                            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold text-white">Add profile picture</h2>
                    </div>

                    <form onSubmit={handleSubmit} noValidate className="max-w-2xl">
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                            <FormInput label="First Name" type="text" name="firstName" placeholder="First Name" value={profileData.firstName} onChange={handleChange} error={errors.firstName} />
                            <FormInput label="Last Name" type="text" name="lastName" placeholder="Last Name" value={profileData.lastName} onChange={handleChange} error={errors.lastName} />
                            <FormInput label="Username" type="text" name="username" placeholder="Username" containerClassName="md:col-span-2" value={profileData.username} onChange={handleChange} error={errors.username} />
                            <FormInput label="Email" type="email" name="email" placeholder="Email" containerClassName="md:col-span-2" value={profileData.email} onChange={handleChange} error={errors.email} />
                            <FormInput label="Age" type="number" name="age" placeholder="Age" value={profileData.age} onChange={handleChange} error={errors.age} />
                            <FormInput label="Country" type="text" name="country" placeholder="Country" value={profileData.country} onChange={handleChange} error={errors.country} />
                            <FormInput label="City" type="text" name="city" placeholder="City" containerClassName="md:col-span-2" value={profileData.city} onChange={handleChange} error={errors.city} />
                        </div>
                        
                        {/* --- ✨ START: Refined Container & Smoother Animations --- */}
                        <div 
                            className="industry-container mt-12 text-center bg-zinc-900/70 backdrop-blur-sm 
                                       border-t border-b border-x border-t-zinc-700 border-x-zinc-800 border-b-zinc-800 
                                       rounded-2xl p-8"
                        >
                            <h3 className="text-xl font-bold text-white">Connect across platforms</h3>
                            <div className="flex justify-center space-x-6 md:space-x-8 mt-6">
                                {/* Hover effect is now on the <a> tag for a balanced, smooth animation */}
                                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                    <div className="w-16 h-16 p-3 bg-[#24292e] rounded-full flex items-center justify-center">
                                        <GitHubIcon />
                                    </div>
                                    <p className="text-zinc-300 mt-2 font-semibold">Github</p>
                                </a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                    <div className="w-16 h-16 p-3.5 bg-[#0077b5] rounded-full flex items-center justify-center">
                                        <LinkedInIcon />
                                    </div>
                                    <p className="text-zinc-300 mt-2 font-semibold">Linkedin</p>
                                </a>
                                <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-center cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105">
                                   <div className="w-16 h-16 p-3.5 bg-black rounded-full flex items-center justify-center">
                                        <XIcon />
                                    </div>
                                    <p className="text-zinc-300 mt-2 font-semibold">Twitter</p>
                                </a>
                            </div>
                        </div>
                        {/* --- ✨ END: Refined Container --- */}

                        <div className="mt-12 text-center">
                            <button type="submit" disabled={isSubmitting} className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-12 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-green-500 disabled:bg-zinc-700 disabled:scale-100 disabled:shadow-none disabled:cursor-not-allowed">
                                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-[150%] transition-transform duration-700 ease-out group-hover:translate-x-[150%]"></span>
                                <span className={`relative z-10 flex items-center transition-opacity duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                                    Finish
                                    <svg className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </span>
                                <span className={`absolute z-20 inset-0 flex items-center justify-center transition-opacity duration-300 ${isSubmitting ? 'opacity-100' : 'opacity-0'}`}>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}