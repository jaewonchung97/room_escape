import {FaArrowRight} from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center space-y-5`}>
            <h1 className={`text-3xl font-medium`}>방탈출 하기</h1>
            <Link href={'/failed'}>
                <div className={`flex w-10 h-10 transition-colors duration-500 border-2 border-blue-500 hover:bg-blue-500 text-blue-500 hover:text-white justify-center items-center rounded-full`}>
                    <FaArrowRight className={`font-light cursor-pointer`}/>
                </div>
            </Link>
        </div>
    );
}
