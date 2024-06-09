import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

function Product() {
  const [products, setProducts] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [dataFetched, setDataFetched] = useState(false);
  let navigate = useNavigate();

  const handleBookingClick = (productId) => {
    navigate(`/booking?productId=${productId}`);
  };

  useEffect(() => {
    fetchProducts();
    const timer = setTimeout(() => {
      if (!dataFetched) {
        setLoading(false);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dataFetched]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://seven-backend-api.vercel.app/api/v1/cms/products');
      setProducts(res.data);
      setDataFetched(true);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  return (
    <>
      <section id="product" className="lg:h-[100vh] bg-black lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden">
        <div className="text-center text-3xl mb-5 lg:text-4xl lg:pt-32">
          <h1 className="text-white font-bold">Meja yang tersedia</h1>
        </div>
        <div className="flex justify-center flex-wrap lg:pt-10">
          {loading ? (
            <div className="text-center text-2xl text-white">
             Loading...
            </div>
          ) : products === null || products.data.length === 0 ? (
            <div className="text-center text-2xl text-white">Tidak Ada Data</div>
          ) : (
            products.data.map((product) => {
              const formattedNumber = product.price.toLocaleString('id-ID');
              const imageUrl = `data:${product.image.typeImage};base64,${product.image.dataImage}`;
              return (
                <div key={product._id} className="card bg-white border-2 border-black m-4 p-4 w-64 flex flex-col">
                  <div className="flex-grow">
                    <img src={imageUrl} alt={product.name} className="w-full object-cover h-48" />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-3xl font-bold text-secondary my-4">{product.name}</h2>
                    <p className="text-lg text-black font-semibold">Harga perjam: {formattedNumber}</p>
                  </div>
                  <button onClick={() => handleBookingClick(product._id)} className="mt-auto bg-primary text-white px-4 py-2 rounded">Booking</button>
                </div>
              );
            })
          )}
        </div>
      </section>
    </>
  );
}

export default Product;
