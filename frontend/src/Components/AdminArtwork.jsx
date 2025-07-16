import React, { useState, useEffect } from 'react';
import axiosInstance from "../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const AdminArtworkManagement = () => {
  const [artworks, setArtworks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newArtwork, setNewArtwork] = useState({
    title: "",
    description: "",
    price: "",
    artist: "",
    category: "",
    imageUrl: "",
    images:"",
    createdAt:"",
    countInStock:""
  });
  const [editingArtwork, setEditingArtwork] = useState(null);

  useEffect(() => {
    fetchArtworks();
    fetchArtists();
    fetchCategories();
  }, []);

  const fetchArtworks = async () => {
    try {
      const response = await axiosInstance.get("/api/artwork/");
      setArtworks(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const fetchArtists = async () => {
    try {
      const response = await axiosInstance.get("/api/artist/");
      setArtists(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/category/");
      setCategories(response.data);
      console.log(response.data)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewArtwork((prevArtwork) => ({
      ...prevArtwork,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingArtwork) {
        const response = await axiosInstance.patch(
          `/api/artwork/${editingArtwork._id}`,
          newArtwork
        );
        toast.success("Artwork updated successfully!");
        setEditingArtwork(null);
      } else {
        const response = await axiosInstance.post(
          "/api/artwork/add",
          newArtwork
        );
        toast.success("Artwork created successfully!");
      }
      setNewArtwork({
        title: "",
        description: "",
        price: "",
        artist: "",
        category: "",
        images:"",
        imageUrl: "",
        createdAt:"",
        countInStock:""
      });
      fetchArtworks();
    } catch (error) {
      console.error("Error saving artwork:", error);
      toast.error("Failed to save artwork.");
    }
  };

  const handleEdit = (artwork) => {
    setNewArtwork({
      title: artwork.title,
      description: artwork.description,
      price: artwork.price,
      artist: artwork.artist._id, 
      category: artwork.category._id, 
      imageUrl: artwork.imageUrl,
      images: artwork.images,
      createdAt:artwork.createdAt,
      countInStock:artwork.countInStock
    });
    setEditingArtwork(artwork);
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/api/artwork/delete/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast.success("Artwork deleted successfully!");
      fetchArtworks();
    } catch (error) {
      console.error("Error deleting artwork:", error);
      toast.error("Failed to delete artwork.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Artworks</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-2">
          <label htmlFor="title" className="mb-1">Artwork Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={newArtwork.title}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="mb-1">Description</label>
          <textarea
            name="description"
            id="description"
            value={newArtwork.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="price" className="mb-1">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            value={newArtwork.price}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="artist" className="mb-1">Artist</label>
          <select
              name="artist"
              id="artist"
              value={newArtwork.artist}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded"
              required
            >
            <option value="">Select an artist</option>
            {artistsn.map((artist) => (
              <option key={artist._id} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="category" className="mb-1">Category</label>
          <select
            name="category"
            id="category"
            value={newArtwork.category}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="imageUrl" className="mb-1">Image URL</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            value={newArtwork.imageUrl}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingArtwork ? "Update Artwork" : "Add Artwork"}
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-2">Artwork List</h2>
        <ul>
          {artworks.map((artwork) => (
            <li key={artwork._id} className="flex justify-between items-center border-b border-gray-300 py-2">
              <div>
                <h3>{artwork.title}</h3>
                <p>{artwork.description}</p>
                <p>Price: ${artwork.price}</p>
                <p>Artist: {artwork.artist.name}</p>
                <p>Category: {artwork.category.name}</p>
                <p>Image URL: {artwork.imageUrl}</p>
              </div>
              <div>
                <button
                  onClick={() => handleEdit(artwork)}
                  className="mr-2 text-blue-500"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(artwork._id)}
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

export default AdminArtworkManagement;
