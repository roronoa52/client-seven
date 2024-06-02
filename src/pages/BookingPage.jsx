import React, {useState, useEffect} from 'react'
import Booking from '../components/Booking'
import Header from '../components/Header'
import axios from 'axios';
import { useLocation } from 'react-router';

function BookingPage() {
  const { search } = useLocation();
  const [productId, setProductId] = useState('');
  const [startTime, setStartTime] = useState([]);
  const [endTime, setEndTime] = useState([]);

  useEffect(() => {
    if (startTime.length === 0) {
      fetchProducts()
    }

  }, [startTime, endTime]);

  useEffect(() => {
    const params = new URLSearchParams(search);
    const productIdParam = params.get('productId');
    if (productIdParam) {
      setProductId(productIdParam);
    }
  }, [search]);

  const fetchProducts = async () => {
    if (startTime.length === 0) {
      axios.get('https://salon-hewan.vercel.app/api/v1/member/booking/times')
      .then((res) => {
        const data = res.data.data;

        const startTimes = data.map(item => formatToIndonesianDate(item.startTime));
        const endTimes = data.map(item => formatToIndonesianDate(item.endTime));

      setStartTime(startTimes);
      setEndTime(endTimes);
      })
      .catch((error)=>{
        console.error('Error fetching products:', error);
      })
    }
  };

  const formatToIndonesianDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
    <Header/>
    <Booking productId= {productId}/>
    </>
  )
}

export default BookingPage