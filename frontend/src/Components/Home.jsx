import React,{useEffect, useState} from 'react'
import Cards from './Cards'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Home = () => {

  const [recentArtworks, setRecentArtworks] = useState([]);
  // const recents=[
  //   {
  //     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/757px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
  //     title:"The Starry Night (1889)",
  //     artist:"Vincent Van-Gogh"
  //   },
  //   {
  //     img:"https://upload.wikimedia.org/wikipedia/commons/d/db/Arnold_Boecklin-fiedelnder_Tod.jpg",
  //     title:"Self Portrait with Death Playing the Fiddle (1872)",
  //     artist:"Arnold Bocklin"
  //   },
  //   {
  //     img:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/John_Martin_Le_Pandemonium_Louvre.JPG/640px-John_Martin_Le_Pandemonium_Louvre.JPG",
  //     title:"Pandemonium (1841)",
  //     artist:"John Martin"
  //   }
  // ]

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

  return (
    <div className='bg-white py-12 m-3'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='lg:flex lg:items-center lg:justify-between'>
        <div className='lg:w-1/2'>
            <h1 className='font-body text-4xl font-bold'>Explore Authentic Side of True Arts</h1>
            <p className='font-body font-light mt-5'>A grotesque online marketplace combining the sale of historic replicas with contemporary artworks.</p>
            <p className='font-body font-thin mt-2'>Bridges the gap between historical art appreciation and modern artistic expression</p>
            <Link to="/shop"><button className='mt-6 font-body font-semibold text-white border border-black bg-black rounded-lg px-6 py-3 transition-colors duration-300 hover:bg-transparent hover:text-black'>Shop for Masterpieces</button></Link>
        </div>
        <div className='lg:w-1/2 mt-8 lg:mt-0 lg:pl-8'>
            <img
              src="https://img.freepik.com/premium-vector/easel-with-canvas-semi-flat-color-vector-object_151150-7026.jpg?w=740"
              alt='Magnum Opus Homepage'
              className='w-full h-[500px] rounded-md'
            />
          </div>
      </div>
    </div>
    <section className="py-16 bg-gray-100 rounded-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-body font-bold text-center tracking-tighter mb-12">New Arrivals</h2>
          <div className='flex justify-center items-center'>
            <Cards data={recentArtworks}/>
          </div>
        </div>
      </section>
      <footer className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-white">
            <div>
              <h3 className="text-lg font-body font-bold">Magnum Opus</h3>
              <p className='text-sm font-body'>Authentic historic art pieces.</p>
            </div>
            <div>
              <Link to="/about" className="text-gray-400 hover:text-white mx-2">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
