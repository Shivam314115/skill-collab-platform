// src/pages/SignUpPage.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export default function SignUpPage() {
    React.useEffect(() => {
        document.body.style.backgroundColor = "#1E1E1E";
    }, []);

    return (
        <div className="text-white min-h-screen flex items-center justify-center font-montserrat p-4">
            <div className="bg-[#212121] w-full max-w-4xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full border-[5px] border-white flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-full"></div></div><h1 className="text-3xl font-bold font-poppins">AgileAtlas</h1></div>
                    <h2 className="text-3xl font-bold mb-2">Create an account</h2>
                    <p className="text-gray-400 mb-8">Empower your projects, Simplify your Success!</p>
                    <form className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="w-full"><label className="text-sm font-medium text-gray-300" htmlFor="first-name">First Name</label><input type="text" id="first-name" placeholder="Enter your first name" className="w-full mt-2 px-4 py-3 bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]" /></div>
                            <div className="w-full"><label className="text-sm font-medium text-gray-300" htmlFor="last-name">Last Name</label><input type="text" id="last-name" placeholder="Enter your last name" className="w-full mt-2 px-4 py-3 bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]" /></div>
                        </div>
                        <div><label className="text-sm font-medium text-gray-300" htmlFor="email">Email Address</label><input type="email" id="email" placeholder="Enter your email address" className="w-full mt-2 px-4 py-3 bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]" /></div>
                        <div><label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label><input type="password" id="password" placeholder="Enter your password" className="w-full mt-2 px-4 py-3 bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]" /></div>
                        <div className="space-y-4 pt-4"><button type="submit" className="w-full bg-[#36B083] text-black font-bold py-3 rounded-lg hover:bg-[#2da372] transition-colors">Sign up</button><button type="button" className="w-full bg-transparent border border-[#444444] text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#333333] transition-colors"><GoogleIcon />Sign in with Google</button></div>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-8">Do you have an account? <Link to="/login" className="font-medium text-[#36B083] hover:underline">Login</Link></p>
                </div>
                <div className="w-full md:w-1/2 hidden md:block relative">
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop" alt="A person looking forward with a creative green overlay" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-800 to-green-700 opacity-70 mix-blend-color"></div>
                </div>
            </div>
        </div>
    );
}