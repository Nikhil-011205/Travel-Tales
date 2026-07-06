import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import AddTrip from "./pages/AddTrip";
import MyTrips from "./pages/MyTrips";
import BucketList from "./pages/BucketList";

import ProtectedRoute from "../components/ProtectedRoute";


function App() {

   const [trips, setTrips] = useState(() => {
    const savedTrips = localStorage.getItem("trips");

    if (savedTrips) {
      return JSON.parse(savedTrips);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("trips", JSON.stringify(trips));
  }, [trips]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        <Route path="/addtrip" element={<ProtectedRoute><AddTrip trips={trips} setTrips={setTrips} /></ProtectedRoute>} />

        <Route path="/mytrips" element={<ProtectedRoute><MyTrips trips={trips} setTrips={setTrips} /></ProtectedRoute>} />

        <Route path="/bucketlist" element={<ProtectedRoute><BucketList /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;