import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Read from '../readQuran';

export default function Dashboard() {
    const [currentComponent, setCurrentComponent] = useState('main'); 

    const renderComponent = () => {
        switch (currentComponent) {
            case 'read':
                return <Read />; 
            case 'main':
            default:
                return (
                    <>
                    <Header/>
                    <MainContent/>
                    <Button setCurrentComponent={setCurrentComponent} />
                    </>
                );
        }
    };
    return (
        <>
            <div
                className="flex flex-col h-screen bg-cover bg-center hidden md:block"
                style={{ backgroundImage: `url('/assets/bg.png')` }}>
                {renderComponent()}
            </div>
            <div
                className="flex flex-col h-screen bg-gradient-to-b from-[#61ab48] to-[#273039] md:hidden">
                {renderComponent()}
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
                            Read Quran Everyday.
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white mb-2 md:mr-32" data-aos="fade-up-right">
                            Add On Your Daily
                        </h2>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white md:mr-32" data-aos="fade-up-right">
                            Routine
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
        if (buttonName === 'read') {
            setCurrentComponent('read');
        }
    };
    return(
        <div className="w-full flex flex-col md:flex-row md:justify-start items-center md:items-start space-y-2 md:space-y-0 md:space-x-2">
            <div className="w-full md:w-auto md:ml-40 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                <button className={`font-semibold px-4 py-2 rounded-full w-full md:w-auto ${selectedButton === 'read' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('read')}>
                    Read Quran
                </button>
                <button className={`font-semibold px-4 py-2 rounded-full w-full md:w-auto ${selectedButton === 'bookmark' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('bookmark')}>
                    Bookmark
                </button>
                <button className={`font-semibold px-4 py-2 rounded-full w-full md:w-auto mb-4 md:mb-0 ${selectedButton === 'settings' ? 'bg-white text-green-400' : 'bg-green-400 text-white'} hover:bg-white hover:text-green-400`} onClick={() => handleButtonClick('settings')}>
                    Settings
                </button>
            </div>
        </div>
    )
}

function InputSearch(){
    return (
        <div className="p-4 w-full max-w-md relative">
            <img 
                src="https://img.icons8.com/color/search" 
                alt="search" 
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-5 h-5" 
            />
            <input 
                type="text" 
                placeholder="Search Surah" 
                className="w-full bg-teal-100 border-2 border-teal-700 rounded-full p-2 pl-10 text-slate-500" 
            />
        </div>
    )
}

