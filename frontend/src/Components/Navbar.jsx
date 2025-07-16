import React, { useState, useEffect }  from 'react';
// import "@fontsource/space-grotesk";
import { Link } from 'react-router-dom';
// import { FiChevronDown } from 'react-icons/fi';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { toggle } from "../features/navbar/navbarSlice";
import axiosInstance from "../config/axiosConfig";
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const isOpen = useSelector((state) => state.navbar.isOpen);


  return (
    <nav className='bg-white shadow-sm shadow-gray-500'>
        <div className='max-w-7xl mx-auto px-3'>
            <div className='flex items-center justify-between py-4'>
              <div className='flex space-x-8'>
                  <Link to='/'>
                    <div className="flex items-start py-4 px-2">
                        <img src="./Icon.svg" alt="Magnum Opus Logo" className="h-10 w-auto" />
                        <img src="./Magnum Opus.svg" alt="Magnum Opus Tagline" className="h-10 w-auto object-cover py-1 pl-2" />
                    </div>
                  </Link>
              </div>
              <div className='lg:hidden'>
                <button 
                  // onClick={() => setIsOpen(!isOpen)} 
                  type="button" 
                  className="bg-gray-100 p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-900"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                <span className="sr-only">Open main menu</span>
             
                <svg className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              {/* Icon when menu is open. */}
                <svg className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
             </div>
                {/* <div className="hidden md:flex items-center space-x-1"> */}
                <ul className="flex items-center place-content-end space-x-6 ml-10">
                    {/* <a href="/" className="px-2 py-4 font-body font-semibold tracking-tight text-gray-700 hover:text-gray-900">Home</a> */}
                    <Link to='/'><p className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900">Home</p></Link> 
                   <Link to='/artists'><p className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900">Featured Artists</p></Link> 
                      {/* <button 
                        className="flex items-center px-2 py-4 text-gray-700 hover:text-gray-900 font-body  font-[599] tracking-tight"
                        onClick={() => setIsArtistsOpen(!isArtistsOpen)}
                      >
                      Featured Artists
                        <FiChevronDown 
                        className={`ml-2 transition-transform duration-300 ${isArtistsOpen ? 'rotate-180' : 'rotate-0'}`} 
                        />
                      </button>
                      {Array.isArray(artists) &&
                      artists?.map((artist) => (
                        <li key={artist._id}>
                          <a href={`artist/${artist._id}`}>{artist.name}</a>
                        </li>
                      ))}
                    </div> */}
                    {/* <div className="relative group">
                          <button 
                            className="flex items-center px-2 py-4 text-gray-700 hover:text-gray-900"
                            onClick={() => setIsArtistsOpen(!isArtistsOpen)}
                          >
                            Featured Artists 
                            <FiChevronDown 
                              className={`ml-2 transition-transform duration-300 ${isArtistsOpen ? 'rotate-180' : 'rotate-0'}`} 
                            />
                          </button>
                          {isArtistsOpen && artists.length > 0 && (
                            <div className="absolute bg-white shadow-lg rounded-lg mt-1 z-10">
                              <ul className="list-none p-0 m-0">
                                {artists.map((artist) => (
                                  <li key={artist._id} className="p-1">
                                    <button 
                                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                                      onClick={() => {
                                        setIsArtistsOpen(false);
                                        window.location.href = `/artist/${artist._id}`;
                                      }}
                                    >
                                      {artist.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                           )}
                      </div> */}
                    {/* <div className='flex justify-center'> */}
                    <Link to='/collections'><p className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900">Collections</p></Link> 
                    <Link to='/about'><p className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900">About</p></Link> 
                    {authState.userRole === "admin" && (
                <>
                  <Link
                    to="/category"
                    className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900"
                  >
                   Collections Menu
                  </Link>
                  <Link
                    to="/artistmenu"
                    className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900"
                  >
                    Artist Menu
                  </Link>
                  <Link
                    to="/artworkmenu"
                    className="px-2 py-4 font-body  font-[599] tracking-tight text-gray-700 hover:text-gray-900"
                  >
                    Artwork Menu
                  </Link>
                </>
              )}
                </ul>
                {/* <div className='flex justify-between space-x-5 '>
                 <Link to="/signin"> <button className='font-body font-semibold text-sm bg-transparent text-gray-800 border border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white'>Sign-In</button></Link>
                 <Link to="/login"><button className='font-body font-semibold text-sm bg-transparent text-gray-800 border border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white'>Log-In</button></Link>
                </div> */}
                <div className="flex justify-between space-x-5">
                {authState.isAuthenticated ? (
                 <div className="flex items-center space-x-4">
                      <Link to="/cart" className="relative text-gray-900 hover:text-black transition-colors duration-150 mr-6 ">
                        <FaShoppingCart size={20} />
                      </Link>
                  <button
                    onClick={() => dispatch(logout())}
                    className="font-body font-semibold text-sm bg-transparent text-gray-800 border border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                  >
                    Log Out
                  </button>
                </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="font-body font-semibold text-sm bg-transparent text-gray-800 border border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/signin"
                      className="font-body font-semibold text-sm bg-transparent text-gray-800 border border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
          </div>

            </div>
            {isOpen && (
              <div className='lg:hidden' id="mobile-menu">
                <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <li><a href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Home</a></li>
                  <li><a href="/artists" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Featured Artists</a></li>
                  <li><a href="/collections" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Collections</a></li>
                  <li><a href="/portfolio" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Portfolio</a></li>
                  <li><a href="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">About</a></li>
                  <li>
                    <button className='w-full bg-transparent text-gray-700 border border-gray-700 rounded-md px-6 py-3 text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white'>
                      Sign-In
                    </button>
                  </li>
                  <li>
                    <button className='w-full mt-2 bg-transparent text-gray-700 border border-gray-700 rounded-md px-6 py-3 text-sm transition-colors duration-300 hover:bg-gray-700 hover:text-white'>
                      Log-In
                    </button>
                  </li>
                </ul>
              </div>
        )}
        </div>
    </nav>
  )
}

export default Navbar
