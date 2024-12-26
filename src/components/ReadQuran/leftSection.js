import { useState } from "react";
import ListSurah from "./listSurah"

export default function LeftSection({listSurah , getDetailSurah}) {
    const [searchSurah, setSearchSurah] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    function onChangeHandler(e){
        e.preventDefault();
        setSearchSurah(e.target.value);
        
        if(searchSurah.length > 1){
            const result = listSurah.filter((surah) => surah.nama_latin.toLowerCase().includes(searchSurah.toLowerCase()));
            setSearchResult(result);
        }
        console.log(searchResult);
    }


    return(
        <div className="bg-teal-200 basis-1/4 flex flex-col">
            {/* search surah */}
            <InputSearch value={searchSurah} onChange={onChangeHandler}/>

            {/* list surah */}
            <ListSurah listSurah={searchSurah.length > 1 ? searchResult : listSurah} getDetailSurah={getDetailSurah}/>
        </div>
    )
}

function InputSearch({value, onChange}){
    return (
        <div className="bg-teal-400 p-4 w-full h-20 relative">
            <img src="https://img.icons8.com/color/search" alt="search" className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input type="text" placeholder="Search Surah" className="w-full h-full bg-teal-100 border-2 border-teal-700 rounded-full p-2 pl-10 pb-3 text-slate-500" value={value} onChange={(e) => onChange(e)}/>
        </div>
    )
}

