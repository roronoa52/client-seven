import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Product() {

  const [products, setProducts] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  let navigate = useNavigate();

  const handleBookingClick = (productId) => {
    navigate(`/booking?productId=${productId}`);
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [dataFetched]);

  const fetchProducts = async () => {
    if (products.length === 0) {
      axios.get('https://seven-backend-api.vercel.app/api/v1/cms/products')
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
          setDataFetched(true);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  };

  return (
    <>
      <section id="product" className="lg:h-[100vh] bg-black lg:bg-cover lg:bg-center lg:bg-no-repeat py-32 lg:py-0 overflow-hidden">
        <div className="text-center text-3xl mb-5 lg:text-4xl lg:pt-32">
          <h1 className="text-white font-bold">Meja yang tersedia</h1>
        </div>
        <div className="flex justify-center flex-wrap lg:pt-10">
          {products.data === undefined ? (
            <div className="text-center text-2xl text-white">Tidak Ada Data</div>
          ) : (
            products.data.map((product, index) => {
              const formattedNumber = product.price.toLocaleString('id-ID');
              const imageUrl = `data:${product.image.typeImage};base64,${product.image.dataImage}`;
              return (
                <div key={product._id} className="card bg-white border-2 border-black m-4 p-4 w-64">
                  <img src={imageUrl} alt={product.name} className="w-full object-cover" />
                  <h2 className="text-3xl font-bold text-secondary my-4">{product.name}</h2>
                  <p className="text-lg text-black font-semibold">Harga perjam: {formattedNumber}</p>
                  <button onClick={() => handleBookingClick(product._id)} className="mt-4 bg-primary text-white px-4 py-2 rounded">Booking</button>
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
