import { useState } from "react";

export default function ListSurah({listSurah , getDetailSurah}) {
    const [selectedNomor, setSelectedNomor] = useState(null); 
    const handleItemClick = (nomor) => {
        setSelectedNomor(nomor); 
    };

    return(
        <div className="p-4 w-full h-full overflow-y-auto">
            {/* itemSurah */}
            {listSurah.map((surah,index) => (
                <div onClick={() => getDetailSurah(surah.nomor)} key={index}>
                    <ItemSurah
                        key={index}
                        nomor={surah.nomor}
                        namaArab={surah.nama}
                        namaSurah={surah.nama_latin}
                        artiSurah={surah.arti}
                        tempatTurun={surah.tempat_turun}
                        jumlahAyat={surah.jumlah_ayat}
                        isSelected={selectedNomor === surah.nomor}
                        onItemClick={handleItemClick}
                    />
                </div>
            ))}
        </div>
    )
}

function ItemSurah({ nomor, namaArab, namaSurah, artiSurah, jumlahAyat, tempatTurun, isSelected, onItemClick }) {
    const handleCardClick = () => {
        onItemClick(nomor); 
    };

    return (
        <div
            className={`h-[85px] w-full border-b-2 rounded-md p-2 border-teal-500 flex mb-2 cursor-pointer 
                ${isSelected ? 'bg-cyan-400' : 'bg-white'} 
                ${isSelected ? 'text-white' : 'text-teal-700'} 
                hover:${isSelected ? 'text-white' : 'text-teal-700'}`} 
            onClick={handleCardClick}>
            <div className="basis-9 flex justify-end mr-3">
                <h3 className={`font-bold outline-star`}>{nomor}</h3>
            </div>
            <div className="flex flex-col">
                <h3 className={`text-xl font-bold font-quicksand`}>{namaArab} , {namaSurah}</h3>
                <h5 className={`font-bold text-sm font-quicksand`}>{artiSurah}</h5>
                <span className={`font-normal text-sm font-quicksand`}>{tempatTurun}, {jumlahAyat} ayat</span>
            </div>
        </div>
    );
}