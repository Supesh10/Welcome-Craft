import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from '../Components/Cards';
import axiosInstance from '../config/axiosConfig';
import { CiSearch } from "react-icons/ci";


const Shop = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/artwork/');
        setArtworks(response.data);
      } catch (error) {
        console.error("There was an error fetching the artworks!", error);
      }
    };

    fetchArtworks();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.get(
        `/api/artwork/search?search=${searchTerm}`
      );
      setSearchResults(response.data);
      // You can route to a search results page or display the results here
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-10">
      <h1 className="text-4xl font-extrabold mb-8 font-body px-4 py-2 tracking-tighter ">Shop for Masterpieces</h1>
      <div className='flex w-full justify-center mb-6'>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter max-w-6xl py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
                placeholder="Search Artworks"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="bg-black font-body text-white font-bold mt-2 py-2 px-4 border-2 m-4 border-black rounded-md focus:outline-none focus:shadow-outline transition-colors duration-300 hover:bg-transparent hover:text-black"
                type="submit"
              >
                 <CiSearch size={24} />
              </button>
            </form>
          </div>

      <div className='flex justify-center'>
      {searchResults.length > 0 ? (
          <Cards data={searchResults} />
        ) : (
          <Cards data={artworks} />
        )}
      </div>
      {/* Add a page counter component here if needed */}
    </div>
  );
};

export default Shop;
