import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Cards from './Cards';

const ArtistArtworks = () => {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);

  // useEffect(() => {
  //   const fetchArtistData = async () => {
  //     try {
  //       const artistResponse = await axios.get(`http://localhost:8080/api/artist/${artistId}`);
  //       setArtist(artistResponse.data);

  //       const artworkResponse = await axios.get(`http://localhost:8080/api/artwork/artists/${artistId}`);
  //       setArtworks(artworkResponse.data);
  //       // console.log(response.data);
  //     } catch (error) {
  //       console.error('Error fetching artworks or artist:', error);
  //     }};

  //   fetchArtistData();
  // }, [artistId]);

  // if (!artist) {
  //   return <div>Loading...</div>;
  // }
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistResponse = await axios.get(`http://localhost:8080/api/artist/${artistId}`);
        setArtist(artistResponse.data);

        const artworksResponse = await axios.get(`http://localhost:8080/api/artwork/artists/${artistId}`);
        setArtworks(artworksResponse.data);
      } catch (error) {
        console.error('Error fetching artist or artworks:', error);
      }
    };

    fetchArtistData();
  }, [artistId]);

  if (!artist) {
    return <div>Loading...</div>;
  }
    // <div className="artwork-grid">
    //   {artworks.length > 0 ? (
    //     artworks.map((artwork) => (
    //       <div key={artwork._id} className="artwork-card">
    //         <img src={artwork.imageUrl} alt={artwork.title} />
    //         <h3>{artwork.title}</h3>
    //         <p>{artwork.artist.name}</p>
    //         <p>${artwork.price}</p>
    //       </div>
    //     ))
    //   ) : (
    //     <p>No artworks found for this artist.</p>
    //   )}
    // </div>

    return(
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
    {artist.length > 0 ? (
     <div className="flex flex-col md:flex-row items-center mb-12">
        <img
          src={artworks.artist.profileImage}
          alt={artworks.artist.name}
          className="w-48 h-48 object-cover rounded-full mb-4 md:mb-0 md:mr-8"
        />
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
          <p className="text-lg text-gray-700">{artist.bio}</p>
        </div>
      </div>
    ): (
        <p></p>
    )}

      <div className="container mx-auto py-10 px-10">
        <h1 className="text-4xl font-extrabold mb-8 font-body px-4 py-2 tracking-tighter ">Artworks Available </h1>
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
    )
};

export default ArtistArtworks;
