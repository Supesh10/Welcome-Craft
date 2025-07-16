import React, { useState, useEffect } from 'react';
import axiosInstance from "../config/axiosConfig";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const CategoryComponent = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" ,image:""});
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/api/category/");
      console.log(response);
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value); // Check if this logs "image" and the corresponding value
    setNewCategory((prevCategory) => ({
    ...prevCategory,
    [name]: value,
  }));
  };

  console.log(newCategory);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting category:", newCategory);
    try {
      if (editingCategory) {
        const response = await axiosInstance.patch(
          `/api/category/${editingCategory.id}`,
          newCategory
        );
        toast.success(response.data.msg);
        setEditingCategory(null);
      } else {
        const response = await axiosInstance.post(
          "/api/category/create",
          newCategory
        );
        toast.success(response.data.msg);
      }
      setNewCategory({ name: "", description: "", image:"" });
      fetchCategories();
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.msg);
    }
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description, image:category.image });
    setEditingCategory(category);
  };

  const handleDelete = async (id) => {
    try {
      const token=localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:8080/api/category/delete/${id}`,
        {
          headers: {
            
            Authorization: token,
            // if Bearer is not present in your token
            // Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.msg);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl tracking-tight font-body font-bold mb-4">Manage Categories</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <ToastContainer />
        <div className="flex flex-col mb-2">
          <label htmlFor="name" className="mb-1 font-body font-thin">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={newCategory.name}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder='Enter Category Name'
            required
          />
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="description" className="mb-1 font-body font-thin">
            Category Description
          </label>
          <textarea
            name="description"
            id="description"
            value={newCategory.description}
            onChange={handleInputChange}
            className="p-2 border border-gray-300 rounded"
            placeholder='Enter Description'
            required
          ></textarea>
        </div>
        <div className="flex flex-col mb-2">
          <label htmlFor="image" className="mb-1 font-body font-thin">
            Category Image
          </label>
          <input
            type="text"
            alt="image"
            name="image"
            id="image"
            value={newCategory.image}
            onChange={handleInputChange}
            placeholder='Paste Image Url/Address'
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="font-body font-semibold text-sm bg-transparent text-gray-800 border mt-4 border-gray-900 rounded-[12px] px-6 py-3 transition-colors duration-300 hover:bg-gray-900 hover:text-white"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
      </form>
      <div>
        <h2 className="text-2xl font-semibold font-body mb-2 ">Category List</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category._id}
              className="flex justify-between items-center border-b font-body border-gray-300 py-2"
            >
              <div>
                <h3 className='font-semibold text-lg'>{category.name}</h3>
                <p className='tracking-tighter'>{category.description}</p>
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
          )}
              </div>
              <div>
                <button
                  onClick={() => handleEdit(category)}
                  className="mr-2 text-blue-500"
                >
                  <AiFillEdit />
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
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

export default CategoryComponent;