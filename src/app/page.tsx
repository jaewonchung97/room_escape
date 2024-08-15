import {FaArrowRight} from "react-icons/fa6";
import Link from "next/link";

export default function Home() {
    return (
        <div className={`w-full h-screen flex flex-col items-center justify-center space-y-5`}>
            <h1 className={`text-3xl font-medium`}>방탈출 하기</h1>
            <Link href={'/failed'}>
                <FaArrowRight className={`font-light cursor-pointer`}/>
            </Link>
        </div>
    );
}
