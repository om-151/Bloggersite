import React from "react";

const AboutUs = () => {
    return (
        <section className="bg-white text-gray-800 py-16 px-6 sm:px-10 lg:px-20">
            {/* Container */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left: Image */}
                <div className="relative group">
                    <img
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800"
                        alt="About Us"
                        className="w-full h-80 object-cover rounded-2xl shadow-lg transform group-hover:scale-105 transition duration-500"
                    />
                </div>

                {/* Right: Text Content */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        About <span className="text-blue-600">Our Blog</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Welcome to our blog! We share inspiring stories, practical
                        tips, and valuable insights on technology, lifestyle, and
                        everything that sparks curiosity.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Our team of passionate writers and creators aims to bring you
                        content that not only informs but also motivates you to think,
                        explore, and grow. We believe in creating a community of
                        like-minded people who thrive on learning and sharing knowledge.
                    </p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-gray-900">500+</h3>
                            <p className="text-gray-600 text-sm">Published Blogs</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-md transition">
                            <h3 className="text-xl font-semibold text-gray-900">100K+</h3>
                            <p className="text-gray-600 text-sm">Happy Readers</p>
                        </div>
                    </div>

                    {/* Button */}
                    <a
                        href="#contact"
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
                    >
                        Contact Us
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
