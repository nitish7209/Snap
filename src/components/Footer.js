import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-6 mt-12">
            <div className="container mx-auto flex flex-col items-center md:flex-row justify-between">
                {/* Copyright */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="text-sm">&copy; {new Date().getFullYear()} Nitish Kumar. All rights reserved.</p>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaInstagram size={24} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                        <FaLinkedin size={24} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
