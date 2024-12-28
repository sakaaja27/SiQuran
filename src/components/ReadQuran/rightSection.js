import { FcUpRight } from "react-icons/fc";
import { FcMusic } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { useEffect, useRef, useState } from 'react';
import 'aos/dist/aos.css';
export default function RightSection({detailSurah}) {
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
                            ayat={dataayat.ar} 
                            nomorAyat={dataayat.nomor} 
                            artiAyat={dataayat.idn} 
                            ayatLatin={dataayat.tr} 
                            voiceSurah={dataayat.audio}
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

function ItemAyat({ ayat, nomorAyat, ayatLatin, artiAyat }) {
    return (
        <div className="mx-4 my-2 p-4 border border-green-500 rounded-md shadow-md bg-white hover:bg-green-100 transition duration-200 ease-in-out">
            <div className="flex justify-end mb-3">
                <h3 className="text-2xl font-bold text-green-700">{ayat}</h3>
            </div>
            <div className="flex justify-end mb-5">
                <h5 className="text-sm font-bold text-green-600">{ayatLatin}</h5>
            </div>
            <span className="text-sm font-light text-green-800">{nomorAyat} . {artiAyat}</span>
        </div>
    );
}