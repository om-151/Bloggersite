import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-gray-700">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Logo + About */}
                <div>
                    <h2 className="text-gray-900 text-2xl font-bold mb-4">YourBrand</h2>
                    <p className="text-sm leading-relaxed">
                        YourBrand is dedicated to delivering high-quality services and
                        solutions. We create innovative digital experiences that help you
                        succeed.
                    </p>
                    {/* Social Icons */}
                    <div className="flex space-x-4 mt-4">
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-500 hover:text-white transition"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-sky-400 hover:text-white transition"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-pink-500 hover:text-white transition"
                        >
                            <FaInstagram />
                        </a>
                        <a
                            href="#"
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white transition"
                        >
                            <FaLinkedinIn />
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition">Home</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Services</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Contact</a></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Services</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-blue-600 transition">Web Development</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">UI/UX Design</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">Digital Marketing</a></li>
                        <li><a href="#" className="hover:text-blue-600 transition">SEO Services</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="text-gray-900 text-lg font-semibold mb-4">Subscribe</h3>
                    <p className="text-sm mb-3">
                        Subscribe to our newsletter for the latest updates.
                    </p>
                    <form className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-sm rounded-r-md text-white transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                    <p>© {new Date().getFullYear()} YourBrand. All rights reserved.</p>
                    <div className="mt-2 sm:mt-0 space-x-4">
                        <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
