import LeftSection from "../../components/ReadQuran/leftSection";
import RightSection from "../../components/ReadQuran/rightSection";

export default function Read(){
    return(
        <div className="bg-slate-500 flex w-full h-screen">
            {/* bagian kiri */}
            <LeftSection/>
            {/* bagian kanan */}
              <RightSection/>
        </div>
    )
}