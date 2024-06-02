import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Booking({ productId }) {
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    productid: '',
    file: '',
    avatar: '',
    status: 'pending',
    startDate: "",
    duration: "",
    isNeedNotification: true,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstName: formData.firstName,
      middleName: formData.middleName,
      lastName: formData.lastName,
      email: formData.email,
      productid: productId,
      status: formData.status,
      image: formData.file,
      startDate: formData.startDate,
      duration: formData.duration,
      isNeedNotification: formData.isNeedNotification,
    };

    console.log(payload)

    try {
      axios.post("https://seven-backend-api.vercel.app/api/v1/cms/bookings", payload)
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

  const uploadImage = async (file) => {
    let formData = new FormData();
    formData.append('avatar', file);
    const res = axios.post("https://seven-backend-api.vercel.app/api/v1/cms/images", formData, true);
    return res;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    if (e.target.name === 'avatar') {
      if (
        e?.target?.files[0]?.type === 'image/jpg' ||
        e?.target?.files[0]?.type === 'image/png' ||
        e?.target?.files[0]?.type === 'image/jpeg'
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setFormData({
            ...formData,
            file: '',
            [e.target.name]: '',
          });
        } else {
          const res = await uploadImage(e.target.files[0]);

          setFormData({
            ...formData,
            file: res.data.data._id,
            dataImage:res.data.data.dataImage,
            typeImage:res.data.data.typeImage,
            [e.target.name]: res.data.data.name,
          });
        }
      } else {
        setFormData({
          ...formData,
          file: '',
          [e.target.name]: '',
        });
      }
    }

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
            <label htmlFor="avatar" className="font-medium mb-1">
              Unggah Gambar:
            </label>
            <input
              type="file"
              id="avatar"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              name="avatar"
              onChange={handleInputChange}
              accept="image/*"
            />
          </div>

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
            <label htmlFor="startDate" className="font-medium mb-1">
              Tanggal Mulai:
            </label>
            <DatePicker
              selected={formData.startDate}
              onChange={(date) =>
                setFormData({ ...formData, startDate: date })
              }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              id="startDate"
              name="startDate"
              required
            />
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
