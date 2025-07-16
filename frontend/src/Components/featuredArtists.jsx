import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

const FeaturedArtists = () => {
  const [artists, setArtists] = useState([]);

  // const navigate= useNavigate();

  // const handleViewArtworks = (artistId) => {
  //   navigate(`/artists/${artistId}/artworks`);
  // };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/artist/');
        setArtists(response.data.artists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 font-body tracking-tighter">Featured Artists</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {artists.map((artist) => (
          <li key={artist._id} className="bg-white p-6 rounded-lg shadow-lg">
            <img src={artist.profileImage} alt={artist.name} className="w-full h-64 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-body font-semibold">{artist.name}</h2>
            <Link to={`/artists/${artist._id}`}><button className='bg-transparent  font-body font-semibold text-black px-6 py-3 mt-4 w-full rounded-md border  border-gray-300 transition-all duration-300 hover:border-gray-900 '>Explore his works</button></Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeaturedArtists;
