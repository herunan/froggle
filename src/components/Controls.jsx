import React from 'react';

const Controls = ({ onMove }) => {
    return (
        <div className="grid grid-cols-3 gap-2 w-48 mx-auto mt-4">
            <div></div>
            <button
                className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
                onClick={() => onMove('up')}
            >
                ▲
            </button>
            <div></div>
            <button
                className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
                onClick={() => onMove('left')}
            >
                ◀
            </button>
            <button
                className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
                onClick={() => onMove('down')}
            >
                ▼
            </button>
            <button
                className="bg-gray-700 text-white p-4 rounded active:bg-gray-600"
                onClick={() => onMove('right')}
            >
                ▶
            </button>
        </div>
    );
};

export default Controls;
