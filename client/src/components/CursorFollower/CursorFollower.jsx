import React, { useEffect, useState } from "react";

const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, []);

    return (
        <div
            className="pointer-events-none fixed z-[9999] flex items-center justify-center w-8 h-8 rounded-full border-2 border-blue-500"
            style={{
                left: `${position.x - 16}px`, // center circle
                top: `${position.y - 16}px`,
                transition: "transform 0.05s ease-out",
            }}
        >
            <div className="w-2 h-2 bg-gray-800 rounded-full" />
        </div>
    );
};

export default CursorFollower;
