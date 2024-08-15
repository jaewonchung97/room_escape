'use client'

import React, {useCallback, useState} from "react";
import {PiPersonSimpleWalkLight} from "react-icons/pi";
import {IoIosFootball} from "react-icons/io";

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


export default function MazePage() {
    const [playerPosition, setPlayerPosition] = useState({x: 1, y: 1, heading: 'rotate-0'});

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
            document.location.href = '/failed';
        }

        if (maze[y][x] === 0) {
            setPlayerPosition({x, y, heading});
        }

    }, [playerPosition]);

    React.useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [handleKeyDown]);

    return (
        <div className={`flex flex-col w-full h-full`}>
            <h1 className={`text-3xl pl-20 py-10`}>미로</h1>
            <div className={`flex w-full h-full items-center justify-center`}>
                <Maze playerPosition={playerPosition}/>
            </div>
        </div>
    )
}