import React from 'react'
import { Link } from 'react-router-dom';

const Cards = (props) => {
  console.log('Props Data:', props.data); 
  return (
    <div>
        <div className="flex flex-wrap justify-around items-stretch ">
        {props.data.map((product, index) => {
          return (
            <div className="bg-white rounded-lg shadow-lg overflow-hidden m-4 w-80">
                    <img src={product.imageUrl} alt={product.title} className="w-full h-64 object-cover"/>
                    <div className="p-6 flex flex-col">
                        <h3 className="text-xl font-body font-semibold mb-2">{product.title}</h3>
                        <p className="text-gray-700 mb-4 font-body font-medium tracking-tight ">{product.artist.name}</p>
                        <p className="text-gray-700 mb-4 font-body text-lg font-medium tracking-tight ">Rs. {product.price}</p>
                       {/* <a href="/artworks/1" className="text-blue-500 hover:underline">View Artwork</a> */}
                       <Link to={`/artwork/${product._id}`}> 
                       <button className='bg-black text-white font-body px-5 py-2 text-center mt-2 rounded-md transition-colors duration-300 hover:bg-white w-full hover:text-black border border-gray-950'>View Artwork</button>
                       </Link>
                    </div>
                    </div>
                    )}
                    )}
        </div>
    </div>
  )
}

export default Cards
