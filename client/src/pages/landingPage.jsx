// src/pages/LandingPage.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link here!

const panelsData = [
    { id: 1, title: 'AI', subtitle: 'matching', description: 'Smarter connections, faster projects!', icon: 'icons8-ai-64.png' },
    { id: 2, title: 'Connect', subtitle: 'Globally', description: 'Collaborate with verified professionals worldwide!', icon: 'icons8-connect-64.png' },
    { id: 3, title: 'Launch', subtitle: 'Products', description: 'Turn side-hustles into real-world products!', icon: 'icons8-rocket-64.png' },
    { id: 4, title: 'Secure', subtitle: 'Projects', description: 'Enterprise-grade security for your data.', icon: 'icons8-secure-64.png' },
    { id: 5, title: 'Collaborate', subtitle: 'in real-time', description: 'Work together seamlessly with integrated tools.', icon: 'icons8-collaborate-64.png' },
    { id: 6, title: 'Innovate', subtitle: 'Freely', description: 'A platform to bring your boldest ideas to life.', icon: 'icons8-innovate-64.png' }
];

const CarouselPanel = ({ data, position }) => {
    const transformStates = {
        left:   { transform: 'translateX(-298px) scale(0.85)', zIndex: 10, opacity: 0.6 },
        center: { transform: 'translateX(0px) scale(1)', zIndex: 20, opacity: 1 },
        right:  { transform: 'translateX(307px) scale(0.85)', zIndex: 10, opacity: 0.6 },
        hidden: { transform: 'translateX(0px) scale(0.5)', zIndex: 0, opacity: 0 }
    };
    const isCenter = position === 'center';
    const bgShadows = [
        'shadow-[27.4978px_17.4986px_3.33307px_rgba(0,0,0,0.25)]',
        'shadow-[inset_-14.1655px_-8.33266px_8.33266px_rgba(0,0,0,0.25)]',
        'shadow-[-27.4978px_17.4986px_3.33307px_rgba(0,0,0,0.25)]',
        'shadow-[27.4978px_17.4986px_3.33307px_rgba(0,0,0,0.25)]',
        'shadow-[inset_-14.1655px_-8.33266px_8.33266px_rgba(0,0,0,0.25)]',
        'shadow-[-27.4978px_17.4986px_3.33307px_rgba(0,0,0,0.25)]'
    ];
    return (
        <div 
            className="carousel-element absolute"
            style={{ left: '586.31px', top: '1168.17px', width: '251.65px', height: '344.14px', ...transformStates[position] }}
        >
            <div className={`carousel-element absolute inset-0 bg-[#36B083] rounded-[24.998px] ${bgShadows[data.id - 1]}`} style={{ opacity: isCenter ? 1 : 0.6 }}></div>
            <div className="absolute bg-gray-600 flex items-center justify-center text-center text-white text-xs p-1 opacity-80" style={{ left: '78.32px', top: '27.49px', width: '94.99px', height: '94.99px' }}>{data.icon}</div>
            <h3 className="carousel-element absolute text-center font-montserrat font-bold text-[33.3307px] leading-[41px] text-white" style={{ left: '53.33px', top: '82.48px', width: '150px', opacity: isCenter ? 1 : 0 }}>{data.title}</h3>
            <h4 className="absolute font-montserrat font-bold text-[33.3307px] leading-[41px] text-white opacity-80" style={{ left: '53.33px', top: '122.48px', width: '150px', textAlign: 'center' }}>{data.subtitle}</h4>
            <p className="absolute font-montserrat text-[13.3323px] w-[173px] leading-[16px] text-center text-white opacity-90" style={{ left: '39.16px', top: '214.98px' }}>{data.description}</p>
        </div>
    );
};

export default function LandingPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        document.body.style.backgroundColor = "#212121";
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % panelsData.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    const getPosition = (index, currentIndex, total) => {
        if (index === currentIndex) return 'center';
        const leftIndex = (currentIndex - 1 + total) % total;
        if (index === leftIndex) return 'left';
        const rightIndex = (currentIndex + 1) % total;
        if (index === rightIndex) return 'right';
        return 'hidden';
    };
    return (
        <>
            <style>{`.text-shadow { text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); } .carousel-element { transition: all 1s cubic-bezier(0.76, 0, 0.24, 1); } `}</style>
            <div className="relative w-[1440px] h-[3326px] mx-auto">
                <header>
                    <div className="absolute w-[70px] h-[70px] left-[40px] top-[22px] bg-[#D9D9D9] rounded-full"></div>
                    <div className="absolute w-[25px] h-[25px] left-[63px] top-[44px] bg-[#201F1F] rounded-full"></div>
                    <h1 className="absolute w-[352px] h-[87px] left-[127px] top-[37px] font-poppins font-bold text-3xl leading-[48px] text-white">AgileAtlas</h1>
                    <div className="absolute w-[408px] h-[55px] left-[317px] top-[39px] bg-[#303030] rounded-[20px]"></div>
                    <nav className="absolute w-[408px] h-[55px] left-[317px] top-[39px] flex items-center justify-around">
                        <a href="#" className="font-montserrat font-semibold text-xl text-white text-shadow">Reviews</a>
                        <a href="#" className="font-montserrat font-semibold text-xl text-white text-shadow">Discover</a>
                        <a href="#" className="font-montserrat font-semibold text-xl text-white text-shadow">About</a>
                    </nav>
                    {/* UPDATED LINKS BELOW */}
                    <div className="absolute w-[112px] h-[55px] left-[1094px] top-[34px] bg-[#303030] rounded-[20px] flex justify-center items-center">
                      <Link to="/login" className="font-montserrat font-semibold text-xl text-white text-shadow">Login</Link>
                    </div>
                    <div className="absolute w-[144px] h-[55px] left-[1223px] top-[34px] bg-[#36B083] rounded-[20px] flex justify-center items-center">
                      <Link to="/signup" className="font-montserrat font-semibold text-xl text-black">get started</Link>
                    </div>
                    <div className="absolute w-[1440px] h-0 left-0 top-[113px] border border-[#847F7F]"></div>
                </header>
                <main>
                    {/* ... (rest of the page) ... */}
                </main>
            </div>
        </>
    );
}