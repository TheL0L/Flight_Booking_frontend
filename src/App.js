import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Flights from "./pages/Flights";
import Bookings from "./pages/Bookings";
import SearchResults from "./pages/SearchResults"; // Create this new page for results
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/results" element={<SearchResults />} /> {/* New Results Page */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
