import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Product from '../components/Product';
import axios from 'axios';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false)

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts()
    }
  }, [dataFetched]);

  const fetchProducts = async () => {
    if (products.length === 0) {
      axios.get('https://seven-backend-api.vercel.app/api/v1/cms/products')
      .then((res) => {
        console.log(res.data)
        
        setProducts(res.data);
        setDataFetched(true)
      })
      .catch((error)=>{
        console.error('Error fetching products:', error);
      })
    }
  };

  return (
    <>
    <Header/>
    <Product products = {products}/>
    </>
  )
}

export default ProductPage