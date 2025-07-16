import React, { useState } from 'react';
// import { SlArrowDown } from "react-icons/sl";

const BuyNow = () => {
  const [customerDetails, setCustomerDetails] = useState({
    address: '',
    province: '',
    phone: '',
    city:''
  });

  const [shippingOption, setShippingOption] = useState('standard');

  const handleChange = (e) => {
    setCustomerDetails({
      ...customerDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleShippingChange = (e) => {
    setShippingOption(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the form submission (e.g., send the data to the backend)
    console.log('Customer Details:', customerDetails);
    console.log('Selected Shipping Option:', shippingOption);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="font-body text-2xl font-bold mt-10 mb-4 tracking-tighter">Complete Your Purchase</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
        <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body">Province</label>
            <select
                name="province"
                value={customerDetails.province}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
            >
                <option value="">Select Province</option> {/* Placeholder option */}
                {[1, 2, 3, 4, 5, 6, 7, 8].map((province) => (
                <option key={province} value={province}>
                    Province {province}
                </option>
                ))}
            </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body">Address</label>
          <textarea
            name="address"
            value={customerDetails.address}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body">City</label>
          <input
            type="city"
            name="city"
            value={customerDetails.city}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={customerDetails.phone}
            onChange={handleChange}
            required
            className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-500 font-normal text-sm mb-2 ml-1 font-body">Shipping Option</label>
          <select
            name="shippingOption"
            value={shippingOption}
            onChange={handleShippingChange}
            className="shadow appearance-none border rounded-md font-body font-extralight tracking-tighter w-full py-2 px-3 text-gray-400 leading-tight focus:outline-none focus:shadow-outline  focus:ring-gray-500 hover:ring-2 hover:ring-gray-500 transition duration-150"
          >
            <option value="standard">Standard Shipping</option>
            <option value="express">Express Shipping</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-black font-body  text-white font-bold mt-2 py-2 px-4 border-2 border-black rounded-md focus:outline-none focus:shadow-outline w-full transition-colors duration-300 hover:bg-transparent hover:text-black"
        >
          Place your Order
        </button>
      </form>
    </div>
  );
};

export default BuyNow;
