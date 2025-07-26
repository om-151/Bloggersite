import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const toggleMenu = () => setNavOpen(!navOpen);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Login", href: "/login" },
        { name: "Sign up", href: "/signup" },
    ];

    return (
        <header className="w-full shadow-md fixed top-0 left-0 bg-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Logo */}
                <div className="text-2xl font-bold text-blue-600">Blogger</div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button onClick={toggleMenu} className="text-2xl text-gray-700">
                        {navOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {navOpen && (
                <div className="md:hidden bg-white px-4 pb-4 shadow-md">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition"
                            onClick={() => setNavOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Navbar;
