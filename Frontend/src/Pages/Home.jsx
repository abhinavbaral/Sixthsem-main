import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/common/Header';
import SearchBar from '../Components/common/SearchBar';
import Footer from '../Components/common/Footer';
import ProductList from '../Components/product/ProductList';
import { useProducts } from '../Contexts/ProductContext';
import { useAuth } from '../Contexts/AuthContext';

const Home = () => {
    const { products, loading, error } = useProducts();
    const { user } = useAuth();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleSearch = (query) => {
        setSearchQuery(query);
        if (!query.trim()) {
            setFilteredProducts(products);
        } else {
            const filtered = products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-green-50">
            <Header />

            <section className="bg-blue-500 text-white py-12">
                <div className="max-w-6xl mx-auto text-center px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to E-shop</h1>
                    {user ? (
                        <p className="text-lg md:text-xl mb-6">
                            Hello, {user.role === 'admin' ? 'Admin' : user.email}! Discover amazing deals.
                        </p>
                    ) : (
                        <p className="text-lg md:text-xl mb-6">
                            Discover amazing deals and products just for you.
                        </p>
                    )}
                    <Link
                        to="/products"
                        className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded transition-colors duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
                <SearchBar onSearch={handleSearch} />

                {searchQuery && (
                    <p className="mt-4 text-gray-700">
                        Showing results for "{searchQuery}" ({filteredProducts.length} items)
                    </p>
                )}

                {loading ? (
                    <div className="mt-8 text-center text-blue-600 font-semibold">Loading Products...</div>
                ) : error ? (
                    <div className="mt-8 text-center text-red-600 font-semibold">Error: {error}</div>
                ) : (
                    <ProductList products={filteredProducts} />
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Home;
