import Link from "next/link";

export default function Page() {
    return (
        <div className={`flex flex-col w-full h-screen items-center justify-center space-y-4`}>
            <h1 className={`text-3xl font-bold text-red-500`}>실패</h1>
            <Link href={'/'}>
                <span>재시도</span>
            </Link>
        </div>
    )
}