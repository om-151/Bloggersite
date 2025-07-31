import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useLocation, Link } from "react-router-dom";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setNavOpen(!navOpen);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        window.location.href = "/login";
    };

    const guestLinks = [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Login", href: "/login" },
        { name: "Sign up", href: "/signup" },
    ];

    const userLinks = [
        { name: "Home", href: "/" },
        { name: "Blogs", href: "/blogs" },
        { name: "About", href: "/about" },
        { name: "Create", href: "/create" },
    ];

    const linksToRender = isLoggedIn ? userLinks : guestLinks;

    return (
        <header className="w-full shadow-md fixed top-0 left-0 bg-white z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <div className="text-2xl font-bold text-blue-600">Blogger</div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-8 items-center">
                    {linksToRender.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`font-medium transition-colors duration-300 ${location.pathname === link.href
                                    ? "text-blue-600 underline"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <button
                            onClick={handleLogout}
                            className="text-red-500 hover:text-red-700 font-medium transition-colors duration-300 cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
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
                    {linksToRender.map((link) => (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`block py-2 font-medium transition ${location.pathname === link.href
                                    ? "text-blue-600 underline"
                                    : "text-gray-700 hover:text-blue-600"
                                }`}
                            onClick={() => setNavOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    {isLoggedIn && (
                        <button
                            onClick={() => {
                                handleLogout();
                                setNavOpen(false);
                            }}
                            className="block w-full text-left py-2 text-red-500 hover:text-red-700 font-medium transition"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </header>
    );
};

export default Navbar;
