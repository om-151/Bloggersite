import React from "react";
import Slider from "react-slick";
import Counter from "../components/Counter"
import PartnerSlider from "./PartnerSlider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images properly
import Blog1 from "../../assets/Hero/BlogSlider-1.jpg";
import Blog2 from "../../assets/Hero/BlogSlider-2.jpg";
import Blog3 from "../../assets/Hero/BlogSlider-3.jpg";
import Testimonials from "./Testimonials";

const images = [Blog1, Blog2, Blog3];

const Home = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
    };

    return (
        <div className="w-full">
            {/* Slider Section */}
            <div className="w-full">
                <Slider {...settings}>
                    {images.map((img, index) => (
                        <div key={index}>
                            <img
                                src={img}
                                alt={`Slide ${index + 1}`}
                                className="w-full h-[500px] object-cover"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
            <div className="py-16 bg-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-10">Our Achievements</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <Counter target={1000} title="Users" suffix="+" />
                        <Counter target={250} title="Blogs Published" />
                        <Counter target={50} title="Awards Won" />
                        <Counter target={120} title="Contributors" />
                    </div>
                </div>
            </div>
            <PartnerSlider />
            <Testimonials />
        </div>
    );
};

export default Home;
