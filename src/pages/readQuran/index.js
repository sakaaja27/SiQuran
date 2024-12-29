import { useEffect, useState } from "react";

import LeftSection from "../../components/ReadQuran/leftSection";
import RightSection from "../../components/ReadQuran/rightSection";
import { QuranApi } from "../../services/quran_api";
import '../../index.css';

export default function Read(){
    const [listSurah, setListSurah] = useState([]);
    const [detailSurah, setDetailSurah] = useState({});
    const [detailTafsir, setDetailTafsir] = useState({});

    useEffect(() => {
        getSurah();
    },[]);

    async function getSurah(){
        const surah = await QuranApi.getSurah();
        setListSurah(surah);
    }

    async function getDetailSurah(nomor){
        const detailSurah = await QuranApi.getDetailSurah(nomor);
        setDetailSurah(detailSurah);

        // Panggil tafsir setelah detail surah didapatkan
        const detailTafsir = await QuranApi.getDetailTafsir(nomor);
        setDetailTafsir(detailTafsir);
    }

    

    return(
        <div className="bg-slate-500 flex w-full h-screen">
            {/* bagian kiri */}
            <LeftSection listSurah={listSurah} getDetailSurah={getDetailSurah} />
            
            {/* bagian kanan */}
            <div className="w-full md:basis-3/4 h-full">
            <RightSection 
                    detailSurah={detailSurah} 
                    detailTafsir={detailTafsir}
                />
            </div>
        </div>
    )
}