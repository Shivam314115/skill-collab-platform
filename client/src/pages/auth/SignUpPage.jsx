import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export default function SignUpPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = 'First name is required.';
        if (!formData.lastName) newErrors.lastName = 'Last name is required.';
        if (!formData.email) newErrors.email = 'Email is required.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid.';
        if (!formData.password) newErrors.password = 'Password is required.';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
        return newErrors;
    };

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

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
                <FormInput label="Password:" type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} error={errors.password} />
                <div className="pt-4 space-y-4">
                    <ActionButton text="Sign up" type="submit"/>
                    <div className="max-w-md mx-auto">
                        <SocialButton
                            onClick={login}
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
}