import React, { useState } from 'react';
import { format, parse, addDays } from 'date-fns';
import idLocale from 'date-fns/locale/id';
import { useNavigate } from 'react-router';
import axios from 'axios';

function Booking({ productId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    productid: '',
    image: '',
    startDate: "",
    duration: "",
    isNeedNotification: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      productid: formData.productid,
      status: formData.status,
      image: formData.image,
      startDate: formData.startDate,
      duration: formData.duration,
      isNeedNotification: formData.isNeedNotification,
    };

    try {
      axios.post("https://seven-backend-api.vercel.app/api/v1/cms/bookings", newFormData)
        .then((response) => {
          console.log('Data sent successfully:', response.data);
          navigate("/success-booking");
        })
        .catch(error => {
          console.error('Error:', error.response.data);
        });
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "startDate") {
      setFormData((prevData) => ({
        ...prevData,
        startDate: value,
        endDate: "", // Clear endDate when startDate changes
      }));

      // Perform additional logic if needed
    } else if (name === "duration") {
      const durationValue = parseInt(value, 10);

      setFormData((prevData) => ({
        ...prevData,
        duration: durationValue,
      }));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section
      id="product"
      className=" bg-white lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden">
      <div className='text-center lg:text-4xl lg:pt-32'>
        <h1 className='text-primary text-3xl pb-5 font-bold lg:pb-1 lg:text-4xl'>Pemesanan</h1>
      </div>
      <div className='flex justify-center lg:pt-10'>

        <form onSubmit={handleSubmit} className='pb-10 px-5'>
          <div className="mb-4">
            <label htmlFor="firstName" className="font-medium mb-1">
              Nama Depan:
            </label>
            <input type="text" id="firstName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Nama Depan" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="middleName" className="font-medium mb-1">
              Nama Tengah:
            </label>
            <input type="text" id="middleName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Nama Tengah" name="middleName" value={formData.middleName} onChange={handleInputChange} />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="font-medium mb-1">
              Nama Belakang:
            </label>
            <input type="text" id="lastName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Nama Belakang" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="font-medium mb-1">
              Email:
            </label>
            <input type="email" id="email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="productid" className="font-medium mb-1">
              Product ID:
            </label>
            <input type="text" id="productid" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Product ID" name="productid" value={productId} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="font-medium mb-1">
              Image ID:
            </label>
            <input type="text" id="image" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400" placeholder="Masukan Image ID" name="image" value={formData.image} onChange={handleInputChange} required />
          </div>

          <div className="mb-4">
            <label htmlFor="duration" className="font-medium mb-1">
              Lama Permainan:
            </label>
            <input
              type="number"
              id="duration"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              name="duration"
              placeholder='Masukan jumlah jam'
              value={formData.duration}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
            Pesan
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;