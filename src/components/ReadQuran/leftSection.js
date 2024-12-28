import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import ListSurah from "./listSurah";

export default function LeftSection({listSurah, getDetailSurah}) {
    const [searchSurah, setSearchSurah] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [isLeftSectionOpen, setIsLeftSectionOpen] = useState(false);

    function onChangeHandler(e){
        e.preventDefault();
        setSearchSurah(e.target.value);
        
        if(searchSurah.length > 1){
            const result = listSurah.filter((surah) => 
                surah.nama_latin.toLowerCase().includes(searchSurah.toLowerCase())
            );
            setSearchResult(result);
        }
    }

    const toggleLeftSection = () => {
        setIsLeftSectionOpen(!isLeftSectionOpen);
    };

    return(
        <>
            {/* Tombol Hamburger untuk Mobile */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <button 
                    onClick={toggleLeftSection} 
                    className="text-white bg-green-500 p-2 rounded-md"
                >
                    {isLeftSectionOpen ? <FaTimes className="w-6 h-6"/> : <FaBars className="w-6 h-6"/>}
                </button>
            </div>

            {/* Left Section */}
            <div className={`
                bg-green-200 
                fixed 
                top-0 
                left-0 
                h-full 
                w-[300px] 
                transform 
                transition-transform 
                duration-300 
                ease-in-out 
                z-40
                md:relative 
                md:block 
                md:basis-1/4 
                md:static 
                md:w-auto
                ${isLeftSectionOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
            `}>
                {/* Container untuk memberi padding dan scroll */}
                <div className="flex flex-col h-full">
                    {/* Search Section */}
                    <div className="bg-green-400 p-4 w-full h-20 relative">
                        <img 
                            src="https://img.icons8.com/color/search" 
                            alt="search" 
                            className="absolute md:left-7 left-20 top-1/2 transform -translate-y-1/2 w-5 h-5" 
                        />
                        <input 
                            type="text" 
                            placeholder="Search Surah" 
                            className="md:ml-0 ml-12 md:w-full w-52 h-full bg-green-100 border-2 border-green-700 rounded-full p-2 pl-10 pb-3 text-slate-500" 
                            value={searchSurah} 
                            onChange={(e) => onChangeHandler(e)}
                        />
                    </div>

                    {/* List Surah */}
                    <div className="flex-grow overflow-y-auto">
                        <ListSurah 
                            listSurah={searchSurah.length > 1 ? searchResult : listSurah} 
                            getDetailSurah={(nomor) => {
                                getDetailSurah(nomor);
                                // Tutup sidebar di mobile setelah memilih surah
                                setIsLeftSectionOpen(false);
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Overlay untuk mobile ketika sidebar terbuka */}
            {isLeftSectionOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={toggleLeftSection}
                ></div>
            )}
        </>
    )
}