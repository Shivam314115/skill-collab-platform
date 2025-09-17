import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../../components/common/Logo';
import FormInput from '../../components/common/FormInput';

const AuthPageWrapper = ({ children }) => (
    // Note: This wrapper is slightly different to allow for scrolling
    <div className="w-full lg:w-1/2">
        <div className="absolute top-4 left-4 md:top-8 md:left-8 z-10">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                <span className="mr-2">&larr;</span> Back to Landing Page
            </Link>
        </div>
        {children}
    </div>
);

export default function ProfileBuilderPage() {
    const { login } = useAuth();
    const [profileData, setProfileData] = useState({ firstName: '', lastName: '', username: '', email: '', age: '', country: '', city: '' });
    const [errors, setErrors] = useState({});
    
    const validate = () => {
        const newErrors = {};
        Object.keys(profileData).forEach(key => {
            if (!profileData[key]) {
                const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                newErrors[key] = `${fieldName} is required.`;
            }
        });
        if (profileData.email && !/\S+@\S+\.\S+/.test(profileData.email)) {
            newErrors.email = 'Email address is invalid.';
        }
        return newErrors;
    };

    const handleChange = e => setProfileData(prev => ({...prev, [e.target.name]: e.target.value}));
    
    const handleSubmit = e => {
        e.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            login();
        }
    };

    return (
        <AuthPageWrapper>
            <div className="w-full p-8 md:p-12 overflow-y-auto h-screen">
                <Logo />
                <div className="mt-12 flex items-center space-x-6">
                    <div className="w-28 h-28 bg-[#303030] rounded-full flex items-center justify-center text-white text-5xl cursor-pointer hover:bg-zinc-700">
                        +
                    </div>
                    <h2 className="text-3xl font-semibold text-white">Add profile picture</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                        <FormInput type="text" name="firstName" placeholder="First Name" value={profileData.firstName} onChange={handleChange} error={errors.firstName} />
                        <FormInput type="text" name="lastName" placeholder="Last Name" value={profileData.lastName} onChange={handleChange} error={errors.lastName} />
                        <FormInput type="text" name="username" placeholder="Username" containerClassName="md:col-span-2" value={profileData.username} onChange={handleChange} error={errors.username} />
                        <FormInput type="email" name="email" placeholder="Email" containerClassName="md:col-span-2" value={profileData.email} onChange={handleChange} error={errors.email} />
                        <FormInput type="number" name="age" placeholder="Age" value={profileData.age} onChange={handleChange} error={errors.age} />
                        <FormInput type="text" name="country" placeholder="Country" value={profileData.country} onChange={handleChange} error={errors.country} />
                        <FormInput type="text" name="city" placeholder="City" value={profileData.city} onChange={handleChange} error={errors.city} />
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
}