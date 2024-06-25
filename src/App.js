import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Sell from "./pages/Sell";
import Buy from "./pages/Buy";
import Cart from "./components/Cart";
import Contact from "./components/Contact";
import Checkout from "./pages/Checkout";
import RideSharing from "./components/RideSharing";
import RideDetails from "./components/RideDetails";
import About from "./pages/About";
import ProductInfo from "./components/ProductInfo";

function App() {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/about" element={<About />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/ridesharing" element={<RideSharing />} />
          <Route path="/product/:productId" element={<ProductInfo />} />
          <Route path="/ridedetails/:id" element={<RideDetails />} />
        </Routes>
        <Contact />
      </Router>
    </div>
  );
}

export default App;
