import React, { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp } from "react-icons/fa";

const Footer = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    // Smooth scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            <footer className="bg-white text-gray-700 relative">
                {/* Top Section */}
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Logo + About */}
                    <div>
                        <h2 className="text-[#6438C0] text-2xl font-bold mb-4">Blogger</h2>
                        <p className="text-sm leading-relaxed">
                            Blogger is dedicated to delivering high-quality services and
                            solutions. We create innovative digital experiences that help you
                            succeed.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-400 hover:text-white transition">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white transition">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition">
                                <FaLinkedinIn />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-[#6438C0] text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/" className="hover:text-purple-800 transition">Home</a></li>
                            <li><a href="/blogs" className="hover:text-purple-800 transition">Blogs</a></li>
                            <li><a href="/about" className="hover:text-purple-800 transition">About Us</a></li>
                            <li><a href="/" className="hover:text-purple-800 transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-[#6438C0] text-lg font-semibold mb-4">Blog Categories</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="/blogs/68a4a54439d0160c17e8f754" className="hover:text-purple-800 transition">AI</a></li>
                            <li><a href="/blogs/68a4aa5c39d0160c17e8f7a6" className="hover:text-purple-800 transition">Politics</a></li>
                            <li><a href="/blogs/68a4b0e739d0160c17e8f804" className="hover:text-purple-800 transition">Business</a></li>
                            <li><a href="/blogs/68a4b26339d0160c17e8f828" className="hover:text-purple-800 transition">Science</a></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-[#6438C0] text-lg font-semibold mb-4">Subscribe</h3>
                        <p className="text-sm mb-3">
                            Subscribe to our newsletter for the latest updates.
                        </p>
                        <form className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-[#6438C0] text-gray-700"
                            />
                            <button
                                type="submit"
                                className="bg-[#6438C0] hover:bg-purple-800 px-4 py-2 text-sm rounded-r-md text-white transition cursor-pointer"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-200">
                    <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                        <p>© {new Date().getFullYear()} Blogger. All rights reserved.</p>
                        <div className="mt-2 sm:mt-0 space-x-4">
                            <a href="#" className="hover:text-purple-800 transition">Privacy Policy</a>
                            <a href="#" className="hover:text-purple-800 transition">Terms of Service</a>
                        </div>
                    </div>
                </div>

                {/* Back to Top Button */}
                {isVisible && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-6 right-6 p-3 rounded-full bg-[#6438C0] text-white shadow-lg hover:bg-purple-800 transition duration-30 cursor-pointer"
                    >
                        <FaArrowUp size={20} />
                    </button>
                )}
            </footer>
        </>
    );
};

export default Footer;
