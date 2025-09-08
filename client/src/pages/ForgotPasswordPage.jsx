import React from 'react';

export default function ForgotPasswordPage() {
    return (
        <div className="bg-[#1E1E1E] text-white min-h-screen flex items-center justify-center font-montserrat p-4">
            <div className="bg-[#212121] w-full max-w-4xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full border-[5px] border-white flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-full"></div></div><h1 className="text-3xl font-bold font-poppins">AgileAtlas</h1></div>
                    <h2 className="text-3xl font-bold mb-2">Forgot Password?</h2>
                    <p className="text-gray-400 mb-8">Reset your password and regain control!</p>
                    <form className="space-y-6">
                        <div><label className="text-sm font-medium text-gray-300" htmlFor="email">Email Address</label><input type="email" id="email" placeholder="Enter your email address" className="w-full mt-2 px-4 py-3 bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]" /></div>
                        <div className="space-y-4 pt-4"><button type="submit" className="w-full bg-[#36B083] text-black font-bold py-3 rounded-lg hover:bg-[#2da372] transition-colors">Reset Password</button></div>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-8"><a href="#" className="font-medium text-gray-400 hover:text-white transition-colors">← go back to login screen</a></p>
                </div>
                <div className="w-full md:w-1/2 hidden md:block relative">
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto=format&fit=crop" alt="A person looking forward with a creative green overlay" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-800 to-green-700 opacity-70 mix-blend-color"></div>
                </div>
            </div>
        </div>
    );
}
