import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Logo from '../components/common/Logo';
import ProfileDropdown from '../components/dashboard/ProfileDropdown';
import { ArrowRightIcon } from '../components/Icons';

export default function LandingPage() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="bg-[#212121] text-white font-montserrat w-full min-h-screen">
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
}