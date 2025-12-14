import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex items-center justify-center mt-6"
    >
      <input
        type="text"
        placeholder="Search for products, brands"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-500 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
