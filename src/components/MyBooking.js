import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import Header from './Header';
import { format } from 'date-fns';

function MyBooking() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isButtonClicked, setIsButtonClicked] = useState(false); // State untuk menandai apakah tombol sudah diklik
  let navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('https://seven-backend-api.vercel.app/api/v1/cms/client/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setBookings(res.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Maaf, terjadi kesalahan saat memuat data.');
      setLoading(false);
    }
  };

  const handleCalendarButtonClick = async (bookingId) => {
    const token = localStorage.getItem('token');
    if (!isButtonClicked) {
      try {
        setIsButtonClicked(true); // Set tombol menjadi sudah diklik
        const res = await axios.get(`https://seven-backend-api.vercel.app/api/v1/cms/google-calendar/${bookingId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        // Lakukan apa pun yang perlu dilakukan setelah permintaan berhasil
      } catch (error) {
        // Tangani error jika terjadi
        console.error('Error setting up calendar:', error);
        // Jika terjadi error, Anda bisa mengizinkan pengguna untuk mencoba lagi dengan mengatur kembali state isButtonClicked menjadi false
        setIsButtonClicked(false);
      }
    }
  };

  return (
    <>
      <Header />
      <section
        id="product"
        className="lg:h-full bg-black lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden"
      >
        <div className="text-center text-3xl mb-5 lg:text-4xl lg:pt-32">
          <h1 className="text-white font-bold">Booking</h1>
        </div>
        <div className="flex justify-center flex-wrap lg:pt-10">
          {loading ? (
            <div className="text-center text-2xl text-white">
              <Spinner animation="border" variant="light" /> Loading...
            </div>
          ) : error ? (
            <div className="text-center text-2xl text-white">{error}</div>
          ) : bookings === null || bookings.length === 0 ? (
            <div className="text-center text-2xl text-white">Tidak Ada Data</div>
          ) : (
            bookings.map((booking) => {
              const formattedNumber = booking.total.toLocaleString('id-ID');
              const imageUrl = `data:${booking.image.typeImage};base64,${booking.image.dataImage}`;
              const isNotificationNeeded = booking.isNeedNotification;
              const status = booking.status;
  
              return (
                <div key={booking._id} className="flex flex-col items-start bg-white border-2 border-black m-4 p-4 max-w-md">
                  <div className="w-full">
                    <img src={imageUrl} alt={booking.name} className="w-full h-auto" />
                  </div>
                  <div className="mt-4 text-left">
                    <h2 className="text-3xl text-black font-bold">{`${booking.firstName} ${booking.middleName} ${booking.lastName}`}</h2>
                    <ul>
                      <li><p className="text-lg">Email: {booking.email}</p></li>
                      <li><p className="text-lg">Total: {formattedNumber}</p></li>
                      <li><p className="text-lg">Status: {status}</p></li>
                      <li><p className="text-lg">
                        Mulai main: <span className="font-semibold">{format(new Date(booking.startDate), "dd MMMM yyyy 'pukul' HH:mm")}</span></p></li>
                      <li><p className="text-lg">
                        Selesai main: <span className="font-semibold">{format(new Date(booking.endDate), "dd MMMM yyyy 'pukul' HH:mm")}</span>
                      </p></li>
                      <li><p className="text-lg">Lama main: {booking.duration}</p></li>
                      <li><p className="text-lg">Lokasi main: {booking.product.name}</p></li>
                      {isNotificationNeeded && status === "berhasil" && (
                        <li>
                          <button onClick={() => handleCalendarButtonClick(booking._id)} disabled={isButtonClicked} className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            {isButtonClicked ? "Cek Google Calendar Anda" : "Pasang ke calendar"}
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default MyBooking;
