'use client';

import {GiPaper, GiRock, GiScissors} from "react-icons/gi";
import React, {useCallback} from "react";
import {useRouter} from "next/navigation";


export default function RscPage({}) {
    const router = useRouter();

    const rscProps = [
        {Icon: GiRock, color: 'red'},
        {Icon: GiScissors, color: 'blue'},
        {Icon: GiPaper, color: 'green'}
    ]

    const onIconClick = useCallback((e: React.MouseEvent) => {
        if (Math.random() < 0.33) {
            router.push('/win');
        } else {
            router.push('/failed');
        }
    }, [router]);

    return (
        <div className={`flex flex-row w-full h-screen items-center justify-center space-x-14`}>
            {
                rscProps.map(({Icon, color}) => (
                    <div key={Icon.name} className={`flex items-center justify-center w-20 h-20 rounded-full border-2
                    transition-colors duration-500 text-white cursor-pointer
                    ${color === 'red' && 'border-red-500 bg-red-500 hover:bg-white hover:text-red-500'}
                    ${color === 'blue' && 'border-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500'}
                    ${color === 'green' && 'border-green-500 bg-green-500 hover:bg-white hover:text-green-500'}
                    `}
                         onClick={onIconClick}
                    >
                        <Icon className={`w-12 h-12`}/>
                    </div>
                ))
            }
        </div>
    )
}