
export default function ListSurah({listSurah}) {
    return(
        <div className="p-4 w-full h-full overflow-y-auto">
            {/* itemSurah */}
            {listSurah.map((surah,index) => (
                <ItemSurah
                    nomor={surah.nomor}
                    namaArab={surah.nama}
                    namaSurah={surah.nama_latin}
                    artiSurah={surah.arti}
                    tempatTurun={surah.tempat_turun}
                    jumlahAyat={surah.jumlah_ayat}
                />
            ))}
        </div>
    )
}

function ItemSurah({nomor,namaArab,namaSurah,artiSurah,jumlahAyat,tempatTurun}) {
    return(
        <div className="h-20 w-full border-b-2 border-teal-500 flex mb-2">
            <div className="basis-9 flex justify-end mr-3">
                <h3 className=" text-teal-700 font-bold outline-star">{nomor}</h3> 
            </div>
            <div className="flex flex-col">
                <h3 className="text-xl text-teal-700 font-bold font-quicksand">{namaArab} , {namaSurah}</h3> 
                <h5 className="text-teal-800 font-bold text-sm font-quicksand">{artiSurah}</h5>
                <span className="text-teal-700 font-normal text-sm font-quicksand">{tempatTurun}, {jumlahAyat} ayat</span>
            </div>
        </div>
    )
}