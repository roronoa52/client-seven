import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductPage";
import BookingPage from "./pages/BookingPage";
import Success from "./components/Success";
import MyBooking from "./components/MyBooking";

const alertOptions = {
  timeout: 5000,
  position: positions.TOP_CENTER,
};

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

// Komponen untuk menangani pengalihan OAuth2
const RedirectHandler = () => {
  const query = useQuery();
  const navigate = useNavigate();

  useEffect(() => {
    const token = query.get("token");
    const name = query.get("name");
    const email = query.get("email");

    if (token) {
      // Simpan token dan informasi pengguna ke localStorage atau state management
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);

      // Redirect ke halaman yang diinginkan setelah login
      navigate("/");
    } else {
      // Handle error jika token tidak ada
      console.error("No token found in redirect URL");
    }
  }, [query, navigate]);

  return <div>Loading...</div>;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/my-booking" element={<MyBooking />} />
        <Route path="/success-booking" element={<Success />} />
        <Route path="/redirect" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
