import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-12">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                
                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-3">About Us</h3>
                    <ul className="space-y-2">
                        <li><a href="/about" className="hover:text-blue-400 transition">Company</a></li>
                        <li><a href="/careers" className="hover:text-blue-400 transition">Careers</a></li>
                        <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-3">Customer Service</h3>
                    <ul className="space-y-2">
                        <li><a href="/help" className="hover:text-blue-400 transition">Help</a></li>
                        <li><a href="/returns" className="hover:text-blue-400 transition">Returns</a></li>
                        <li><a href="/shipping" className="hover:text-blue-400 transition">Shipping</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-green-400 mb-3">Follow Us</h3>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-blue-400 transition">Facebook</a>
                        <a href="#" className="hover:text-blue-400 transition">Twitter</a>
                        <a href="#" className="hover:text-blue-400 transition">Instagram</a>
                    </div>
                </div>

                <div className="md:col-span-1 flex flex-col justify-end">
                    <p className="text-gray-400 text-sm mt-4 md:mt-0">
                        &copy; 2023 E-Shop. All rights reserved. | Built for BCA Project
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
