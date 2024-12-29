export const QuranApi = {
    getSurah: async function () {
        try {
            const response = await fetch('https://equran.id/api/surat');
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    getDetailSurah: async function (nomor){
        try {
            const response = await fetch(`https://equran.id/api/surat/${nomor}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    },

    getDetailTafsir: async function (nomor){
        try {
            const response = await fetch(`https://equran.id/api/tafsir/${nomor}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
};