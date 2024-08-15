import Link from "next/link";

export default function FailedPage() {
    return (
        <div className={`flex flex-col w-full h-screen items-center justify-center space-y-4`}>
            <h1 className={`text-3xl font-bold text-red-500`}>실패</h1>
            <Link href={'/'}>
                <div className={`px-2 py-1 rounded-md flex items-center justify-center hover:bg-zinc-200 text-zinc-500 hover:text-zinc-950 transition-colors duration-500`}>
                    <span>재시도</span>
                </div>
            </Link>
        </div>
    )
}