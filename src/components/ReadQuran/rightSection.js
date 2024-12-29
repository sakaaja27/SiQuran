import { FcUpRight } from "react-icons/fc";
import { FcMusic } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { useEffect, useRef, useState } from 'react';

import 'aos/dist/aos.css';
import ItemAyat from "./itemAyat";
export default function RightSection({detailSurah ,detailTafsir}) {
    const [onBookmark, setOnBookmark] = useState({});

    function setBookmark(value) {
        const bookmark = localStorage.getItem('bookmark');

        const ayatTafsir = detailTafsir.tafsir.find(
            (item) => item.ayat === value.nomor
        );

        const namaSurah = detailSurah.nama_latin || "Surah tidak ada";

        const bookmarkData = {
            ...value,
            tafsir: ayatTafsir ? ayatTafsir.tafsir : "Tafsir tidak tersedia",
            namaSurah: namaSurah,

        }

        if (bookmark && JSON.parse(bookmark)["id"] === value.id) {
            setOnBookmark({});
            return localStorage.removeItem('bookmark');
        }
        localStorage.setItem('bookmark', JSON.stringify(bookmarkData));
        setOnBookmark(bookmarkData);
    }

    useEffect(() => {
        const bookmark = localStorage.getItem('bookmark');
        if (bookmark) {
            setOnBookmark(bookmark);
        }
        
    },[]);
    return(
        <div className="bg-green-50 w-full h-full flex flex-col overflow-hidden" >
            {/*  judul */}
            <Header 
                namaSurah={detailSurah.nama_latin} 
                namaArab={detailSurah.nama} 
                voiceSurah={detailSurah.audio}
                key={detailSurah.nomor}
            />

            {/* list ayat */}
            <div className="w-full flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-green-500 scrollbar-track-green-100">
                {
                    
                    detailSurah.ayat ? detailSurah.ayat.map((dataayat,index) => (
                        <ItemAyat 
                            key={index} 
                            dataayat={dataayat}
                            
                            voiceSurah={dataayat.audio}
                            surahNomor={detailSurah.nomor}
                            detailTafsir={detailTafsir}
                            nomorAyat={dataayat.nomor}
                            setBookmark={setBookmark}
                            onBookmark={onBookmark}
                        />
                        
                    )) : null
                }
            </div>
        </div>
    )
    
}

let globalAudio = null;

function Header({namaSurah , namaArab , voiceSurah}) {
    const [play, setPlay] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if(globalAudio){
            globalAudio.pause();
            globalAudio = null;
        }
        setPlay(false);

        if(audioRef.current){
            audioRef.current = null;
        }
    },[voiceSurah]);

    const handlePlay = () => {
        if (!audioRef.current) {
           if(globalAudio){
               globalAudio.pause();
           }
           audioRef.current = new Audio(voiceSurah);
           globalAudio = audioRef.current;
           
           audioRef.current.addEventListener('ended', () => {
               setPlay(false);
               globalAudio = null;
           })
        }

        if (play) {
            audioRef.current.pause();
            setPlay(false);
        } else {
            audioRef.current.play();
            setPlay(true);
        }
    };
    return (
        <div className="md:mx-4 mx-4 my-2 h-[70px] min-h-[70px] max-h-[70px] flex items-center justify-between px-9 border-b-2 bg-green-200 rounded-md shadow-md mb-4">
            <h3 className="mx-8 text-green-700 font-bold text-3xl md:text-3xl sm:text-xl text-xl flex items-center " >
                {namaSurah ? (
                    `${namaArab} , ${namaSurah}` 
                ) : (
                    <>
                        <img 
                            src="../../assets/quran_ikon.png" 
                            alt="Quran Icon" 
                            className="w-8 h-8 mr-2"    
                        />
                        Ayo Ngaji
                    </>
                )}
            </h3>
            <div className="flex items-center space-x-8">
                {namaSurah ? ( 
                    
                    <div onClick={handlePlay} className="cursor-pointer hover:opacity-70 transition-opacity:">
                        {play ? (
                            <FcMediumPriority className="w-6 h-6" /> 
                        ) : (
                            <FcMusic className="w-6 h-6" />
                        )}
                    </div>

                    
                ) : null} 
                <div className='' >
                    <a href='/'>
                        <FcUpRight className="w-6 h-6"/>
                    </a>
                </div>
            </div>
        </div>
        
    )
}

