import {  useEffect, useState } from "react";
import { FcUpRight } from "react-icons/fc";
import ItemAyat from "../../components/ReadQuran/itemAyat";

export default function Book() {
    const [bookmarks, setBookmarks] = useState([]);
    const [namaSurah, setNamaSurah] = useState('');

    useEffect(() => {
        const storedBookmarks = localStorage.getItem('bookmark');
        if (storedBookmarks) {
            const bookmarkData = JSON.parse(storedBookmarks);
            setBookmarks([bookmarkData]);
            setNamaSurah([bookmarkData.namaSurah]);
        }
    }, []);

    return (
        <div className="bg-green-200 w-full h-full flex flex-col">
            <Header />
            <div className="flex flex-col items-center justify-center flex-grow">
                <div className="bg-green-200 p-4 text-center">
                    <h1 className="text-3xl font-bold text-green-800">
                        {namaSurah}
                    </h1>
                </div>
                {bookmarks.map((bookmark, index) => (
                    <div key={index} className="w-full">
                        <ItemAyat 
                            dataayat={bookmark}
                            nomorAyat={bookmark.nomor}
                            detailTafsir={{
                                tafsir: [{
                                    ayat: bookmark.nomor,
                                    tafsir: bookmark.tafsir
                                }]
                            }}
                            setBookmark={() => {
                                // Hapus bookmark
                                localStorage.removeItem('bookmark');
                                setBookmarks([]);
                                setNamaSurah('');
                            }}
                            onBookmark={bookmark}
                        />
                    </div>
                ))}
                {bookmarks.length === 0 && (
                    <p className="text-green-700">Tidak ada ayat yang di-bookmark</p>
                )}
            </div>
        </div>
    );
}

function Header() {
    return (
        <div className="md:mx-4 mx-4 my-4 h-[70px] min-h-[70px] max-h-[70px] flex items-center justify-between px-9 border-b-2 bg-green-400 rounded-lg shadow-md mb-4">
            <h1 className="md:text-3xl text-xl font-bold text-green-800">
                Bookmark
            </h1>
            <div className='' >
                <a href='/'>
                    <FcUpRight className="w-6 h-6"/>
                </a>
            </div>
        </div>
    );
}