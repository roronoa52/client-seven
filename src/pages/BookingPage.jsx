import React, {useState, useEffect} from 'react'
import Booking from '../components/Booking'
import Header from '../components/Header'
import { useLocation } from 'react-router';

function BookingPage() {
  const { search } = useLocation();
  const [productId, setProductId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(search);
    const productIdParam = params.get('productId');
    if (productIdParam) {
      setProductId(productIdParam);
    }
  }, [search]);

  return (
    <>
    <Header/>
    <Booking productId= {productId}/>
    </>
  )
}

export default BookingPage