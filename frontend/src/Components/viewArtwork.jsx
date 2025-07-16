import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import Cards from './Cards';

const ArtworkDetails = () => {
  const [recentArtworks, setRecentArtworks] = useState([]);
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const handleAddtoCart= ()=>{
    addToCart(artwork);
  }

  useEffect(() => {
    const fetchRecentArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/artwork/recents');
        setRecentArtworks(response.data);
      } catch (error) {
        console.error('Error fetching recent artworks', error);
      }
    };

    fetchRecentArtworks();
  }, []);
  // const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedFrame, setSelectedFrame] = useState(null);

  // const sizes = ['14x14', '24x24', '32x32'];
  // const frames = ['No Frame', 'Gallery Canvas', 'Wooden Frame'];

  // const handleSizeSelect = (size) => {
  //   setSelectedSize(size);
  // };

  // const handleFrameSelect = (frame) => {
  //   setSelectedFrame(frame);
  // };


  useEffect(() => {
    // Fetch the artwork details from the backend
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/artwork/${id}`);
        setArtwork(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {artwork ? (
      <div className='flex flex-wrap lg:flex-nowrap'>
        <div className='w-full lg:w-2/4'>
          <Carousel showThumbs={true}>
                {artwork.images.map((imgUrl, index) => (
                  <div key={index}>
                    <img src={imgUrl}alt={artwork.title}
                    className="d-block w-100 rounded-md" />
                  </div>
                ))}
              </Carousel>
          </div>
          <div className="w-full lg:w-2/4 lg:pl-8">
            <h1 className="font-body text-4xl font-bold tracking-tighter">{artwork.title}</h1>
            <p className="font-body font-semibold text-xl tracking-tighter">By {artwork.artist.name}  /  {artwork.createdAt}</p>
            <p className="font-body font-semibold text-xl tracking-tighter">{artwork.category.name}</p>
            <h4 className="text-sm font-body font-light mb-2 mt-4">Select Size:</h4>
              <div className="flex space-x-2">
                {['14x14', '24x24', '32x32'].map((size, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-md font-body transition duration-300  hover:bg-white hover:text-black border border-gray-200 focus:bg-black focus:text-white"
                  >
                    {size}
                  </button>
                ))}
              </div>

              <h4 className="text-sm font-body font-light mb-2 mt-4">Select Frame:</h4>
              <div className="flex space-x-2">
                {['No Frame', 'Gallery Canvas', 'Wooden Frame'].map((frame, index) => (
                  <button
                    key={index}
                    className="px-4 py-2 rounded-md font-body transition duration-300  hover:bg-white hover:text-black border border-gray-200 focus:bg-black focus:text-white"
                  >
                    {frame}
                  </button>
                ))}
              </div>
            <p className='font-body font-normal tracking-tighter pt-8'>{artwork.description}</p>
            <p className="text-lg font-body font-thin pt-6">Price: Rs. {artwork.price}.00</p>
            <p className='text-sm font-body font-extralight mt-4'>Quantity :</p>
            <div className="flex items-center mt-4 w-full">
        <div className="flex items-center w-1/3">
            
          <button 
            className="bg-transparent  mr-2 text-gray-800 font-bold py-1 px-4 rounded-md border  border-gray-300 transition-all duration-200 hover:border-black"
            onClick={handleDecrement}
          >
            -
          </button>
          <input 
            type="text" 
            value={quantity} 
            readOnly 
            className="mt- w-10 text-center border border-gray-300 rounded-md font-body"
          />
          <button 
            className="bg-transparent  ml-2 text-gray-800 font-bold py-1 px-4 rounded-md border  border-gray-300 transition-all duration-200 hover:border-black"
            onClick={handleIncrement}
          >
            +
          </button>
        </div>
        
        <button className="ml-2 bg-black font-body font-semibold text-white px-6 py-3 mt-4 w-full rounded-md transition-colors duration-300 hover:bg-white hover:text-black border border-black"
        onClick={handleAddtoCart}
        >
        <Link to="/cart">
          Add to Cart
        </Link>
        </button>
      </div>
        
            {/* <button className="bg-black font-body font-semibold text-white px-6 py-3 mt-4 w-full rounded-md transition-colors duration-300 hover:bg-white hover:text-black border border-black">
              Add to Cart
            </button> */}
            <button className="bg-transparent  font-body font-semibold text-black px-6 py-3 mt-4 w-full rounded-md border  border-gray-300 transition-all duration-300 hover:border-gray-900">
              <Link to="/buy">Buy Now</Link>
            </button>
          </div>)
          </div>) : (
        <div>No artwork found</div>
      )}
      <section className="py-16 bg-gray-100 rounded-md mt-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-body font-bold text-center tracking-tighter mb-12">New Arrivals</h2>
          <div className='flex justify-center items-center'>
            <Cards data={recentArtworks}/>
          </div>
        </div>
      </section>
      </div>
    );
  };

export default ArtworkDetails;
