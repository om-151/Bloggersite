import React from "react";
import { motion } from "framer-motion";
import suraj from "../../assets/Suraj.jpg"
import om from "../../assets/Om.jpg"
import zeel from "../../assets/zeel.jpg"

const teamMembers = [
    {
        name: "Om Sonani",
        role: "Founder & Writer",
        image: om,
    },
    {
        name: "Suraj Sutariya",
        role: "Content Creator",
        image: suraj,
    },
    {
        name: "Zeel Savani",
        role: "Editor",
        image: zeel,
    },
];

const AboutUs = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Hero Section */}
            <div className="relative w-full h-[60vh] bg-gray-800">
                <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60"
                    alt="About Us Banner"
                    className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold text-white text-center"
                    >
                        About Blogger
                    </motion.h1>
                </div>
            </div>

            {/* Intro Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto px-6 py-16 text-center"
            >
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Who We Are
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Welcome to our blog! We are passionate storytellers and content
                    creators, committed to bringing you engaging articles, tips, and
                    insights across a variety of topics. Our mission is to inspire, educate,
                    and entertain our readers.
                </p>
            </motion.div>

            {/* Team Section */}
            <div className="max-w-6xl mx-auto px-6 mt-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
                    Meet Blogger Team
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
                        >
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-56 object-cover"
                            />
                            <div className="p-5 text-center">
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {member.name}
                                </h3>
                                <p className="text-gray-500">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Mission & Vision Section */}
            <section className="bg-white py-16 px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                    >
                        <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to create a platform that delivers valuable,
                            insightful, and inspirational content to our readers. We aim to
                            encourage personal growth, creativity, and knowledge sharing in
                            every article we publish.
                        </p>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="bg-green-50 p-8 rounded-2xl shadow-lg hover:shadow-xl transition"
                    >
                        <h3 className="text-2xl font-bold text-green-600 mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Our vision is to build a community of curious minds who seek
                            knowledge and inspiration. We strive to be the go-to platform for
                            authentic, high-quality blogs that resonate with readers worldwide.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;
