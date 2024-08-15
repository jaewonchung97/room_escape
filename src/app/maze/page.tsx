'use client'

import React, {useCallback, useEffect, useState} from "react";
import {PiPersonSimpleWalkLight} from "react-icons/pi";
import {IoIosFootball} from "react-icons/io";
import {useRouter} from "next/navigation";

const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];


const Maze = ({playerPosition}: { playerPosition: { x: number, y: number, heading: string } }) => {
    const Cell = ({rowIndex, colIndex}: {rowIndex: number, colIndex: number}) => {
        if(rowIndex === playerPosition.y && colIndex === playerPosition.x) {
            return <PiPersonSimpleWalkLight className={`w-8 h-8 ${playerPosition.heading}`}/>
        }
        if(rowIndex === 3 && colIndex === 4) {
            return <IoIosFootball className={`w-8 h-8 text-yellow-500`} />
        }
    }

    return (
        <div className={`flex flex-col`}>
            {maze.map((row, rowIndex) => (
                <div key={rowIndex} className={`flex flex-row`}>
                    {row.map((col, colIndex) => (
                        <div key={colIndex}
                             className={`flex items-center justify-center w-20 h-20 ${col === 1 ? 'bg-black' : 'bg-white'}`}>
                            <Cell rowIndex={rowIndex} colIndex={colIndex}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
};

const possibleGoals = [
    {x: 0, y: 1},
    {x: 2, y: 4},
    {x: 7, y: 5},
    {x: 3, y: 2}
]


export default function MazePage() {
    const router = useRouter();
    const [playerPosition, setPlayerPosition] = useState({x: 1, y: 1, heading: 'rotate-0'});
    const [goalPosition, setGoalPosition] = useState({x: 0, y: 1});

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * 10 % 4)
        setGoalPosition(possibleGoals[randomIndex]);
        console.log(possibleGoals[randomIndex]);
    }, []);

    useEffect(() => {
        console.log('playerPosition', playerPosition);
    }, [playerPosition]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        let {x, y, heading} = playerPosition;
        switch (event.key) {
            case 'ArrowUp':
                y = y - 1;
                heading = '-rotate-90';
                break;
            case 'ArrowDown':
                y = y + 1;
                heading = 'rotate-90';
                break;
            case 'ArrowLeft':
                x = x - 1;
                heading = 'scale-x-[-1] rotate-0';
                break;
            case 'ArrowRight':
                x = x + 1;
                heading = 'rotate-0';
                break;
        }

        setPlayerPosition({...playerPosition, heading: heading});

        if(x === 4 && y === 3) {
            router.push('/failed');
            return;
        }

        console.log('current position', x, y);
        if(x === goalPosition.x && y === goalPosition.y) {
            router.push('/rsc');
            return;
        }

        if (maze[y][x] === 0) {
            setPlayerPosition({x, y, heading});
        }
    }, [goalPosition, playerPosition, router]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);

    return (
        <div className={`flex flex-col w-full h-full`}>
            <h1 className={`text-4xl font-bold pl-[20%] py-[5%]`}>미로</h1>
            <div className={`flex w-full h-full items-center justify-center`}>
                <Maze playerPosition={playerPosition}/>
            </div>
        </div>
    )
}