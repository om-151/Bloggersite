const logos = [
    "https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo.png",
    "https://1000logos.net/wp-content/uploads/2016/10/Amazon-Logo.png",
    "https://1000logos.net/wp-content/uploads/2017/05/Youtube-Logo.png",
    "https://1000logos.net/wp-content/uploads/2020/08/Blogger-Logo-1999.png",
    "https://1000logos.net/wp-content/uploads/2021/05/Google-logo.png",
];

const PartnerSlider = () => {
    const REPEAT_COUNT = 50;
    const repeatedLogos = Array(REPEAT_COUNT).fill(logos).flat();

    return (
        <div className="w-full bg-gray-100 py-10 overflow-hidden">
            <h2 className="text-3xl font-bold text-center mb-8">Our Partners</h2>

            {/* Scrolling wrapper */}
            <div className="overflow-hidden relative">
                {/* Moving track */}
                <div className="scrolling-track flex gap-12">
                    {repeatedLogos.map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="h-16 w-auto object-contain"
                        />
                    ))}
                </div>
            </div>

            {/* Inline animation CSS */}
            <style>{`
                .scrolling-track {
                    display: flex;
                    width: calc(200%); /* important for seamless looping */
                    animation: scrollLeft 25s linear infinite;
                }

                @keyframes scrollLeft {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
            `}</style>
        </div>
    );
};

export default PartnerSlider;
