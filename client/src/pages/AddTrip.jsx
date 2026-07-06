import { useState } from "react";
import DashboardNavbar from "../pages/DashboardNavbar";
import "./AddTrip.css";
import { toast } from "react-toastify";

function AddTrip() {

  const [place, setPlace] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [rating, setRating] = useState("");
  const [experience, setExperience] = useState("");
  const [photo, setPhoto] = useState(null);

  

   async function handleSubmit() {

    console.log("Button Clicked");

    const token = localStorage.getItem("token");

    try {
              //  ADD THE CLOUDINARY CODE HERE

        const formData = new FormData();

        formData.append("file", photo);

        formData.append("upload_preset", "travel-tales");

        const cloudinaryResponse = await fetch(

            "https://api.cloudinary.com/v1_1/wx23czaw/image/upload",

            {

                method: "POST",

                body: formData

            }

        );

        const cloudinaryData = await cloudinaryResponse.json();

        const imageUrl = cloudinaryData.secure_url;

        console.log(imageUrl);


        const response = await fetch("http://localhost:5000/add-trip", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            },

            body: JSON.stringify({
                place,
                days,
                budget,
                rating,
                experience,
                photo:imageUrl
            })

        });

        console.log("Response Status:", response.status);

        const data = await response.text();

if (data === "Trip Added Successfully") {

    toast.success("🌍 Adventure Added Successfully!");

} else {

    toast.error("❌ Failed to Add Journey!");

}

    } catch (err) {

        console.log(err);

    }

}

    
  

  return (
    <>
      <DashboardNavbar />

      <div className="addtrip-container">

        <div className="addtrip-card">

          <h1>✈️ Add a New Journey</h1>

          <p className="subtitle">
            Every journey tells a story. Record yours today.
          </p>

          <label>📍 Place</label>

          <input
            type="text"
            placeholder="Enter destination"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <label>📅 Days Stayed</label>

          <input
            type="number"
            placeholder="Number of days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          />

          <label>💰 Budget</label>

          <input
            type="number"
            placeholder="Budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          />

          <label>⭐ Rating</label>

          <input
            type="number"
            min="1"
            max="5"
            placeholder="Rate your trip (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />

          <label>📝 Experience</label>

          <textarea
            placeholder="Share your experience..."
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          ></textarea>

          <label>📷 Upload Photos</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button onClick={handleSubmit}>
            Save Journey
          </button>

        </div>

      </div>
    </>
  );
}

export default AddTrip;