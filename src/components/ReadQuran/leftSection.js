import ListSurah from "./listSurah"

export default function LeftSection({listSurah}) {
    return(
        <div className="bg-teal-200 basis-1/4 flex flex-col">
            {/* search surah */}
            <InputSearch/>

            {/* list surah */}
            <ListSurah listSurah={listSurah}/>
        </div>
    )
}

function InputSearch() {
    return (
        <div className="bg-teal-400 p-4 w-full h-20 relative">
            <img src="https://img.icons8.com/color/search" alt="search" className="absolute left-7 top-1/2 transform -translate-y-1/2 w-5 h-5" />
            <input type="text" placeholder="Search Surah" className="w-full h-full bg-teal-100 border-2 border-teal-700 rounded-full p-2 pl-10 pb-3 text-slate-500"/>
        </div>
    )
}

