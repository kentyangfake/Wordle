import React from 'react';

const Answer = ["A","T","I","M","R"];

interface StatusProp {
    status:string
}

const Game: React.FC = () => {

    const data = [
        ["O","U","T","E","r"],
        ["A","C","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
        ["","","","",""],
    ];

    const currentRow = 1 ;


    return (
        <div className="flex flex-col gap-1.5 my-60">
            <div className="flex justify-center gap-1.5">
                <div status="some value" className="flex justify-center items-center w-16 h-16 border text-4xl font-medium bg-[#787c7e] text-white">O</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium bg-[#787c7e] text-white">U</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium bg-[#c9b458] text-white">T</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium bg-[#787c7e] text-white">E</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium bg-[#6aaa64] text-white">R</div>
            </div>
            <div className="flex justify-center gap-1.5">
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-black">A</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-black">C</div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
            </div>
            <div className="flex justify-center gap-1.5">
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
            </div>
            <div className="flex justify-center gap-1.5">
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
            </div>
            <div className="flex justify-center gap-1.5">
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
            </div>
            <div className="flex justify-center gap-1.5">
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
                <div className="flex justify-center items-center w-16 h-16 border text-4xl font-medium border-gray-400"></div>
            </div>
        </div>
    );
}
export default Game;