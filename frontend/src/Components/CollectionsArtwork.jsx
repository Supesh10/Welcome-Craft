import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

const CategoryPage = () => {
  const { categoryId } = useParams(); // Capture categoryId from URL
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/artwork/category/${categoryId}`);
        setArtworks(response.data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    if (categoryId) {
      fetchArtworks();
    }
  }, [categoryId]);

  return (
    <div>
      {/* <div className="artwork-list">
        {artworks.length > 0 ? (
          artworks.map((artwork) => (
            <div key={artwork._id} className="artwork-item">
              <img src={artwork.imageUrl} alt={artwork.title} />
              <h2>{artwork.title}</h2>
              <p>By {artwork.artist.name}</p>
              <p>{artwork.description}</p>
              <p>${artwork.price}</p>
              <p>Available Stock: {artwork.countInStock}</p>
            </div>
          ))
        ) : (
          <p>No artworks found in this category.</p>
        )}
      </div> */}
      <div className="container mx-auto py-10 px-10">
        <h1 className="text-4xl font-extrabold mb-8 font-body px-4 py-2 tracking-tighter ">Artworks in Selected Category </h1>
        {/* <div className="mb-4">
          <input type="text" placeholder="Search..." className="p-2 border rounded"/>
          <button className="ml-2 p-2 bg-blue-500 text-white rounded">Sort by Price</button>
        </div> */}
        <div className='flex justify-center'>
        <Cards data={artworks} />
        </div>
        {/* Add a page counter component here if needed */}
      </div>
    </div>
  );
};

export default CategoryPage;
