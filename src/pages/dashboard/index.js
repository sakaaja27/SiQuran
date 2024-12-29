import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();

    // buat ketika refresh ga blik ke dash lagi
    const [currentComponent, setCurrentComponent] = useState(() => {
        // Cek path dari URL
        const pathMap = {
            '/dashboard/read': 'read',
            '/dashboard/bookmark': 'bookmark',
            '/dashboard/settings': 'settings',
            '/dashboard': 'dashboard',
            '/': 'dashboard'
        };
        return pathMap[location.pathname] || 'dashboard';
    }); 

    useEffect(() => {
        // Update localStorage
        localStorage.setItem('currentComponent', currentComponent);
        
        // Update URL berdasarkan currentComponent
        switch (currentComponent) {
            case 'read':
                navigate('/dashboard/read');
                break;
            case 'bookmark':
                navigate('/dashboard/bookmark');
                break;
            case 'settings':
                navigate('/dashboard/settings');
                break;
            default:
                navigate('/dashboard');
        }
    }, [currentComponent, navigate]);

    const renderMainContent = () => {
        return (
            <>
                <Header/>
                <MainContent/>
                <Button setCurrentComponent={setCurrentComponent} />
            </>
        );
    };
    return (
        <>
            <div
                className="flex flex-col h-screen bg-cover bg-center hidden md:block"
                style={{ backgroundImage: `url('/assets/bg.png')` }}>
                {currentComponent === 'dashboard' ? renderMainContent() : <Outlet />}
            </div>
            <div
                className="flex flex-col h-screen bg-gradient-to-b from-[#61ab48] to-[#273039] md:hidden">
                 {currentComponent === 'dashboard' ? renderMainContent() : <Outlet />}  
            </div>
        </>
    );
}

function Header() {
    return (
        <div className="px-4 py-4">
            <div className="flex items-center">
                <img 
                    src="../../assets/quran_ikon.png" 
                    alt="Logo" 
                    className="w-7 h-7 mr-3" 
                    data-aos="fade-down-left"
                />
                <h3 className="text-white font-bold text-xl" data-aos="fade-down-left">
                    Ayo Ngaji
                </h3>
            </div>
        </div>
    );
}

function MainContent() {
    
    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-9 px-4">
            <div className="w-full flex flex-col items-center">
                <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left mb-8 ">
                    <div className="mb-6 md:mr-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mr-32" data-aos="fade-up-right">
                            Selalu Baca Quran.
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-2 md:mr-32" data-aos="fade-up-right">
                            Di mana pun, kapan pun.
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white md:mr-32" data-aos="fade-up-right">
                            Ayo Ngaji!
                        </h2>
                    </div>
                    <div className="flex items-center mb-6 md:mb-0 " data-aos="fade-up-left">
                        <img src="../../assets/quran_ikon.png" alt="Quran" className="w-32 h-32 md:w-60 md:h-60" />
                    </div>
                </div>
                
            </div>
        </div>
    );
}

function Button({setCurrentComponent}){
    const [selectedButton, setSelectedButton] = useState(null);
    
    useEffect(() => {
        AOS.init();
    }, []);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);
        setCurrentComponent(buttonName);
    };
    return(
        <div className="w-full flex flex-col items-center md:flex-row md:justify-start md:items-start space-y-2 md:space-y-0 md:space-x-2">
            <div className="w-auto flex flex-col md:ml-40 md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button className={`font-semibold px-4 py-2 rounded-full w-48 md:w-auto ${selectedButton === 'read' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('read')}>
                    Read Quran
                </button>
                <button className={`font-semibold px-4 py-2 rounded-full w-48 md:w-auto ${selectedButton === 'bookmark' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('bookmark')}>
                    Bookmark
                </button>
                {/* <button className={`font-semibold px-4 py-2 rounded-full w-48 md:w-auto mb-4 md:mb-0 ${selectedButton === 'settings' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('settings')}>
                    Settings
                </button> */}
            </div>
        </div>
    )
}



