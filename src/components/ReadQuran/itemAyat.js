import { IoBookmarksOutline } from "react-icons/io5";
import { FaReadme } from "react-icons/fa";
import { useEffect, useState } from "react";
import { IoBookmarks } from "react-icons/io5";

export default function ItemAyat({ dataayat, detailTafsir, nomorAyat,setBookmark,onBookmark }) {
    const [showTafsirModal, setShowTafsirModal] = useState(false);
    const [tafsirAyat, setTafsirAyat] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() =>{
        // Periksa localStorage saat komponen dimuat
        const bookmark = localStorage.getItem('bookmark');
        if (bookmark) {
            const parsedBookmark = JSON.parse(bookmark);
            // Bandingkan nomor ayat untuk menentukan bookmark
            setIsBookmarked(parsedBookmark.nomor === dataayat.nomor);
        }
    },[dataayat.nomor]);

    const openTafsirModal = () => {
        if(dataayat.tafsir){
            setTafsirAyat(dataayat.tafsir);
        } else if(detailTafsir && detailTafsir.tafsir) {
            const ayatTafsir = detailTafsir.tafsir.find((item) => item.ayat === nomorAyat);
            setTafsirAyat(ayatTafsir ? ayatTafsir.tafsir : "Tafsir tidak tersedia");
        } else {
            setTafsirAyat("Tafsir tidak tersedia");
        }
        setShowTafsirModal(true);
    };


    const closeTafsirModal = () => {
        setShowTafsirModal(false);
        setTafsirAyat(null);
    };

    const handleBookmark = () => {
        
        // toggle bookmark
        setBookmark(dataayat);
        // update state local
        setIsBookmarked(!isBookmarked);
    }

    const isLatestBookmark = () => {
        const bookmark = localStorage.getItem('bookmark');
        if (bookmark) {
            const parsedBookmark = JSON.parse(bookmark);
            return parsedBookmark.nomor === dataayat.nomor;
        }
        return false;
    };

    return (
        <>
            <div className="mx-4 my-2 p-4 border border-green-500 rounded-md shadow-md bg-white hover:bg-green-100 transition duration-200 ease-in-out">
                <div className="flex justify-end mb-3">
                    
                    <h3 className="text-2xl font-bold text-green-700">{dataayat.ar}</h3>
                </div>
                <div className="flex justify-end mb-5">
                    <h5 className="text-sm font-bold text-green-600">{dataayat.tr}</h5>
                </div>
                <span className="text-sm font-light text-green-800">{dataayat.nomor} . {dataayat.idn}</span>
                <div className="flex justify-end mt-5">
                    <span 
                        className="flex items-center justify-center bg-green-200 p-2 rounded-md shadow-md ml-4 font-semibold text-green-600 cursor-pointer"
                        onClick={openTafsirModal}
                    >
                        <FaReadme className="w-6 h-6 text-green-700 mr-2" /> Tafsir Ayat
                    </span>
                    <span 
                        className="flex items-center justify-center bg-green-200 p-2 rounded-md shadow-md ml-2 cursor-pointer" 
                        onClick={handleBookmark}>
                        {isLatestBookmark() ? (
                            <IoBookmarks className="w-6 h-6 text-green-700 mr-2" />
                        ) : (
                            <IoBookmarksOutline className="w-6 h-6 text-gray-400 mr-2" />   
                        )}
                    </span>
                </div>
            </div>

            {/* Modal Tafsir */}
            {showTafsirModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[80vh] flex flex-col p-6 relative">
                        {/* Header tetap fixed */}
                        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-green-700">
                                Tafsir Ayat {nomorAyat}
                            </h2>
                            <button 
                                onClick={closeTafsirModal} 
                                className="text-red-500 hover:text-red-700 text-2xl"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="flex-grow overflow-y-auto pr-2">
                            <div className="text-green-800 leading-relaxed">
                                {tafsirAyat || "Tafsir tidak tersedia"}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}