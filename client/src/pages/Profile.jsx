import { useEffect, useState } from "react";
import DashboardNavbar from "../pages/DashboardNavbar";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({

    name: "",

    email: "",

    totalTrips: 0,

    totalPhotos: 0,

    totalBudget: 0,

    bucketList: 0

});

useEffect(() => {

    async function fetchDashboard() {

        const token = localStorage.getItem("token");

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard`, {

            headers: {

                Authorization: token

            }

        });

        const data = await response.json();

        setProfile(data);

    }

    fetchDashboard();

}, []);
 
    

  return (
    <>
      <DashboardNavbar />

      <div className="profile-container">

        <div className="profile-card">

          <h1> My Profile</h1>

          <p className="quote">
            "Collect moments, not things."
          </p>

          <div className="profile-info">

            <div className="info-card">

              <h2>👤</h2>

              <h3>Name</h3>

              <p>{profile.name}</p>

            </div>

          </div>

          <h2 className="stats-heading">
            Travel Summary
          </h2>

          <div className="stats">

            <div className="stat-card">

              <h2>✈️</h2>

              <h3>Total Trips</h3>

              <h1>{profile.totalTrips}</h1>

            </div>

            <div className="stat-card">

              <h2>📷</h2>

              <h3>Photos Uploaded</h3>

             <h1>{profile.totalPhotos}</h1>

            </div>

            <div className="stat-card">

              <h2>💰</h2>

              <h3>Total Money Spent</h3>

              <h1>₹{profile.totalBudget}</h1>

            </div>

            <div className="stat-card">

              <h2>🌍</h2>

              <h3>Bucket List</h3>

              <h1>{profile.bucketList}</h1>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Profile;