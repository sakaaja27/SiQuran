export default function RightSection({detailSurah}) {
    return(
        <div className="bg-teal-50 basis-3/4 flex flex-col">
            {/*  judul */}
            <Header namaSurah={detailSurah.nama_latin} namaArab={detailSurah.nama}/>

            {/* list ayat */}
            <div className="w-full h-full overflow-y-auto">
                {
                    detailSurah.ayat ? detailSurah.ayat.map((dataayat,index) => (
                        <ItemAyat key={index} ayat={dataayat.ar} nomorAyat={dataayat.nomor} artiAyat={dataayat.idn} ayatLatin={dataayat.tr}/>
                    )) : null
                }
            </div>
        </div>
    )
}

function Header({namaSurah , namaArab}) {
    return (
        <div className="mx-4 my-2 h-[89px] flex items-center justify-between px-9 border-b-2 bg-teal-200 rounded-md shadow-md mb-4">
            <h3 className="text-teal-700 font-bold text-3xl">{namaArab} - {namaSurah}</h3>
            {namaSurah ? ( 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                    <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                </svg>
            ) : null} 
        </div>
    )
}

function ItemAyat({ ayat, nomorAyat, ayatLatin, artiAyat }) {
    return (
        <div className="mx-4 my-2 p-4 border border-teal-500 rounded-md shadow-md bg-white hover:bg-teal-100 transition duration-200 ease-in-out">
            <div className="flex justify-end mb-3">
                <h3 className="text-2xl font-bold text-teal-700">{ayat}</h3>
            </div>
            <div className="flex justify-end mb-5">
                <h5 className="text-sm font-bold text-teal-600">{ayatLatin}</h5>
            </div>
            <span className="text-sm font-light text-teal-800">{nomorAyat} . {artiAyat}</span>
        </div>
    );
}