import React, { useState, useEffect } from 'react';

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
                    <div className="absolute w-[112px] h-[55px] left-[1094px] top-[34px] bg-[#303030] rounded-[20px] flex justify-center items-center"><a href="#" className="font-montserrat font-semibold text-xl text-white text-shadow">Login</a></div>
                    <div className="absolute w-[144px] h-[55px] left-[1223px] top-[34px] bg-[#36B083] rounded-[20px] flex justify-center items-center"><a href="#" className="font-montserrat font-semibold text-xl text-black">get started</a></div>
                    <div className="absolute w-[1440px] h-0 left-0 top-[113px] border border-[#847F7F]"></div>
                </header>
                <main>
                    <div className="absolute w-[1282.31px] h-[737px] left-[79px] top-[180px] bg-[#303030] rounded-[27.9167px]"></div>
                    <h2 className="absolute w-[698.85px] h-[76.31px] left-[117.15px] top-[233.97px] font-montserrat font-bold text-[59.5556px] leading-[73px] text-white">Built on Skills, Driven by Collaboration</h2>
                    <p className="absolute w-[649.53px] h-[77.24px] left-[129.44px] top-[409.2px] font-montserrat font-bold text-[29.7778px] leading-[36px] text-white/70">Skip the noise, verify talent, find your crew, and ship projects that matter</p>
                    <div className="absolute w-[425.57px] h-[638.36px] left-[774px] top-[329px] bg-gray-500 rounded-[34.9428px] -rotate-90 flex items-center justify-center"><span className="text-white">Image: 8839285.jpg</span></div>
                    <div className="absolute w-[356.4px] h-[92.12px] left-[257.67px] top-[659.24px] bg-[#36B083] rounded-[18.6111px]"></div>
                    <span className="absolute left-[288px] top-[686px] font-montserrat font-bold text-[26px] leading-[32px] text-white opacity-80">Build Together</span>
                    <div className="absolute w-[39px] h-[20px] left-[506px] top-[694.5px] opacity-90 border-[3px] border-white"></div>
                </main>
                <section>
                    <div className="absolute w-[905.76px] h-[414.13px] left-[258px] top-[1144px] bg-[#303030] rounded-[16.6653px]"></div>
                    <div id="carousel-container" className="absolute w-full h-full">{panelsData.map((panel, index) => (<CarouselPanel key={panel.id} data={panel} position={getPosition(index, currentIndex, panelsData.length)} />))}</div>
                    <div className="absolute w-[48px] h-[48px] left-[687px] top-[1516px] bg-gray-500 opacity-50 flex items-center justify-center text-center text-white text-xs">dots-48</div>
                    <div className="absolute w-[224.15px] h-[7.5px] left-[596.31px] top-[1512.3px] bg-[#20CD26] opacity-30 blur-[7px] rounded-full"></div>
                </section>
                <section>
                    <h2 className="absolute left-[145px] top-[1796px] font-montserrat font-bold text-5xl text-white">How it works?</h2>
                    <div className="absolute w-[344.14px] h-[213.64px] left-[149px] top-[1925.89px] bg-gray-500 rounded-[13.4px] flex items-center justify-center text-white">gif.png</div>
                    <div className="absolute w-[344.14px] h-[213.64px] left-[552.14px] top-[1925px] bg-gray-500 opacity-80 shadow-[inset_0px_3.57px_3.57px_rgba(0,0,0,0.25)] rounded-[13.4px] flex items-center justify-center text-white">internet GIF</div>
                    <div className="absolute w-[344.14px] h-[213.64px] left-[958.86px] top-[1925.89px] bg-gray-500 opacity-70 shadow-[inset_0px_3.57px_3.57px_rgba(0,0,0,0.25)] rounded-[13.4px] flex items-center justify-center text-white">Happy Loop GIF</div>
                    <p className="absolute w-[437.11px] left-[166px] top-[2169px] font-montserrat font-bold text-center text-[21.4531px] leading-[26px] text-white opacity-80">create a new project</p>
                    <p className="absolute w-[437.11px] left-[515px] top-[2169px] font-montserrat font-bold text-center text-[21.4531px] leading-[26px] text-white opacity-80">collaborate</p>
                    <p className="absolute w-[437.11px] left-[980px] top-[2169px] font-montserrat font-bold text-center text-[21.4531px] leading-[26px] text-white opacity-80">Build</p>
                </section>
                <section>
                    <h2 className="absolute w-[220px] h-[59px] left-[145px] top-[2360px] font-montserrat font-bold text-5xl text-white">Features</h2>
                    <div className="absolute w-[26px] h-[26px] left-[248px] top-[2381px] bg-[#201F1F] rounded-full"></div>
                    <div className="absolute w-[259px] h-[346px] left-[242px] top-[2498px] bg-[#303030] shadow-[12px_10px_12px_2px_rgba(0,0,0,0.25)] rounded-[30px]"></div>
                    <div className="absolute w-[229px] h-[174px] left-[257px] top-[2527px] bg-black border border-black rounded-[20px]"></div>
                    <div className="absolute w-[72px] h-[72px] left-[281px] top-[2555px] bg-[#D9D9D9] rounded-full"></div>
                    <div className="absolute w-[26px] h-[26px] left-[304px] top-[2578px] bg-[#201F1F] rounded-full"></div>
                    <h3 className="absolute w-[218px] left-[268px] top-[2715px] text-center font-montserrat font-bold text-xl text-white">Community Driven</h3>
                    <p className="absolute w-[216px] left-[272px] top-[2762px] text-center font-montserrat font-bold text-[11px] leading-[13px] text-white opacity-70">“Connect with developers, designers, and innovators worldwide.”</p>
                    <div className="absolute w-[258px] h-[346px] left-[609px] top-[2498px] bg-[#303030] shadow-[12px_10px_12px_2px_rgba(0,0,0,0.25)] rounded-[30px]"></div>
                    <div className="absolute w-[223px] h-[174px] left-[628px] top-[2527px] bg-gray-500 rounded-[20px] flex items-center justify-center text-white">Life Code GIF</div>
                    <h3 className="absolute w-[218px] left-[629px] top-[2718px] text-center font-montserrat font-bold text-xl text-white">Hire freelancers</h3>
                    <p className="absolute w-[186px] left-[648px] top-[2765px] text-center font-montserrat font-bold text-[11px] leading-[13px] text-white opacity-70">“Find and hire verified talent for your next project”</p>
                    <div className="absolute w-[258px] h-[346px] left-[976px] top-[2498px] bg-[#303030] shadow-[0px_4px_4px_rgba(0,0,0,0.25),_0px_4px_4px_rgba(0,0,0,0.25),_12px_10px_12px_2px_rgba(0,0,0,0.25)] rounded-[30px]"></div>
                    <div className="absolute w-[228px] h-[174px] left-[995px] top-[2527px] bg-gray-500 rounded-[20px] flex items-center justify-center text-white">Art GIF</div>
                    <h3 className="absolute w-[218px] left-[996px] top-[2718px] text-center font-montserrat font-bold text-xl text-white">Secure & Private</h3>
                    <p className="absolute w-[221px] left-[999px] top-[2765px] text-center font-montserrat font-bold text-[11px] leading-[13px] text-white opacity-70">“Your data and projects are protected with enterprise-level security.”</p>
                </section>
                <footer className="absolute w-[1377px] h-[180px] left-[31px] top-[3124px] bg-[#303030] rounded-[20px]">
                    <div className="relative w-full h-full">
                        <h4 className="absolute left-[76px] top-[43px] font-montserrat font-semibold text-xl text-white">Follow us</h4>
                        <div className="absolute w-[26px] h-[26px] left-[211px] top-[43px] bg-gray-400 rounded-full"></div>
                        <div className="absolute w-[26px] h-[26px] left-[268px] top-[43px] bg-gray-400 rounded-full"></div>
                        <div className="absolute w-[26px] h-[26px] left-[325px] top-[43px] bg-gray-400 rounded-full"></div>
                        <div className="absolute w-[26px] h-[26px] left-[388px] top-[43px] bg-gray-400 rounded-full"></div>
                        <div className="absolute w-[1288.01px] h-0 left-[76px] top-[90px] border border-white transform rotate-[0.18deg]"></div>
                        <div className="absolute left-[76px] top-[128px] w-[1288px] flex justify-between items-center">
                            <p className="font-montserrat font-semibold text-base text-white">@ 2025 Agile Atlas</p>
                            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-montserrat font-semibold text-xl text-white">
                                <a href="#">Terms of Services</a><a href="#">Privacy Policy</a><a href="#">Accessibility</a><a href="#">Cookie Settings</a><a href="#">Legal Notice</a><a href="#">FAQ</a>
                            </nav>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}