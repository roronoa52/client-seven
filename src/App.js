import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import components

import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import BookingPage from "./pages/BookingPage";
import Success from "./components/Success";

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/product" element={<ProductPage/>}/>
          <Route path="/booking" element={<BookingPage/>}/>
          <Route path="/success-booking" element={<Success/>}/>
        </Routes>
      </BrowserRouter>
  );
};

export default App;
