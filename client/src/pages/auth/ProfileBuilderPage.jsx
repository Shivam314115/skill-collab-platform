// src/pages/auth/ProfileBuilderPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../components/profile/ProfileForm';
import AuthLayout from '../../layouts/AuthLayout';
import { BrandLockup } from '../../components/common/AgileUI';

export default function ProfileBuilderPage() {
    const navigate = useNavigate();

    const handleSaveProfile = (profile) => {
        console.log('Saving profile:', profile);
        // Here you would typically save the profile to your backend
        // For now, we'll just navigate to the dashboard
        navigate('/dashboard');
    };

    return (
        <AuthLayout>
            <div className="w-full">
                <BrandLockup size="md" className="mb-10" />
                <h1 className="text-4xl font-black text-white md:text-5xl">Build Your Profile</h1>
                <p className="mb-8 mt-3 text-lg font-semibold text-[#aaa]">Tell us more about yourself to get started.</p>
                <ProfileForm onSave={handleSaveProfile} />
            </div>
        </AuthLayout>
    );
}
