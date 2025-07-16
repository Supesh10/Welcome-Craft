import React, { useState, useEffect } from 'react';
import axiosInstance from "../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminMenuComponent = () => {
  const [artists, setArtists] = useState([]);
  const [newArtist, setNewArtist] = useState({ name: "", bio: "" ,profileImage:""});
  const [editingArtist, setEditingArtist] = useState(null);

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/api/artist/");
      console.log(response);
      setArtists(response.data.artists);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtist((prevArtist) => ({
    ...prevArtist,
    [name]: value,
  }));
  };

//   console.log(newCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting category:", newCategory);
    try {
      if (editingArtist) {
        const response = await axiosInstance.patch(
          `/api/artist/update/${editingArtist.id}`,
          newArtist
        );
        toast.success(response.data.msg);
        setEditingArtist(null);
      } else {
        const response = await axiosInstance.post(
          "/api/artist/add",
          newArtist
        );
        toast.success(response.data.msg);
      }
      setNewArtist({ name: "", bio: "", profileImage:"" });
      fetchArtists();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.msg);
    }
  };

  const handleEdit = (artist) => {
    setNewArtist({ name: artist.name, bio: artist.bio, profileImage:artist.profileImage });
    setEditingArtist(artist);
  };

  const handleDelete = async (id) => {
    try {
      const token=localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/api/artist/delete/${id}`,
        {
          headers: {
            Authorization: token,
            // if Bearer is not present in your token
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      fetchArtists();
    } catch (error) {
      console.error("Error deleting artists:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl tracking-tight font-body font-bold mb-4">Manage Artists</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="mb-1 font-body font-thin">
            Artist Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newArtist.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder='Enter Artist Name'
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="bio" className="mb-1 font-body font-thin">
            Artist Description
          </label>
          <textarea
            name="bio"
            id="bio"
            value={newArtist.bio}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder='Enter Bio/Description'
            required
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="image" className="mb-1 font-body font-thin">
            Artist Image
          </label>
          <input
            type="text"
            alt="profileImage"
            name="profileImage"
            id="profileImage"
            value={newArtist.profileImage}
            onChange={handleInputChange}
            placeholder='Paste Image Url/Address'
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="font-body font-semibold text-sm bg-transparent text-gray-800 border mt-4 border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
        >
          {editingArtist ? "Update Artist" : "Add Artist"}
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-semibold font-body mb-2 ">Artist List</h2>
        <ul>
          {artists.map((artist) => (
            <li
              key={artist._id}
              className="flex justify-between items-center border-b font-body border-gray-300 py-2"
            >
              <div>
                <h3 className='font-semibold text-lg'>{artist.name}</h3>
                <p className='tracking-tighter'>{artist.bio}</p>
                {artist.profileImage && (
                  <img
                    src={artist.profileImage}
                    alt={artist.name}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
          )}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(artist)}
                  className="mr-2 text-blue-500"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(artist._id)}
                  className="text-red-500"
                >
                  <AiFillDelete />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminMenuComponent;