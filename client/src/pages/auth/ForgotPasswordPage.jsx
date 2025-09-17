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

export default function ForgotPasswordPage() {
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
}