import React, { useState, useRef } from 'react';

export default function OtpPage() {
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const inputRefs = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <div className="bg-[#1E1E1E] text-white min-h-screen flex items-center justify-center font-montserrat p-4">
            <div className="bg-[#212121] w-full max-w-4xl rounded-2xl shadow-lg flex flex-col md:flex-row overflow-hidden">
                <div className="w-full md:w-1/2 p-8 md:p-12">
                    <div className="flex items-center gap-3 mb-8"><div className="w-12 h-12 rounded-full border-[5px] border-white flex items-center justify-center"><div className="w-3 h-3 bg-white rounded-full"></div></div><h1 className="text-3xl font-bold font-poppins">AgileAtlas</h1></div>
                    <h2 className="text-3xl font-bold mb-2">Enter The Code</h2>
                    <p className="text-gray-400 mb-8">Enter the code sent to your email.</p>
                    <form className="space-y-6">
                        <div className="flex justify-center gap-2 md:gap-4">
                            {otp.map((data, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    value={data}
                                    ref={el => inputRefs.current[index] = el}
                                    onChange={e => handleChange(e.target, index)}
                                    onKeyDown={e => handleKeyDown(e, index)}
                                    onFocus={e => e.target.select()}
                                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-semibold bg-[#333333] border border-[#444444] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#36B083]"
                                />
                            ))}
                        </div>
                        <div className="space-y-4 pt-4"><button type="submit" className="w-full bg-[#36B083] text-black font-bold py-3 rounded-lg hover:bg-[#2da372] transition-colors">Verify Email</button></div>
                    </form>
                    <p className="text-center text-sm text-gray-400 mt-8"><a href="#" className="font-medium text-gray-400 hover:text-white transition-colors">← go back to login screen</a></p>
                </div>
                <div className="w-full md:w-1/2 hidden md:block relative">
                    <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1780&auto.format&fit=crop" alt="A person looking forward with a creative green overlay" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900 via-green-800 to-green-700 opacity-70 mix-blend-color"></div>
                </div>
            </div>
        </div>
    );
}
