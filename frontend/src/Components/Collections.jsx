import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Collections = () => {
  const [collections, setCollection] = useState([]);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/category/');
        setCollection(response.data.categories);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };

    fetchCollection();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 font-body tracking-tighter">Collections</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {collections.map((collection) => (
          <li key={collection._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={collection.image} alt={collection.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-body font-semibold">{collection.name}</h2>
            {/* Pass collection._id dynamically in the Link component */}
            <Link to={`/category/${collection._id}`}>
              <button className='bg-transparent font-body font-semibold text-black px-6 py-3 mt-4 w-full rounded-md border border-gray-300 transition-all duration-300 hover:border-gray-900'>
                View Artworks
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Collections;
