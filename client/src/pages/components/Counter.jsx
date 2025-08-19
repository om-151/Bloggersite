import React, { useEffect, useState } from "react";

const Counter = ({ target, duration = 2000, title, suffix = "+" }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = target / (duration / 10);

        const counter = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(counter);
            }
            setCount(Math.floor(start));
        }, 10);

        return () => clearInterval(counter);
    }, [target, duration]);

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-4xl font-bold text-[#6438C0] flex items-start">
                <span className="inline-flex items-center">
                    <span>{count}</span>
                    {count === target && (
                        <span className="text-2xl ml-1">{suffix}</span>
                    )}
                </span>
            </h2>
            {title && <p className="mt-2 text-gray-600 text-lg">{title}</p>}
        </div>
    );
};

export default Counter;
