import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Logo from '../../components/common/Logo';
import FormInput from '../../components/common/FormInput';
import SocialButton from '../../components/common/SocialButton';
import ActionButton from '../../components/common/ActionButton';

const AuthPageWrapper = ({ children }) => (
    <div className="w-full lg:w-1/2 p-8 md:p-12">
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
            <Link to="/" className="text-gray-400 hover:text-white transition-colors flex items-center">
                <span className="mr-2">&larr;</span> Back to Landing Page
            </Link>
        </div>
        <div className="mt-16">{children}</div>
    </div>
);

export default function LoginPage() {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
        if (!formData.password) newErrors.password = 'Password is required.';
        return newErrors;
    };

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
                            onClick={login}
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
}