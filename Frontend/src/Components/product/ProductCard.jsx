import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../Contexts/ProductContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useProducts();

    const handleAddToCart = () => {
        addToCart(product);
    };

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
            <Link to={`/product/${product.id}`} className="block">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-48 object-cover rounded-md" 
                />
                <div className="mt-2">
                    <h3 className="text-lg font-bold text-blue-600">{product.name}</h3>
                    <p className="text-green-600 font-semibold">${product.price}</p>
                    <div className="text-yellow-500">***** (5)</div>
                </div>
            </Link>
            <button 
                onClick={handleAddToCart} 
                className="mt-2 w-full bg-blue-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"
            >
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;
