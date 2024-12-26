
import { useEffect, useState } from "react";
import LeftSection from "../../components/ReadQuran/leftSection";
import RightSection from "../../components/ReadQuran/rightSection";
import { QuranApi } from "../../services/quran_api";
import '../../index.css';

export default function Read(){
    const [listSurah, setListSurah] = useState([]);
    useEffect(() => {
        getSurah();
    },[]);

    async function getSurah(){
        const surah = await QuranApi.getSurah();
        setListSurah(surah);
    }

    return(
        <div className="bg-slate-500 flex w-full h-screen">
            {/* bagian kiri */}
            <LeftSection listSurah={listSurah}/>
            {/* bagian kanan */}
              <RightSection/>
        </div>
    )
}