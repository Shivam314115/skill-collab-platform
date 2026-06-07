// src/pages/profile/EditProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../components/profile/ProfileForm';
import { useAuth } from '../../hooks/useAuth';
import { PageFrame, PageHeader, PatternArt } from '../../components/common/AgileUI';

export default function EditProfile() {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    // This would be fetched from your backend
    const currentProfile = {
        name: currentUser?.fullName || currentUser?.name || '',
        role: 'Full-Stack Developer', // This should come from the user's profile
        bio: 'Passionate about building beautiful and functional web applications.',
        skills: ['React', 'Node.js', 'Appwrite'],
        github: 'https://github.com/your-username',
        linkedin: 'https://linkedin.com/in/your-username',
        twitter: 'https://twitter.com/your-username',
    };

    const handleSaveProfile = (profile) => {
        console.log('Updating profile:', profile);
        // Here you would typically save the updated profile to your backend
        navigate('/dashboard/settings');
    };

    return (
        <PageFrame className="p-4 md:p-7">
            <PageHeader
                eyebrow="Profile"
                title="Edit Your Profile"
                description="Keep your profile up-to-date to attract collaborators."
            />
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr]">
                <section>
                    <ProfileForm profile={currentProfile} onSave={handleSaveProfile} />
                </section>
                <PatternArt variant="portrait" className="sticky top-8 hidden max-h-[720px] lg:block" />
            </div>
        </PageFrame>
    );
}
