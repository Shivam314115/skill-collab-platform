import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import FormInput from '../../components/common/FormInput';
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

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.password) newErrors.password = 'New password is required.';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters.';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password.';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';
        return newErrors;
    };
    
    const handleChange = (e) => setFormData(prev => ({...prev, [e.target.name]: e.target.value}));

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
                <FormInput name="password" type="password" placeholder="Enter new password" value={formData.password} onChange={handleChange} error={errors.password} />
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
}