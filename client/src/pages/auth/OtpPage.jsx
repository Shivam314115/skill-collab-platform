import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
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

export default function OtpPage() {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [error, setError] = useState('');
    const inputsRef = useRef([]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;
        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
        if (element.nextSibling) {
            element.nextSibling.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const enteredOtp = otp.join("");
        if (enteredOtp.length < 6) setError("Please enter the complete 6-digit code.");
        else {
            setError('');
            navigate('/reset-password');
        }
    };

    return (
        <AuthPageWrapper>
            <Logo />
            <div className="mt-12">
                <h2 className="text-4xl font-semibold text-white">Enter The Code</h2>
                <p className="text-white/80 mt-2">Enter the code sent to your email.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-8 max-w-lg">
                <div className="flex justify-center space-x-2 md:space-x-4">
                    {otp.map((data, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={data}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select()}
                            ref={el => inputsRef.current[index] = el}
                            className={`w-12 h-12 md:w-14 md:h-14 text-center text-2xl font-bold bg-[#303030] rounded-lg text-white focus:outline-none focus:ring-2 ${error ? 'ring-red-500' : 'focus:ring-[#36B083]'}`}
                        />
                    ))}
                </div>
                {error && <p className="text-red-500 text-sm text-center -mb-4">{error}</p>}
                <div className="pt-2">
                    <ActionButton text="Verify Email" type="submit"/>
                </div>
            </form>
            <p onClick={() => navigate('/login')} className="text-center text-white/80 mt-8 cursor-pointer max-w-lg">
                &larr; go back to login screen
            </p>
        </AuthPageWrapper>
    );
}